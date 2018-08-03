let mongoDB = require('../db/mongoDB');
let config = require('../config').config;
let utilsValue = require('../utils/value');
let collectionName = config.mongoDBCollection.testDriveCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
exports.saveTestDriveInfo = function(test_drive_id, name, company, phone, line, wechat, mail, region, cars, hopeTime, callback) {
    if (utilsValue.isValid(name) && utilsValue.isNumber(phone)) {
        let saveTestDriveInfo = {
            'name': name,
            'company': company,
            'phone': phone,
            'line': line,
            'wechat': wechat,
            'mail': mail,
            'region': region,
            'cars': cars,
            'hopeTime': hopeTime
        }
        if (utilsValue.isValid(test_drive_id)) {
            saveTestDriveInfo._id = ObjectId(test_drive_id);
        }
        mongoDB.save(collectionName, saveTestDriveInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}

exports.removeTestDriveInfo = function(test_drive_id, callback) {
    if (utilsValue.isValid(test_drive_id)) {
        let removeTestDriveInfo = {
            '_id': ObjectId(test_drive_id)
        }
        mongoDB.remove(collectionName, removeTestDriveInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}