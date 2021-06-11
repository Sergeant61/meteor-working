import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';

const routes = FlowRouter.group({
  prefix: '/user',
  name: 'user',
  triggersEnter: [MustSignIn],
});

routes.route('/profile', {
  name: 'user.profile',
  action: function (params, queryParams) {
    this.render('userLayoutDefault', { page: 'userPageProfile' });
  }
});

routes.route('/blog-create', {
  name: 'user.blogCreate',
  action: function (params, queryParams) {
    this.render('userLayoutDefault', { page: 'userPageBlogCreate' });
  }
});

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);