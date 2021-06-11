import languages from '/imports/languages.json'

Template.userComponentLanguageSelect.onCreated(function () {
  this.state = new ReactiveDict(null, {
    code: 'en'
  });
});

Template.userComponentLanguageSelect.helpers({
  languages: function () {
    console.log(languages);
    return languages
  }
});

Template.userComponentLanguageSelect.events({
  'click .brd-select-language': function (event, template) {
    event.preventDefault();
    const code = event.target.dataset.code;
    template.state.set('code',code);
  }
});