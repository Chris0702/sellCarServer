let mongoDB = require('../db/mongoDB');
let config = require('../setting/config').config;
let utilsValue = require('../utils/value');
let collectionName = config.mongoDBCollection.carCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
exports.saveCarInfo = function(car_id, company, name, price, special_price, callback) {
    if (utilsValue.isValid(company) && utilsValue.isValid(name) && utilsValue.isNumber(price) && utilsValue.isNumber(special_price)) {
        let saveCarInfo = {
            'company': company,
            'name': name,
            'price': price,
            'special_price': special_price
        }
        if (utilsValue.isValid(car_id)) {
            saveCarInfo._id = ObjectId(car_id);
        }
        mongoDB.save(collectionName, saveCarInfo, callback);
    } else {
        callback(false, 'input format error')
    }

}

exports.removeCarInfo = function(car_id, callback) {
    if (utilsValue.isValid(car_id)) {
        let removeCarInfo = {
            '_id': ObjectId(car_id)
        }
        mongoDB.remove(collectionName, removeCarInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}

exports.getCarsInfoByCompany = function(company, callback) {
    if (utilsValue.isValid(company)) {
        let searchCarInfo = {
            'company': company
        }
        mongoDB.queryFindAll(collectionName, searchCarInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}