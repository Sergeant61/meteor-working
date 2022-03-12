import SimpleSchema from 'simpl-schema';

Messages = new Mongo.Collection('message');

MessageSchema = new SimpleSchema({
  message: String,

  roomId: SimpleSchema.RegEx.Id,
  userId: SimpleSchema.RegEx.Id,

  description: {
    type: String,
    optional: true
  }
});

Messages.attachSchema(MessageSchema);
Messages.softRemovable();
Messages.autoDates();
Messages.lastEditUser();
Messages.createdUser();