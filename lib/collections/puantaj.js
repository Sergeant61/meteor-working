import SimpleSchema from 'simpl-schema';

Puantaj = new Mongo.Collection('puantaj');

PuantajSchema = new SimpleSchema({
  personnelId: SimpleSchema.RegEx.Id,

  puantajTypeId: SimpleSchema.RegEx.Id,

  startAt: Date,

  endAt: {
    type: Date,
    optional: true
  },

  price: Number,
});

Puantaj.attachSchema(PuantajSchema);
Puantaj.softRemovable();
Puantaj.autoDates();
Puantaj.lastEditUser();
Puantaj.createdUser();