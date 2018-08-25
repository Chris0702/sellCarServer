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
        'firebaseAuthorization': 'key=AAAA7abv20Y:APA91bEm959SjBitdGXsI4Z_cq58KO4yo4k-n9MBZYiKDphaebHs6atiz5nvdKVBa1LA2J1HHXwMkGpUjdDfOJYpHpRxLI5LayitIKU-W4YquKfjtOSTi5gv_vP3Rlqknp18eWDBbus8',
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
    },
    'line':{
        'salesNotifyToken':'Bearer NvgAGpxAg6IbE8CmYjrb2FqDVonO1b4KYTPgO1Ccx8V',
        'rdNotifyToken':'Bearer BVcrSpv8eNjk4KjErJvAE1KjvFNc6X2kcI30u0njaNf'
    }
}