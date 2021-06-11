import SimpleSchema from 'simpl-schema';

UserStatusLogs = new Mongo.Collection('user-status-logs');

UserStatusLogSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  connectionId: SimpleSchema.RegEx.Id,
  ipAddr: SimpleSchema.RegEx.IP,
  userAgent: String,
  loginTime: Date,

  type: {
    type: String,
    allowedValues: ['login']
  }
});

UserStatusLogs.attachSchema(UserStatusLogSchema);
UserStatusLogs.softRemovable();
UserStatusLogs.autoDates();