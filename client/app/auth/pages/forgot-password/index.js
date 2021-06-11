import Swal from 'sweetalert2';

Template.authPageForgotPassword.events({
  'submit form': function (event, template) {
    event.preventDefault();
    LoadingSection.show(template, '.brd-loading-section');
    const emailAddress = event.target.emailAddress.value;

    Meteor.call('auth.forgotPassword', { email: emailAddress }, function (_error, _result) {
      LoadingSection.hide(template, '.brd-loading-section');

      if (_error) {
        ErrorHandler.show(_error);
        return;
      }

      Swal.fire({
        title: Translate('globals.swal', 'successful'),
        text: 'We have sent you an e-mail to reset your password.',
        icon: 'success',
        confirmButtonText: Translate('globals', 'ok')
      });
    });
  }
});