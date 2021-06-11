Template.registerHelper('objectToArray', function (a) {
  return Object.keys(a).map(function (key) {
    return {
      key: key,
      value: a[key]
    };
  });
});

Template.registerHelper('objectToFistValue', function (a) {
  const array = Object.keys(a);

  if (array && array.length > 0) {
    return a[array[0].key]
  }
});