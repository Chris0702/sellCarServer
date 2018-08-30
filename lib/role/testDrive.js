let mongoDB = require('../db/mongoDB');
let config = require('../setting/config').config;
let utilsValue = require('../utils/value');
let notification = require('../tool/notification/notification');
let lineTool = require('../tool/line');
let collectionName = config.mongoDBCollection.testDriveCollection;
let orderReceive = 'receive';
let orderPending = 'pending';
let orderFailure = 'failure';
let orderSuccess = 'success';
const { ObjectId } = require('mongodb'); // or ObjectID 

function saveTestDriveInfo(test_drive_id, name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime, status, callback) {
    if (utilsValue.isValid(name) && utilsValue.isNumber(phone)) {
        let saveTestDriveInfo = {
            'name': name,
            'company': company,
            'phone': phone,
            'address': address,
            'payment_type': payment_type,
            'car_name': car_name,
            'car_company': car_company,
            'car_version': car_version,
            'car_color': car_color,
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

function orderTestDriveInfo(name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime, pushMessageObj, callback) {
    let orderTestDriveNotiyTitle = "TestDrive title";
    saveTestDriveInfo(null, name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime, null, (saveResult, msg) => {
        if (saveResult == false) {
            callback(saveResult, msg)
        } else {
            let orderTestDriveNotiyMessage = "您的試乘訂單已成功，會有專人為您服務，謝謝。";
            notification.notify(pushMessageObj, orderTestDriveNotiyTitle, orderTestDriveNotiyMessage, () => {});
            if(saveResult){
                lineMessage = getTestDriveLineMessage(name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime);
                lineTool.sendLineMessage(config.line.salesNotifyToken,lineMessage ,callback);
            }else{
                callback(saveResult, msg);
            }
        }
    })
}

function getTestDriveAll(callback) {
    let searchTestDrive = {};
    mongoDB.queryFindAll(collectionName, searchTestDrive, callback);
}

function getTestDriveLineMessage(name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime){
    return '試乘訂單\n姓名:'+name+'\n公司:'+company+'\n聯絡電話:'+phone+'\n地址:'+address+'\n付款方式:'+payment_type+'\n車廠:'+car_company+'\n車名:'+car_name+'\n顏色:'+car_color+'\n希望時間:'+hopeTime;    
}

exports.saveTestDriveInfo = saveTestDriveInfo;
exports.removeTestDriveInfo = removeTestDriveInfo;
exports.orderTestDriveInfo = orderTestDriveInfo;
exports.getTestDriveAll = getTestDriveAll;