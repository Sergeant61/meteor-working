Template.userComponentCategorySelect.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    categoryId: null,
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.userComponentCategorySelect.onRendered(function () {
  const self = this

  this.autorun(function () {
    const language = CurrentLocale.get();
    const parentId = self.data.parentId;

    if (!language) {
      return
    }

    if (parentId) {
      self.filtering.set('parentCategoryId', parentId)
    }

    const obj = {
      lang: language.slice(0, 2),
      options: {
        filtering: self.filtering.all()
      }
    }

    LoadingLine.show()
    Meteor.call('public.categories.list', obj, function (_error, _result) {
      LoadingLine.hide()

      if (_error) {
        ErrorHandler.show(_error);
        return;
      }

      console.log(_result.categories);
      self.state.set('categories', _result.categories)
    });
  });
});

Template.userComponentCategorySelect.events({
  'change .brd-categories': function (event, template) {
    event.stopImmediatePropagation()

    const categoryId = event.target.value || null;
    template.state.set('categoryId', categoryId)

    console.log(categoryId);
  }
});