let config = require('../setting/config').config;
let firebaseNotification = require('./firebase-notification');
let BaiduPush = require('./biadu-notification');
let apnsNotification = require('./apns-notification');

function notify(pushMessageTypeObj, title, message, callback) {
  switch (pushMessageType) {
    case 'firebase':
      sendNotificationByFirebase(title, message, pushMessageTypeObj.firebaseToken, callback);
      break;
    case 'baidu':
      sendNotificationByBaidu(title, message, pushMessageTypeObj.baiduNotificationChannelId, callback);
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

function sendNotificationByBaidu(title, message, baiduNotificationChannelId, callback) {
  let baiduPushAndroid = new BaiduPush(config.notification.baiduApiKeyAndroid, config.notification.baiduSecretKeyAndroid);
  message = baiduPushAndroid.buildMessageForAndroid(title, message, {});
  baiduPushAndroid.pushSingleDevice(baiduNotificationChannelId, message, BaiduPush.Constants.DeviceType.ANDROID, BaiduPush.Constants.MsgType.Message)
    .then(function(result) {
      callback(true);
    }).catch((err) => {
      callback(false);
    });
}

exports.notify = notify;