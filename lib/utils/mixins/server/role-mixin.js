RoleMixin = function (methodOptions) {
  const roles = methodOptions.roles;
  const runFunc = methodOptions.run;

  methodOptions.run = function (_data) {
    const group = _data.slug || Roles.GLOBAL_GROUP;
    const userId = this.userId;
    const isInRole = Roles.userIsInRole(userId, roles, group);

    if (!isInRole) {
      ErrorHandler('forbidden', i18n.__('utils', 'roleMixinError'));
    }

    return runFunc.call(this, ...arguments);
  }
  return methodOptions;
}