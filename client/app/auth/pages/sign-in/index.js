import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.authPageSignIn.events({
  'submit form': function (event, template) {
    event.preventDefault();
    LoadingSection.show(template, '.brd-loading-section');
    const emailAddress = event.target.emailAddress.value;
    const password = event.target.password.value;

    Meteor.loginWithPassword(emailAddress, password, function (error) {
      LoadingSection.hide(template, '.brd-loading-section');

      if (error) {
        ErrorHandler.show(error);
        return;
      }

      const redirect = FlowRouter.getQueryParam('redirect');

      if (redirect) {
        FlowRouter.go(redirect);
      } else {
        FlowRouter.go('public.home');
      }
    });
  }
});