Template.componentPagination.onCreated(function () {
  this.state = new ReactiveDict(null, {
    pages: [],
    pageCount: 0
  });
});

Template.componentPagination.onRendered(function () {
  const self = this;

  this.autorun(function () {
    const currentPage = self.data.paginationState.get('currentPage');
    const totalCount = self.data.paginationState.get('totalCount');
    const pageItems = self.data.paginationState.get('pageItems');
    const page = Math.ceil(totalCount / pageItems);
    const pages = [];

    if (page > 7) {
      const startCount = currentPage - 5 < 0 ? 0 : currentPage - 5
      const endCount = currentPage + 5 > page ? page : currentPage + 5

      if (startCount > 0) {
        pages.push({ value: startCount, text: '...' })
      }
      for (let i = startCount; i < endCount; i++) {
        pages.push({ value: i + 1, text: i + 1 })
      }
      if (endCount < page) {
        pages.push({ value: endCount + 1, text: '...' })
      }
    } else {
      for (let i = 0; i < page; i++) {
        pages.push({ value: i + 1, text: i + 1 })
      }
    }

    self.state.set('pages', pages);
    self.state.set('pageCount', page);
  });
});

Template.componentPagination.events({
  'click .brd-previous': function (event, template) {
    event.preventDefault();
    let currentPage = template.data.paginationState.get('currentPage');

    if (currentPage > 1) {
      currentPage = currentPage - 1
    }

    template.data.paginationState.set('currentPage', currentPage);

  },

  'click .brd-next': function (event, template) {
    event.preventDefault();
    let currentPage = template.data.paginationState.get('currentPage');
    const pages = template.state.get('pages');

    if (currentPage < pages[pages.length - 1].value) {
      currentPage = parseInt(currentPage) + 1
    }

    template.data.paginationState.set('currentPage', currentPage);
  },

  'click .brd-page': function (event, template) {
    event.preventDefault();
    template.data.paginationState.set('currentPage', this.value);
  }
});


