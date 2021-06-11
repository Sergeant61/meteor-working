import bootstrap from "bootstrap";

Template.publicModalJobCreate.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById('brdPublicModalJobCreate');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
    self.$('#brdJobCreateForm').trigger("reset");
  });

});

Template.publicModalJobCreate.events({
  'submit form#brdJobCreateForm': function (event, template) {
    event.preventDefault();

    const name = event.target.name.value;
    const description = event.target.description.value;

    const obj = {
      job: {
        name: name,
        description: description
      }
    }

    LoadingLine.show();
    Meteor.call('job.create', obj, function (error, success) {
      LoadingLine.hide();

      if (error) {
        console.log('error', error);
        return;
      }

      AppUtil.refreshTokens.set('jobs', Random.id());
      event.target.reset();
      template.modal.hide();
    });
  }
});