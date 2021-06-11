export const name = 'slugify';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'simpl-schema': '1.10.2',
  'slugify': '1.4.6'
}, 'bordo:auto-dates');

const slugify = require('slugify');
const SimpleSchema = require('simpl-schema');
SimpleSchema.extendOptions(['denyInsert', 'denyUpdate']);

const _schema = new SimpleSchema({
  slug: {
    type: String,
    optional: true
  },
});

Slugs = new Mongo.Collection('slugs');

Mongo.Collection.prototype.slugify = function(_options) {
  const collection = this;
  const field = _options.field;

  collection.attachSchema(_schema);

  collection.before.insert(function(_userId, _doc) {
    let baseSlug = slugify(_doc[field], {
      lower: true,
      remove: /[*+~.()'/_"!:@]/g
    });
    let postfix;
    let slug;

    while(true) {
      if(postfix) {
        slug = `${baseSlug}-${postfix}`
      } else {
        slug = baseSlug;
      }

      const existingSlug = Slugs.findOne({slug: slug});

      if(existingSlug) {
        postfix = postfix ? postfix+1 : 1;
      } else {
        break;
      }
    };

    Slugs.insert({slug: slug});
    _doc.slug = slug;
  });
};
