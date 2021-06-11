import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

MustSignIn = function (context, redirect, stop) {
  if (!Meteor.userId()) {
    redirect(`/auth/sign-in?redirect=${context.path}`);
    stop();
  }
}

MustSignOut = function (context, redirect, stop) {
  if (Meteor.userId()) {
    redirect('/');
    stop();
  }
}

IsAdmin = function (context, redirect, stop) {
  if (!Roles.userIsInRole(Meteor.userId(), ['roles.admin'])) {
    redirect('/');
    stop();
  }
}

FlowRouter.wait();
Tracker.autorun(() => {
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize();
  }
});