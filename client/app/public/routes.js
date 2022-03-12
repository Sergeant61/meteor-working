import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagehome' });
  }
});

FlowRouter.route('/about', {
  name: 'public.about',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageAbout' });
  }
});

FlowRouter.route('/chat', {
  name: 'public.chat',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageChat' });
  }
});

FlowRouter.route('/blog/:id', {
  name: 'public.blog',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageBlog' });
  }
});