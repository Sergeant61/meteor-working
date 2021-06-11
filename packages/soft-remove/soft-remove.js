export const name = 'soft-remove';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'simpl-schema': '1.10.2',
  'slugify': '1.4.6'
}, 'bordo:soft-remove');

const slugify = require('slugify');
const SimpleSchema = require('simpl-schema');
SimpleSchema.extendOptions(['denyInsert']);

const _schema = new SimpleSchema({
  removedAt: {
    denyInsert: true,
    optional: true,
    type: Date
  }
});

const _beforeFindHook = function(_userId, _selector, _options) {
  _selector.removedAt = { $exists: false };
};

Mongo.Collection.prototype.softRemovable = function() {
  const collection = this;
  collection.attachSchema(_schema);

  collection.softRemove = function(selector) {
    collection.update(selector, {
      $set: {
        removedAt: new Date()
      }
    }, {multi: true});
  };

  collection.before.find(_beforeFindHook);
  collection.before.findOne(_beforeFindHook);

  if(Meteor.isServer) {
    collection.rawCollection().createIndex({ removedAt: -1 });
  }
};