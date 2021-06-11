SendEmail = (emailAddress, template, datas) => {
  const obj = {
    to: emailAddress,
    from: Meteor.settings.email.from,
    subject: datas.subject,
    html: SSR.render(template, datas)
  };

  Meteor.defer(function () {
    Email.send(obj);
  });
};