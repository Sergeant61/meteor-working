Template.componentsTableSearcher.onCreated(function () {
  this.timeout;
});

Template.componentsTableSearcher.events({
  'keyup .brd-application-search': function (event, template) {
    event.stopImmediatePropagation();
    const search = event.target.value;

    if (template.timeout) {
      clearTimeout(template.timeout);
    }

    template.timeout = setTimeout(function () {
      const filtering = {} //template.data.filtering.all();
      filtering.keyword = search
      template.data.filtering.clear()
      template.data.filtering.set(filtering);
    }, 700);
  }
});