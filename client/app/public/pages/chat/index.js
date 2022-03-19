Template.publicPageChat.onCreated(function () {
  this.state = new ReactiveDict(null, {
    rooms: [],
    room: null
  });

  this.recep = 'recep'
});

Template.publicPageChat.onRendered(function () {
  const self = this;

  this.autorun(function() {
    const room = self.state.get('room');

    if (!room) {
      return;
    }

    console.log(room);
    self.messageSub = Meteor.subscribe('chat.messages', room._id);
    console.log(self.messageSub);
  })

  this.autorun(function () {
    AppUtil.refreshTokens.get('rooms');

    Meteor.call('room.list', {}, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }

      console.log(result);
      self.state.set('rooms', result.rooms);
    });
  });
});

Template.publicPageChat.onDestroyed(function () { 
   
});

Template.publicPageChat.helpers({
  messages: function() {
    return Messages.find({}).fetch();
  },
  recep1: function() {
    return Template.instance().recep;
  }
});

Template.publicPageChat.events({
  'submit form#brdRoomCreateForm': function (event, template) {
    event.preventDefault();

    const name = event.target.name.value;

    const obj = {
      room: {
        name: name
      }
    }

    Meteor.call('room.create', obj, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }

      AppUtil.refreshTokens.set('rooms', Random.id());
      console.log(result);
      event.target.reset();
    });
  },

  'submit form#brdMessageCreateForm': function (event, template) {
    event.preventDefault();

    const message = event.target.message.value;
    const room = template.state.get('room');

    const obj = {
      message: {
        roomId: room._id,
        message: message
      }
    }

    Meteor.call('message.create', obj, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }

      event.target.reset();
    });
  },

  'click .brd-room-select': function (event, template) {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target.dataset);
    console.log(this);
    template.state.set('room', this);
  }
});