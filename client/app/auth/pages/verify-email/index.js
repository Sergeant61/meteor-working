import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.authPageVerifyEmail.onRendered(function () {

  this.autorun(function () {
    const token = FlowRouter.getQueryParam('token');

    if (!token) {
      return;
    }

    Accounts.verifyEmail(token, function (error) {

      if (error) {
        ErrorHandler.show(error);
        return;
      }

    })
  });
});