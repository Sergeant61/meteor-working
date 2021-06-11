Template.registerHelper('formatDateTime', function (a) {
  return a ? moment(a).format('MM/DD/YYYY - hh:mm:ss a') : "~";
});

Template.registerHelper('formatDate', function (a) {
  return a ? moment(a).format('MM/DD/YYYY') : "~";
});

Template.registerHelper('formatDateForInput', function (a) {
  return a ? moment(a).format('YYYY-MM-DD') : "~";
});