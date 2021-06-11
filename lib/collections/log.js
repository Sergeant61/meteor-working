import SimpleSchema from 'simpl-schema';

Logs = new Mongo.Collection('logs');

LogUserSchema = new SimpleSchema({
  fullname: {
    type: String,
    optional: true
  },

  emailAddress: {
    type: String,
    optional: true
  },
});

LogSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  user: LogUserSchema,

  key: {
    type: String,
    allowedValues: [
      'userLogin'
    ]
  },

  source: {
    type: String,
    allowedValues: ['core']
  },

  type: {
    type: String,
    allowedValues: ['info', 'error', 'warning']
  },

  payload: {
    type: Object,
    blackbox: true,
    optional: true
  }
});

Logs.attachSchema(LogSchema);
Logs.softRemovable();
Logs.autoDates();