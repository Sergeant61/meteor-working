import SimpleSchema from 'simpl-schema';

UserProfileSchema = new SimpleSchema({
  name: String,

  lastName: String,

  status: {
    type: String,
    allowedValues: ['active', 'deactive'],
    optional: true
  },

  isAdmin: Boolean
});

UserStatusLastLoginSchema = new SimpleSchema({
  date: {
    type: Date,
    optional: true
  },

  ipAddr: {
    type: String,
    optional: true
  }
});

UserStatusSchema = new SimpleSchema({
  lastLogin: {
    type: UserStatusLastLoginSchema,
    optional: true
  },

  userAgent: {
    type: String,
    optional: true
  },

  idle: {
    type: Boolean,
    optional: true
  },

  lastActivity: {
    type: Date,
    optional: true
  },

  online: {
    type: Boolean,
    optional: true
  }
});

UserSchema = new SimpleSchema({
  profile: UserProfileSchema,

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  personnelId: {
    type: SimpleSchema.RegEx.Id,
    optional: true
  },

  emails: {
    type: Array,
    optional: true
  },

  'emails.$': {
    type: Object,
    blackbox: true
  },

  status: {
    type: UserStatusSchema,
    optional: true,
  },
});

Meteor.users.attachSchema(UserSchema);
Meteor.users.softRemovable();
Meteor.users.autoDates();