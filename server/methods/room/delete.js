import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'room.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Rooms.remove({ _id: _id });
  }
});




