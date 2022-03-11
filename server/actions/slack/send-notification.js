ActionSendNotification = function (texts) {
  const webhookUrl = Meteor?.settings?.slack?.webhookUrl;
  const rootUrl = Meteor?.settings?.rootUrl;

  if (!webhookUrl || !rootUrl) {
    return;
  }

  const payload = {
    username: 'App Bot',
    text: texts.join('\n>'),
    icon_url:  `${rootUrl}/assets/images/slack-logo.png` 
  }

  HTTP.call('POST', webhookUrl, { data: payload }, function (error, response) {
    if (error) {
      console.log('Log: Error, Reason: ' + error);
    } else {
      console.log('Log: Message Delivered');
    }
  });
}