import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'job.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    job: JobSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, job } = data

    const id = Jobs.update({ _id: _id }, {
      $set: job
    });

    return Jobs.findOne({ _id: id });
  }
});







