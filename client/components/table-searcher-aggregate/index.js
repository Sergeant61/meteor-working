import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.componentsTableSearcherAggregate.onCreated(function () {
  this.timeout;
});

Template.componentsTableSearcherAggregate.onRendered(function () {
  const self = this;

  this.autorun(function () {

    const q = FlowRouter.getQueryParam(`q-${self.data.id || ''}`) || '';
    const searching = self.data.searching.all();

    const searchQuery = Object.keys(searching).reduce(function (obj, key) {
      obj[key] = q;

      Tracker.nonreactive(function () {
        self.$('.brd-application-search').val(q)
      });

      return obj;
    }, {});

    self.data.searching.set(searchQuery);
  });
});

Template.componentsTableSearcherAggregate.events({
  'keyup .brd-application-search': function (event, template) {
    event.stopImmediatePropagation();
    const search = event.target.value;

    if (template.timeout) {
      clearTimeout(template.timeout);
    }

    const id = template.data.id || '';

    const searchingParams = new ReactiveDict();
    template.timeout = setTimeout(function () {

      if (search) {
        searchingParams.set(`q-${id}`, search)
        FlowRouter.setQueryParams(searchingParams.all());
      } else {
        FlowRouter.setQueryParams({ [`q-${id}`]: null });
      }

    }, 500);
  },
  'search .brd-application-search[type=search]': function (event, template) {
    event.stopImmediatePropagation();
    FlowRouter.setQueryParams({ [`q-${template.data.id || ''}`]: null });
  }
});