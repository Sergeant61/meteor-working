import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.componentFooter.events({
  'click .brd-logo': function (event, template) {
    event.preventDefault();
    FlowRouter.go('/')
  },
});