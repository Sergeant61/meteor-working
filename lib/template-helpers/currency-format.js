CurrencyFormat = function (value, currencyType) {
  if (value == undefined) {
    return '';
  }

  if(!currencyType) {
    currencyType = Meteor.settings.public.financial.currency;
  }

  const lang = CurrentLocale.get() || 'en-US' // default value
  let currency;

  if (currencyType && ((typeof currencyType) == 'string')) {
    currency = currencyType;
  }

  if (!currency) {
    return value;
  }

  return Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(value);
}

Template.registerHelper('currencyFormat', function (value, currencyType) {
  return CurrencyFormat(value, currencyType);
});