let config = require('../setting/config').config;
let utilsValue = require('../utils/value');
let globule = require('globule');
let path = require('path')
exports.getCompanyList = function(callback) {
    let searchDir = path.join(__dirname,'..','..','client','resource','company');
    let searchSrc = '*';
    let result = globule.find({src: "*", srcBase: searchDir, prefixBase: false});
    callback(result)
}