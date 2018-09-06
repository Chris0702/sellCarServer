var fs = require('fs');
var globule = require('globule');
var path = require('path');
var async = require('async');

function moveFile(orgPath, distPath, callback) {
    fs.readFile(orgPath, function(err, data) {
        if (err) {
            console.error(err.message);
            callback(false)
        } else {
            fs.writeFile(distPath, data, function(err) {
                if (err) {
                    console.error(err.message);
                    callback(false)
                } else {
                    fs.unlink(orgPath, function(err) {
                        if (err) {
                            console.error(err.message);
                            callback(false)
                        } else {
                            // console.log('delete ' + req.file.path + ' successfully!');
                            callback(true)
                        }
                    });
                }
            });
        }
    });
}
function removeFile(filePath, callback) {
    filePath = path.join(__dirname, '..', '..', 'client',filePath);
    fs.unlink(filePath, (err) => {
        if (err) {
            callback(err,false)
        }else{
            callback(err,true)
        }
    });
}
function removeFiles(filePathArray, callback) {
    let cbs = [];
    for(let i =0 ;i<filePathArray.length; i++){
        cbs.push(function(callback) {
          removeFile(filePathArray[i], callback)
        })
    }
    async.parallel(cbs, function(err, results) {
      let result = true;
      for (let i = 0; i < results.length; i++) {
        if(!results[i]){
            result = false;
        }
      }
      callback(err, result);
    });
}

function getFolderPathAll(folderName, isLocal, callback) {
    let searchBase = path.join(__dirname, '..', '..', 'client');
    let searchSource = path.join(folderName, '*')
    let result = globule.find({ src: searchSource, srcBase: searchBase, prefixBase: isLocal })
    callback(result)
}



exports.getFolderPathAll = getFolderPathAll;
exports.removeFile = removeFile;
exports.removeFiles = removeFiles;
exports.moveFile = moveFile;