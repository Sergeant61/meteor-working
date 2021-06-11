Package.describe({
  name: 'bordo:loading-line',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.12');
  api.use('ecmascript');
  api.use('blaze-html-templates');
  api.use('less');
  api.use('reactive-var');

  api.addFiles('loading.js', 'client');
  api.addFiles('index.html', 'client');
  api.addFiles('style.less', 'client');

  api.export('LoadingLine');
});