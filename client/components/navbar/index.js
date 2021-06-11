import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.componentNavbar.events({
  'click .brd-signout': function (event, template) {
    event.preventDefault();
    Meteor.logout(function () {
      FlowRouter.go('/');
    });
  },
});