import SimpleSchema from 'simpl-schema';

PermitTypes = new Mongo.Collection('permit-type');

PermitTypeSchema = new SimpleSchema({
  name: String,

  description: {
    type: String,
    optional: true
  },

  isSalaryCut: Boolean,

  salaryDeductionRate: {
    type: Number,
    optional: true
  },

  status: {
    type: String,
    allowedValues: ['used', 'not-used', 'cancel']
  },
});

PermitTypes.attachSchema(PermitTypeSchema);
PermitTypes.softRemovable();
PermitTypes.autoDates();
PermitTypes.lastEditUser();
PermitTypes.createdUser();