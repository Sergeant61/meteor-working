Template.publicPageAbout.onCreated(function () {
  this.state = new ReactiveDict(null, {
    name: 'Recep',
    surname: 'Özen',
    age: 26
  });

  this.data.year = 2000
  this.data.state = 'active'

  this.count = new ReactiveVar(0);
});

Template.publicPageAbout.onRendered(function () {
  this.name
});

Template.publicPageAbout.onDestroyed(function () {
  this.name
});

Template.publicPageAbout.events({
  'click .brd-remove': function (event, template) {
    const count = template.count.get();
    template.count.set(count - 1);
  },
  'click .brd-add': function (event, template) {
    const count = template.count.get();
    template.count.set(count + 1);
  },
});

Template.publicPageAbout.helpers({
  count: function () {
    return Template.instance().count
  },
  cars: function () {
    return [{ id: 1, name: 'Araba 1' },
    { id: 2, name: 'Araba 1' },
    { id: 3, name: 'Araba 1' },
    { id: 4, name: 'Araba 1' },]
  },
});

