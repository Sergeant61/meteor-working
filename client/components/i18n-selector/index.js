Template.componentI18nSelector.events({
  'click .brd-language': function (event, template) {
    event.preventDefault();
    
    const locale = event.target.dataset.code;
    CurrentLocale.set(locale);
  }
});