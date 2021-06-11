Template.componentsTableSorter.events({
  'click .brd-table-sorter': function (event, template) {
    event.stopImmediatePropagation();

    const sorting = template.data.sorting.all();
    const key = template.data.key;
    const sort = { sortField: key, sortOrder: 'desc' };

    if (!sorting) {
      template.data.sorting.set(sort);
    } else {
      if (sorting.sortField == key) {
        sort.sortOrder = sorting.sortOrder == 'asc' ? 'desc' : 'asc';
        template.data.sorting.set(sort);
      } else {
        template.data.sorting.set(sort);
      }
    }
  }
});