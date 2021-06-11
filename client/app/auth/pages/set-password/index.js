import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from "sweetalert2";

Template.authPageSetPassword.events({
  'submit form': function (event, template) {
    event.preventDefault();

    const token = FlowRouter.getQueryParam('token');
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (!token) {
      ErrorHandler.show({ reason: 'Sıfırlama anahtarı bulunamadı.' });
      return;
    }

    if (password != confirmPassword) {
      ErrorHandler.show({ reason: 'Girdiğiniz şifreler aynı değil' });
      return;
    }

    LoadingSection.show(template, '.brd-loading-section');
    Accounts.resetPassword(token, password, function (error) {
      LoadingSection.hide(template, '.brd-loading-section');

      if (error) {
        ErrorHandler.show(error);
        return;
      }

      Swal.fire({
        title: Translate('globals.swal', 'successful'),
        text: 'Your password has been set',
        icon: 'success',
        confirmButtonText: Translate('globals', 'ok')
      }).then((r) => {
        FlowRouter.go('/');
      });
    });
  }
});