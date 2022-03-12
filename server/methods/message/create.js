import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'message.create',
  validate: new SimpleSchema({
    message: MessageSchema.omit('userId')
  }).validator(),
  run: function (data) {
    this.unblock();
    const { message } = data

    message.userId = Meteor.userId();

    const id = Messages.insert(message);
    return Messages.findOne({ _id: id });
  }
});