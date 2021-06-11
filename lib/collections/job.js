import SimpleSchema from 'simpl-schema';

Jobs = new Mongo.Collection('job');

JobSchema = new SimpleSchema({
  name: String,

  description:  {
    type: String,
    optional: true
  }
});

Jobs.attachSchema(JobSchema);
Jobs.softRemovable();
Jobs.autoDates();
Jobs.lastEditUser();
Jobs.createdUser();