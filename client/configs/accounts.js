import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Accounts.onResetPasswordLink(function (token, done) {
  FlowRouter.go(`/auth/forgot-password-verify?token=${token}`);
});

Accounts.onEnrollmentLink(function (token, done) {
  FlowRouter.go(`/auth/set-password?token=${token}`);
});

Accounts.onEmailVerificationLink(function (token, done) {
  FlowRouter.go(`/auth/verify-email?token=${token}`);
});