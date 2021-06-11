import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'job.create',
  validate: new SimpleSchema({
    job: JobSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { job } = data

    const id = Jobs.insert(job);
    return Jobs.findOne({ _id: id });
  }
});