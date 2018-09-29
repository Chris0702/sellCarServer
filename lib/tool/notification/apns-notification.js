 var apn = require('apn');
 let config = require('../../setting/config').config;
 // let providerProduction = new apn.Provider({
 //             cert: config.notification.certProductionPath,
 //             key: config.notification.keyProductionPath,
 //             production: true,
 //             passphrase: config.notification.apnsProductionPassphrase
 //         });
 // let providerDevelop = new apn.Provider({
 //             cert: config.notification.certDevelopPath,
 //             key: config.notification.keyDevelopPath,
 //             production: false,
 //             passphrase: config.notification.apnsDevelopPassphrase
 //         });
 // let incount =0;
 // let outcount =0;
 
 exports.sendNotification = function(deviceToken, title, bodyTxt, apnsType, callback) {
     // console.log('\x1b[32m-----apns---response---1111111-----\x1b[37m');
     // console.log('incount:::  '+incount);
     // incount++;
     let provider = null;
     if (apnsType == undefined || apnsType == null) {
         apnsType = config.notification.apnsType;
     }
     if (apnsType == 'production') {
         provider = providerProduction;
     } else {
         provider = providerDevelop;
     }
     let deviceTokens = [deviceToken]
     let notification = new apn.Notification();
     notification.alert = bodyTxt;
     notification.title = title;
     notification.sound = 'default';
     notification.topic = 'com.xxx';
     provider.send(notification, deviceTokens).then((response) => {
        // console.log('outcount:::  '+outcount);
        // outcount++;
        //  console.log('\x1b[35m-----apns---response--------\x1b[37m');
        //  console.log(JSON.stringify(response));
         if (response.failed.length == 0) {
             callback(true);
         } else {
             callback(false);
         }
     });
 }