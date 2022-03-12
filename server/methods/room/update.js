import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'room.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    room: RoomSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, room } = data

    const id = Rooms.update({ _id: _id }, {
      $set: room
    });

    return Rooms.findOne({ _id: id });
  }
});







