SignedInMixin = function (methodOptions) {
  const runFunc = methodOptions.run;

  methodOptions.run = function (_data) {
    const userId = this.userId;

    if (!userId) {
      ErrorHandler('unauthorized', i18n.__('utils', 'signedInMixinError'));
    }

    return runFunc.call(this, ...arguments);
  };

  return methodOptions;
};