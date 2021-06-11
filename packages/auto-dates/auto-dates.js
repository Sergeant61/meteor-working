export const name = 'auto-dates';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'simpl-schema': '1.10.2'
}, 'bordo:auto-dates');

const SimpleSchema = require('simpl-schema');
SimpleSchema.extendOptions(['denyInsert', 'denyUpdate']);

const _schema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    },
    optional: true,
    denyUpdate: true
  },

  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Mongo.Collection.prototype.autoDates = function() {
  const collection = this;
  collection.attachSchema(_schema);
};
