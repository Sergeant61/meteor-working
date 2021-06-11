Template.componentSearch.events({
  'submit form': function (event, template) {
    event.preventDefault();
    template.data.paginationState.set('currentPage', 1);
    template.data.filteringState.set('keyword', event.target.keyword.value);
  }
}); 
