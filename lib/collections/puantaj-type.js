import SimpleSchema from 'simpl-schema';

PuantajTypes = new Mongo.Collection('puantaj-type');

PuantajTypeSchema = new SimpleSchema({
  name: String,

  description:  {
    type: String,
    optional: true
  }
});

PuantajTypes.attachSchema(PuantajTypeSchema);
PuantajTypes.softRemovable();
PuantajTypes.autoDates();
PuantajTypes.lastEditUser();
PuantajTypes.createdUser();