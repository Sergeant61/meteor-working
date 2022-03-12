import SimpleSchema from 'simpl-schema';

Rooms = new Mongo.Collection('room');

RoomSchema = new SimpleSchema({
  name: String,

  description:  {
    type: String,
    optional: true
  }
});

Rooms.attachSchema(RoomSchema);
Rooms.softRemovable();
Rooms.autoDates();
Rooms.lastEditUser();
Rooms.createdUser();