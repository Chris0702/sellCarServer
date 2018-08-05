let mongoDB = require('../db/mongoDB');
let config = require('../setting/config').config;
let utilsValue = require('../utils/value');
let notification = require('../tool/notification/notification');
let collectionName = config.mongoDBCollection.testDriveCollection;
let orderReceive = 'receive';
let orderPending = 'pending';
let orderFailure = 'failure';
let orderSuccess = 'success';
const { ObjectId } = require('mongodb'); // or ObjectID 

function saveTestDriveInfo(test_drive_id, name, company, phone, line, wechat, mail, region, cars, hopeTime, status, callback) {
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
        if (utilsValue.isValid(status)) {
            saveTestDriveInfo.status = status;
        } else {
            saveTestDriveInfo.status = orderReceive;
        }
        mongoDB.save(collectionName, saveTestDriveInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}

function removeTestDriveInfo(test_drive_id, callback) {
    if (utilsValue.isValid(test_drive_id)) {
        let removeTestDriveInfo = {
            '_id': ObjectId(test_drive_id)
        }
        mongoDB.remove(collectionName, removeTestDriveInfo, callback);
    } else {
        callback(false, 'input format error')
    }
}

function orderTestDriveInfo(name, company, phone, line, wechat, mail, region, cars, hopeTime, pushMessageObj, callback) {
    let orderTestDriveNotiyTitle = "TestDrive title";
    saveTestDriveInfo(null, name, company, phone, line, wechat, mail, region, cars, hopeTime, null, (saveResult, msg) => {
        if (saveResult == false) {
            callback(saveResult, msg)
        } else {
            let orderTestDriveNotiyMessage = "TestDrive message";
            notify(pushMessageTypeObj, orderTestDriveNotiyTitle, orderTestDriveNotiyMessage, () => {});
            callback(saveResult, msg);
        }
    })
}

function getTestDriveAll(callback) {
    let searchTestDrive = {};
    mongoDB.queryFindAll(collectionName, searchTestDrive, callback);
}

exports.saveTestDriveInfo = saveTestDriveInfo;
exports.removeTestDriveInfo = removeTestDriveInfo;
exports.orderTestDriveInfo = orderTestDriveInfo;
exports.getTestDriveAll = getTestDriveAll;