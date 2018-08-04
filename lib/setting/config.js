var path = require('path');
exports.config = {
    'serverPort': 3000,
    'mongoDBPort': 27017,
    'mongoDBName': 'sellCars',
    'mongoDBCollection': {
        'salesCollection': 'sales',
        'testDriveCollection': 'testDrive',
        'staffCollection': 'staff',
        'carCollection': 'car'
    },
    'notification': {
        'firebaseUrl': 'https://fcm.googleapis.com/fcm/send',
        'firebaseAuthorization': 'key=AIzaSyDfI2tWiDDP38Vc282j_yRB7IWv4rNrsgw',
        'baiduApiKeyAndroid': 'PFPrBXtPvGpydK0gOfz2yBl1',
        'baiduSecretKeyAndroid': 'vZWv0Ogz5fU2ONFWNuYcakVUSgnhw2t5',
        'baiduApiKeyIOS': '',
        'baiduSecretKeyIOS': '',
        'apnsType': 'production',
        'apnsProductionPassphrase': '1234',
        'apnsDevelopPassphrase': '1234',
        'certProductionPath': path.join(__dirname, 'cert-production.pem'),
        'keyProductionPath': path.join(__dirname, 'key-production.pem'),
        'certDevelopPath': path.join(__dirname, 'cert-develop.pem'),
        'keyDevelopPath': path.join(__dirname, 'key-develop.pem')
    }
}