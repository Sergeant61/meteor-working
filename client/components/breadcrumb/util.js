BreadcrumbUtil = {
  pages: new ReactiveVar([]),

  set: function (url, title) {
    const value = [{ url: url, title: title }]
    BreadcrumbUtil.pages.set(value);
  },

  add: function (url, title) {
    Tracker.nonreactive(function() {
      const pages = BreadcrumbUtil.pages.get();
      const value = { url: url, title: title }
      pages.push(value)
      BreadcrumbUtil.pages.set(pages);
    });
  },
}

Template.registerHelper('breadcrumbUtil', function (obj) {
  return BreadcrumbUtil;
});