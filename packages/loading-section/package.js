Package.describe({
  name: 'bordo:loading-section',
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
  api.use('reactive-var');
  api.use('random');

  api.addFiles('index.html', 'client');
  api.addFiles('loading-section.js', 'client');

  api.export('LoadingSection');
});