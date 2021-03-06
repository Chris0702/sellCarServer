let mongoDB = require('../db/mongoDB');
let config = require('../setting/config').config;
let utilsValue = require('../utils/value');
let utilsFile = require('../utils/file');
let path = require('path');
let collectionName = config.mongoDBCollection.carCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
exports.saveCarInfo = function(car_id, company, name,color, price, special_price,description, callback) {
    if (utilsValue.isValid(company) && utilsValue.isValid(name) && utilsValue.isNumber(price) && utilsValue.isNumber(special_price)) {
        let saveCarInfo = {
            'company': company,
            'name': name,
            'color':color,
            'price': price,
            'special_price': special_price,
            'description':description
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
        mongoDB.queryFindOne(collectionName, removeCarInfo, (result,searchCarInfo)=>{
            if(result&&searchCarInfo!=null){
                mongoDB.remove(collectionName, removeCarInfo, (removeResult,msg)=>{
                    if(removeResult){
                        imgPath = path.join('resource','company',searchCarInfo.company,'image','car',searchCarInfo.name+'.png')
                        utilsFile.removeFile(imgPath, ()=>{});
                        callback(removeResult, msg)
                    }else{
                        callback(removeResult, msg)
                    }
                })
            }else{
                 callback(false, 'mongoDB search error')
            }
        })
    } else {
        callback(false, 'input format error')
    }
}

exports.getCarsInfoByCompany = function(company, callback) {
    if (utilsValue.isValid(company)) {
        let searchCarInfo = {
            'company': company
        }
        mongoDB.queryFindAll(collectionName, searchCarInfo,(result, msg) => {
            if (!result) {
                callback(result, msg);
            }else{
                let imgFolder = 'resource/company/'+company+'/image/car';
                utilsFile.getFolderPathAll(imgFolder, false, (imgPathAll) => {
                    for(let i=0;i<msg.length;i++){
                        for(let j=0;j<imgPathAll.length;j++){
                            if(msg[i].name==path.basename(imgPathAll[j],path.extname(imgPathAll[j]))){
                                msg[i].imgPath = imgPathAll[j]
                            }
                        }
                    }
                    callback(result, msg);
                })
            }
        })
    } else {
        callback(false, 'input format error')
    }
}

exports.getCarsInfoById = function(id, callback) {
    if (utilsValue.isValid(id)) {
        let searchCarInfo = {
            '_id': ObjectId(id)
        }
        mongoDB.queryFindAll(collectionName, searchCarInfo,(result, msg) => {
            if (!result) {
                callback(result, msg);
            }else{
                if(msg.length>0){
                    let imgFolder = 'resource/company/'+msg[0].company+'/image/car';
                    utilsFile.getFolderPathAll(imgFolder, false, (imgPathAll) => {
                        for(let i=0;i<msg.length;i++){
                            for(let j=0;j<imgPathAll.length;j++){
                                if(msg[i].name==path.basename(imgPathAll[j],path.extname(imgPathAll[j]))){
                                    msg[i].imgPath = imgPathAll[j]
                                }
                            }
                        }
                        callback(result, msg);
                    })
                }else{
                    callback(result, msg);
                }
            }
        })
    } else {
        callback(false, 'input format error')
    }
}

exports.getCarsInfoAll = function(callback) {
    let searchCarInfo = {};
    mongoDB.queryFindAll(collectionName, searchCarInfo, callback);
}