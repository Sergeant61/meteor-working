import SimpleSchema from 'simpl-schema';

Locations = new Mongo.Collection('locations');

LocationSchema = new SimpleSchema({
  name: String,
  isParent: Boolean,
  labelKey: String,

  childLabelKey: {
    type: String,
    optional: true
  },

  parentLocationId: {
    type: SimpleSchema.RegEx.Id,
    optional: true
  }
});

Locations.attachSchema(LocationSchema);
Locations.softRemovable();