CountCaches = {};

const hashString = function(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

Meteor.setInterval(function() {
  console.log('CountCaches updated!');
  Object.keys(CountCaches).forEach(function(hash) {
    const countCache = CountCaches[hash];
    countCache.count = countCache.cursor.count();
  });
}, 1000*60*10);

FetchByIndex = function (_collection, _query, _options, _index, wrapperFieldName = 'data') {
  const result = {
    options: {
      pagination: {},
      sorting: {}
    }
  };

  result[wrapperFieldName] = [];

  let query = _query;
  let cursor = null;
  let keyword = null;
  let count = 0;

  if (_options?.filtering) {
    keyword = _options.filtering.keyword;

    const filterQuery = Object.keys(_options.filtering).reduce(function (obj, key) {
      if (key === 'keyword') {
        return obj;
      }

      // if(typeof _options.filtering[key] === 'string') {
      //   obj[key] = {
      //     $regex: `${_options.filtering[key]}`,
      //     $options: 'i'
      //   };
      // } else {
      //   obj[key] = _options.filtering[key];
      // }

      if(_options.filtering[key] === 'true') {
        obj[key] = true;
      } else if(_options.filtering[key] === 'false') {
        obj[key] = false;
      } else {
        obj[key] = _options.filtering[key];
      }
      

      return obj;
    }, {});

    query = { ...filterQuery, ...query };
  }

  const options = _options?.mongo || {};

  if(!options.props) {
    options.props = {}
  }

  let hash = '';

  if (keyword && _index) {
    options.props.query = query;
    delete options.fields;
    
    hash = hashString(JSON.stringify([_index.config.name, keyword, options]));
    const countCache = CountCaches[hash];

    if(countCache) {
      cursor = countCache.cursor;
      count = countCache.count;
    } else {
      cursor = _index.search(keyword, options);
      count = cursor.count();

      CountCaches[hash] = {
        cursor: cursor,
        count: count
      }
    }
  } else {
    hash = hashString(JSON.stringify([_collection._name, query]));
    const countCache = CountCaches[hash];

    if(countCache) {
      cursor = countCache.cursor;
      count = countCache.count;
    } else {
      cursor = _collection.find(query);
      count = cursor.count();

      CountCaches[hash] = {
        cursor: cursor,
        count: count
      }
    }
  }

  result.options.pagination.currentPage = 1;
  result.options.pagination.pageItems = count;
  result.options.pagination.totalCount = count;


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

  if (keyword && _index) {
    options.props.query = query;

    if (options.sort) {
      options.props.sort = options.sort;
      delete options.sort;
    }

    result[wrapperFieldName] = _index.search(keyword, options).fetch();
  } else {
    result[wrapperFieldName] = _collection.find(query, options).fetch();
  }

  return result;
}