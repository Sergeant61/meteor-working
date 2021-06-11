import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';

ErrorHandler = {
  show: function (error, template) {
    console.log(error, template);
    let message;

    if (typeof error === 'string') {
      message = error;
    } else {
      message = error.reason;
    }

    if (typeof error === 'object') {

      if (error.error === 'not-verified') {
        Swal.fire({
          title: Translate('globals.swal', 'verifyTitle'),
          text: error.reason,
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: Translate('globals', 'ok'),
          confirmButtonText: Translate('globals.swal', 'sendVerification')
        }).then((value) => {
          if (!value.isConfirmed) {
            return;
          }

          Meteor.call('auth.resendVerification', function (error, _result) {
            Swal.fire({
              title: Translate('globals.swal', 'verificationSentTitle'),
              text: Translate('globals.swal', 'verificationSentDescription'),
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: Translate('globals', 'ok'),
            }).then((value) => {
              FlowRouter.go('/');
            });
          });
        });

        return;
      } else if (error.error == 422 && template) {
        const errors = error.reason.errors;

        Object.keys(errors).forEach(function (key) {
          const elements = template.$(`input[name='${key}']`);

          if (elements.length > 0) {
            template.$(`input[name='${key}']`).addClass('is-invalid');
            const label = template.$(`input[name='${key}']`).siblings('label');
            label.attr('data-content', ` * (${errors[key]})`);
          } else {
            Swal.fire({
              title: Translate('globals.swal', 'errorTitle'),
              text: errors[key],
              icon: 'error',
              confirmButtonText: Translate('globals', 'ok')
            });
          }
        });

        return;
      } else if (error.error == 404) {
        message = error.reason?.error || '';
      }
    }

    Swal.fire({
      title: Translate('globals.swal', 'errorTitle'),
      text: message,
      icon: 'error',
      confirmButtonText: Translate('globals', 'ok')
    });
  },

  reset: function (template) {
    template.$('input').removeClass('is-invalid');
  }
};