import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'room.create',
  validate: new SimpleSchema({
    room: RoomSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { room } = data

    const id = Rooms.insert(room);
    return Rooms.findOne({ _id: id });
  }
});