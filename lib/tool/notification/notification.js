let config = require('../../setting/config').config;
let firebaseNotification = require('./firebase-notification');
let apnsNotification = require('./apns-notification');

function notify(pushMessageTypeObj, title, message, callback) {
  switch (pushMessageTypeObj.pushMessageType) {
    case 'firebase':
      sendNotificationByFirebase(title, message, pushMessageTypeObj.firebaseToken, callback);
      break;
    case 'apns':
      sendNotificationByApns(title, message, pushMessageTypeObj.apnsToken, pushMessageTypeObj.apnsType, callback);
      break;
    default:
      callback(false);
  }
}


function sendNotificationByApns(title, message, apnsToken, apnsType, callback) {
  apnsNotification.sendNotification(apnsToken, title, message, apnsType, (result) => {
    if (!result) {
      callback(false);
    } else {
      callback(true);
    }
  })
}

function sendNotificationByFirebase(title, message, firebaseToken, callback) {
  firebaseNotification.sendNotification(firebaseToken, title, message, (result) => {
    if (!result) {
      callback(false);
    } else {
      callback(true);
    }
  })
}

exports.notify = notify;