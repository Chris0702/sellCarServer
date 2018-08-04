let mongoDB = require('../db/mongoDB');
let config = require('../setting/config').config;
let utilsValue = require('../utils/value');
let collectionName = config.mongoDBCollection.staffCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
exports.saveStaffInfo = function(staff_id, name, phone, line, wechat, mail, region, callback) {
    if (utilsValue.isValid(name) && utilsValue.isNumber(phone)) {
        let saveStaffInfo = {
            'name': name,
            'phone': phone,
            'line': line,
            'wechat': wechat,
            'mail': mail,
            'region': region
        }
        if (utilsValue.isValid(staff_id)) {
            saveStaffInfo._id = ObjectId(staff_id);
        }
        mongoDB.save(collectionName, saveStaffInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}

exports.removeStaffInfo = function(staff_id, callback) {
    if (utilsValue.isValid(staff_id)) {
        let removeStaffInfo = {
            '_id': ObjectId(staff_id)
        }
        mongoDB.remove(collectionName, removeStaffInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}