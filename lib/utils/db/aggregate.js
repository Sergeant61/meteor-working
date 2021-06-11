Aggregate = {
  call: function (_collection, _pipeline, _options, wrapperFieldName = 'data', onlyCount = false) {
    const result = {
      options: {
        pagination: {},
        sorting: {}
      }
    };

    result[wrapperFieldName] = [];

    let pipeline = _pipeline;

    if (_options?.filtering) {
      keyword = _options.filtering.keyword;

      if (keyword) {
        pipeline.unshift({ $match: { $text: { $search: keyword } } });
      }

      const filterQuery = Object.keys(_options.filtering).reduce(function (obj, key) {
        if (key === 'keyword') {
          return obj;
        }

        let value = _options.filtering[key]

        if (value === 'true') {
          value = true;
        }

        if (value === 'false') {
          value = false;
        }

        if (value['$gte'] || value['$lte'] || value == true || value == false) {
          obj[key] = value;
          return obj;
        }

        obj[key] = {
          $regex: `${value}`,
          $options: 'i'
        };

        return obj;
      }, {});

      pipeline.push({ $match: filterQuery });
    }

    if (_options?.searching) {
      const $or = []
      Object.keys(_options.searching).reduce(function (obj, key) {
        let _obj = {};

        _obj[key] = {
          $regex: `${_options.searching[key]}`,
          $options: 'i'
        };
        $or.push(_obj);
      }, {});

      pipeline.push({ $match: { $or: $or } });
    }

    pipeline.push({ $count: "count" });
    const count = _collection.aggregate(pipeline)[0]?.count;

    result.options.pagination.currentPage = 1;
    result.options.pagination.pageItems = count || _options?.pagination?.pageItems || 0;
    result.options.pagination.totalCount = count || 0;
    pipeline.splice(-1, 1); // son eklenen count değeri siliniyor.

    if (!count) // count undefined ise zaten sonuç yoktur sorguyu bitiriyorum.
      return result;

    if (onlyCount)
      return count;

    if (_options?.sorting) {
      const sort = {}
      sort[_options.sorting.sortField] = _options.sorting.sortOrder === 'asc' ? 1 : -1;
      pipeline.push({ $sort: sort });
      result.options.sorting = sort;
    }

    if (_options?.pagination) {

      pipeline.push({ $skip: (_options.pagination.currentPage - 1) * _options.pagination.pageItems });
      pipeline.push({ $limit: _options.pagination.pageItems });

      result.options.pagination.currentPage = _options.pagination.currentPage;
      result.options.pagination.pageItems = _options.pagination.pageItems;
    }

    result[wrapperFieldName] = _collection.aggregate(pipeline);
    return result;
  },

  addLookup: function (pipeline, from, localField, foreignField, path, preserveNullAndEmptyArrays = false) {
    pipeline.push(
      {
        $lookup: {
          from: from,
          localField: localField,
          foreignField: foreignField,
          as: path
        },
      },
      {
        $unwind: {
          path: `$${path}`,
          preserveNullAndEmptyArrays: preserveNullAndEmptyArrays
        }
      });
  },

  createProject: function (pipeline, fields) {
    const $project = {
      _id: 1,
    }

    fields.forEach(field => {

      if (typeof field === 'object') {

        const key = Object.keys(field)[0];

        const _in = { _id: "$$u._id" };
        const obj = {
          $let: {
            vars: {
              u: `$${key}`
            },
            in: _in,
          },
        }

        field[key].forEach(f => {
          _in[f] = `$$u.${f}`
        });

        $project[key] = obj

      } else {
        $project[field] = 1;
      }

    });

    pipeline.push({ $project: $project })
  },

  methods: {
    debtPayments: {
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');
        Aggregate.addLookup(pipeline, 'applications', 'applicationId', '_id', 'application');

        Aggregate.createProject(pipeline, [
          'amount',
          'charge',
          'payload',

          'updatedAt',
          'createdAt',

          'application',
          { 'user': ['emails', 'profile', 'createdAt'] },
        ]);

        return pipeline;
      },
    },
    withdraws: {
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');
        Aggregate.addLookup(pipeline, 'applications', 'applicationId', '_id', 'application');

        Aggregate.createProject(pipeline, [
          'amount',
          'type',
          'status',
          'payload',
          'applicationId',

          'approvalAt',
          'updatedAt',
          'createdAt',

          'application',
          { 'user': ['emails', 'profile', 'createdAt'] },
        ]);

        return pipeline;
      },
    },
    interests: {
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');
        Aggregate.addLookup(pipeline, 'applications', 'applicationId', '_id', 'application');
        Aggregate.addLookup(pipeline, 'interest-payments', 'interestPaymentId', '_id', 'interestPayment', true);

        Aggregate.createProject(pipeline, [
          'debt',
          'amount',
          'apr',
          'status',

          'updatedAt',
          'createdAt',

          { 'user': ['emails', 'profile', 'createdAt'] },
          'application',
          'interestPayment',
        ]);

        return pipeline;
      },
    },
    interestPayments: {
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');
        Aggregate.addLookup(pipeline, 'applications', 'applicationId', '_id', 'application');

        Aggregate.createProject(pipeline, [
          'amount',
          'type',
          'status',
          'charge',
          'paymentAt',
          'paidAt',

          'updatedAt',
          'createdAt',

          { 'user': ['emails', 'profile', 'createdAt'] },
          'application',
        ]);

        return pipeline;
      },
    },
    plaidTransactions: {
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');
        Aggregate.addLookup(pipeline, 'applications', 'applicationId', '_id', 'application');

        Aggregate.createProject(pipeline, [
          'isRemoved',
          'payload',

          'updatedAt',
          'createdAt',

          { 'user': ['emails', 'profile', 'createdAt'] },
          'application',
        ]);

        return pipeline;
      },
    },
    applicationLogs: {
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');
        Aggregate.addLookup(pipeline, 'applications', 'applicationId', '_id', 'application');

        Aggregate.createProject(pipeline, [
          'key',
          'source',
          'type',
          'payload',

          'updatedAt',
          'createdAt',

          { 'user': ['emails', 'profile', 'createdAt', 'status'] },
          'application',
        ]);

        return pipeline;
      },
    },
    applications: {
      customersDefault: function (pipeline) {

        pipeline.push(
          {
            $lookup: {
              from: "interest-payments",
              let: { applicationId: "$_id" },
              pipeline: [
                {
                  $match:
                  {
                    $expr:
                    {
                      $and:
                        [
                          { $eq: ["$applicationId", "$$applicationId"] },
                          { $eq: ["$status", 'delayed'] }
                        ]
                    }
                  }
                },
              ],
              as: "interestPayments"
            },
          },
          {
            $unwind: {
              path: "$interestPayments",
            }
          })

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');

        Aggregate.createProject(pipeline, [
          'status',
          'plaidAccount',
          'offer',
          'creditAccount',

          'updatedAt',
          'createdAt',

          'interestPayments',
          { 'user': ['emails', 'profile', 'createdAt', 'status'] },
        ]);

        return pipeline;
      },
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');

        Aggregate.createProject(pipeline, [
          'status',
          'plaidAccount',
          'offer',
          'creditAccount',

          'updatedAt',
          'createdAt',

          { 'user': ['emails', 'profile', 'createdAt', 'status'] },
        ]);

        return pipeline;
      },
    },
    users: {
      list: function (pipeline) {

        Aggregate.createProject(pipeline, [
          'profile',
          'emails',
          'status',

          'updatedAt',
          'createdAt',
        ]);

        return pipeline;
      },
    },
    aprConfigs: {
      list: function (pipeline) {

        Aggregate.addLookup(pipeline, 'users', 'userId', '_id', 'user');
        Aggregate.addLookup(pipeline, 'applications', 'applicationId', '_id', 'application');

        Aggregate.createProject(pipeline, [
          'apr',
          'startAt',
          'endAt',
          'type',

          'updatedAt',
          'createdAt',

          { 'user': ['emails', 'profile', 'createdAt'] },
          'application',
        ]);

        return pipeline;
      },
    }
  }
}