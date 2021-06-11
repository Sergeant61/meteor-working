import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';

const routes = FlowRouter.group({
  prefix: '/auth',
  name: 'auth',
  triggersEnter: [MustSignOut],
});

routes.route('/sign-up', {
  name: 'auth.signUp',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', { page: 'authPageSignUp' });
  }
});

routes.route('/sign-in', {
  name: 'auth.signIn',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', { page: 'authPageSignIn' });
  }
});

routes.route('/forgot-password', {
  name: 'forgor.password',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', { page: 'authPageForgotPassword' });
  }
});

routes.route('/forgot-password-verify', {
  name: 'forgot.password.verify',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', { page: 'authPageForgotPasswordVerify' });
  }
});

FlowRouter.route('/auth/set-password', {
  name: 'set.password',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', { page: 'authPageSetPassword' });
  }
});

FlowRouter.route('/auth/verify-email', {
  name: 'verify.email',
  action: function (params, queryParams) {
    this.render('authLayoutDefault', { page: 'authPageVerifyEmail' });
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);