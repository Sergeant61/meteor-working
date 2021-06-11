import SimpleSchema from 'simpl-schema';

Permits = new Mongo.Collection('permit');

PermitSchema = new SimpleSchema({
  personnelId: SimpleSchema.RegEx.Id,

  permitTypeId: SimpleSchema.RegEx.Id,

  startAt: Date,

  endAt: Date,

  description: {
    type: String,
    optional: true
  },

  status: {
    type: String,
    allowedValues: ['used', 'not-used', 'cancel']
  },
});

Permits.attachSchema(PermitSchema);
Permits.softRemovable();
Permits.autoDates();
Permits.lastEditUser();
Permits.createdUser();