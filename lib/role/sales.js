let mongoDB = require('../db/mongoDB');
let config = require('../config').config;
let utilsValue = require('../utils/value');
let collectionName = config.mongoDBCollection.salesCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
exports.saveSalesInfo = function(sales_id, name, company, phone, line, wechat, mail, region, callback) {
    if (utilsValue.isValid(name) && utilsValue.isValid(company) && utilsValue.isNumber(phone)) {
        let saveSalesInfo = {
            'name': name,
            'company': company,
            'phone': phone,
            'line': line,
            'wechat': wechat,
            'mail': mail,
            'region': region
        }
        if (utilsValue.isValid(sales_id)) {
            saveSalesInfo._id = ObjectId(sales_id);
        }
        mongoDB.save(collectionName, saveSalesInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}

exports.removeSalesInfo = function(sales_id, callback) {
    if (utilsValue.isValid(sales_id)) {
        let removeSalesInfo = {
            '_id': ObjectId(sales_id)
        }
        mongoDB.remove(collectionName, removeSalesInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}