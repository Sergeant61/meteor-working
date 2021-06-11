Fetch = function (_collection, _query, _options, wrapperFieldName = 'data') {
  const result = {
    options: {
      pagination: {},
      sorting: {}
    }
  };

  result[wrapperFieldName] = [];

  let query = _query;

  if (_options?.filtering) {
    const filterQuery = Object.keys(_options.filtering).reduce(function (obj, key) {
      let value = _options.filtering[key]

      if (typeof value === 'object') {
        obj[key] = value;
        return obj;
      }

      obj[key] = {
        $regex: `${_options.filtering[key]}`,
        $options: 'i'
      };

      return obj;
    }, {});

    query = { ...filterQuery, ...query };
  }

  const count = _collection.find(query).count();
  result.options.pagination.currentPage = 1;
  result.options.pagination.pageItems = count;
  result.options.pagination.totalCount = count;

  const options = {};

  if (_options?.pagination) {
    options.skip = (_options.pagination.currentPage - 1) * _options.pagination.pageItems;
    options.limit = _options.pagination.pageItems;
    result.options.pagination.currentPage = _options.pagination.currentPage;
    result.options.pagination.pageItems = _options.pagination.pageItems;
  }

  if (_options?.sorting) {
    options.sort = {};
    options.sort[_options.sorting.sortField] = _options.sorting.sortOrder === 'asc' ? 1 : -1;
    result.options.sorting = _options.sorting;
  }

  if (_options?.fields) {
    options.fields = _options.fields;
  }

  result[wrapperFieldName] = _collection.find(query, options).fetch();

  return result;
};