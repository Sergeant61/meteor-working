Template.publicPagehome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    jobs: [],
    notFound: false
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 5,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'desc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.publicPagehome.onRendered(function () {
  const self = this;
  window.scrollTo(0, 0);

  this.autorun(function () {
    AppUtil.refreshTokens.get('jobs');

    const currentPage = self.pagination.get('currentPage');
    const pageItems = self.pagination.get('pageItems');
    const filtering = self.filtering.all();
    const sorting = self.sorting.all();

    const obj = {
      options: {
        pagination: {
          currentPage: currentPage,
          pageItems: pageItems
        },
        filtering: filtering,
        sorting: sorting
      }
    };

    LoadingLine.show()
    Meteor.call('job.list', obj, function (error, result) {
      LoadingLine.hide()

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      console.log(result);
      self.state.set('jobs', result.jobs);
      self.state.set('notFound', result.options.pagination.totalCount === 0);
      self.pagination.set('currentPage', result.options.pagination.currentPage);
      self.pagination.set('pageItems', result.options.pagination.pageItems);
      self.pagination.set('totalCount', result.options.pagination.totalCount);
      self.pagination.set('totalPages', result.options.pagination.totalPages);
    });
  });
});

Template.publicPagehome.events({
  'click .brd-delete': function (event, template) {
    event.preventDefault();
    const job = this;

    LoadingLine.show()
    Meteor.call('job.delete', { _id: job._id }, function (error, result) {
      LoadingLine.hide()

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      AppUtil.refreshTokens.set('jobs', Random.id());
    });
  }
});