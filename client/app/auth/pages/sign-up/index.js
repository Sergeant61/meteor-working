import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.authPageSignUp.events({
  'submit form': function (event, template) {
    event.preventDefault();
    LoadingSection.show(template, '.authPageSignUp');

    const name = event.target.name.value;
    const lastName = event.target.lastName.value;
    const emailAddress = event.target.emailAddress.value;
    const password = event.target.password.value;
    const passwordAgain = event.target.passwordAgain.value;

    const obj = {
      email: emailAddress,
      password: password,
      profile: {
        name: name,
        lastName: lastName
      }
    };

    Accounts.createUser(obj, function (error, result) {
      if (error) {
        LoadingSection.hide(template, '.authPageSignUp');
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