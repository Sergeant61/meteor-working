import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'job.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return Jobs.findOne({
      _id: _id
    });
  }
});


