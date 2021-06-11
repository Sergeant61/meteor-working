AppUtil = {
  temp: new ReactiveDict(null, {}),
  refreshTokens: new ReactiveDict(null, {})
};

Template.registerHelper('appUtil', function () {
  return AppUtil;
});