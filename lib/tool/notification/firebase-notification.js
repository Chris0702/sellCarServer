let httpRequest = require('../../utils/httpRequest');
let config = require('../../setting/config').config;
exports.sendNotification = function(firebaseToken, title, bodyTxt, callback) {
  let url = config.notification.firebaseUrl;
  let method = 'POST';
  let headers = {
    'Authorization': config.notification.firebaseAuthorization,
    'Content-Type': 'application/json'
  };
  let json = {
    'to': firebaseToken,
    'notification': {
      'title': title,
      'body': bodyTxt
    }
  }
  httpRequest.sendJsonRequest(url, headers, json, method, (error, body) => {
    if (error) {
      callback(false);
    } else {
      callback(true);
    }
  });
}
