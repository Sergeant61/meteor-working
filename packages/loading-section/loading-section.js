// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See loading-section-tests.js for an example of importing.
export const name = 'loading-section';
import query from 'array-query';

LoadingSection = {
  _views: {},

  show: function(template, selector) {
    const parent = template.find(selector);

    if(!parent) {
      // console.warn(`LoadingSection: parent not found! Trying again. (${selector})`, template.view.name);

      Meteor.setTimeout(function() {
        LoadingSection.show(template, selector);
      }, 50);

      return;
    }

    if(!template._loadingSections) {
      template._loadingSections = [];
    }

    let _loadingSection = query('selector').is(selector).on(template._loadingSections)[0];

    if(_loadingSection) {
      return;
    }

    _loadingSection = {
      id: Random.id(),
      selector: selector
    };
    
    template._loadingSections.push(_loadingSection);

    
    parent.classList.add('position-relative');

    const view = Blaze.render(Template.LoadingSection, parent);
    LoadingSection._views[_loadingSection.id] = view;
  },

  hide: function(template, selector) {
    if(!template._loadingSections) {
      return;
    }

    const _loadingSection = query('selector').is(selector).on(template._loadingSections)[0];

    if(!_loadingSection) {
      return;
    }

    const view = LoadingSection._views[_loadingSection.id];

    if(!view) {
      return;
    }

    Blaze.remove(view);
    delete LoadingSection._views[_loadingSection.id];

    template._loadingSections = template._loadingSections.filter(function(loadingSection) {
      return loadingSection.id != _loadingSection.id;
    });
  }
};