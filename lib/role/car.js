let mongoDB = require('../db/mongoDB');
let config = require('../config').config;
let utilsValue = require('../utils/value');
let collectionName = config.mongoDBCollection.carCollection;
exports.saveCarInfo = function(company, name, price, special_price, callback) {
    if(utilsValue.isValid(company)&&utilsValue.isValid(name)&&utilsValue.isNumber(price)&&utilsValue.isNumber(special_price)){
        let saveCarInfo = {
        '_id': {
            'company': company,
            'name': name
        },
        'price': price,
        'special_price': special_price
        }
        mongoDB.save(collectionName, saveCarInfo, callback);
    }else{
        callback(false,'input error')
    }
    
}

exports.removeCarInfo = function(company, name, callback) {
    if(utilsValue.isValid(company)&&utilsValue.isValid(name)){
        console.log('$$$$$$company$$$$$$$')
        console.log(company)
        console.log('$$$$$$name$$$$$$$')
        console.log(name)
        let removeCarInfo = {
        '_id': {
            'company': company,
            'name': name
            }
        }
        mongoDB.remove(collectionName, removeCarInfo, callback);
    }else{
        callback(false,'input error')
    } 
}