exports.on = function(app) {
    let preRestApi = '/file';
    let multer = require('multer');
    let path = require('path');
    let fs = require('fs')
    let utilsFile = require('../utils/file');
    let utilsValue = require('../utils/value');

    app.post(preRestApi + '/uploadImage', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let newPath = decodeURIComponent(req.headers.new_path);
        let uploadDir = path.join(__dirname, '..', '..', 'client', 'uploadTmp');
        let upload = multer({ dest: uploadDir }).single('uploadImage');
        upload(req, res, function(err) {
            if (err) {
                console.error('[System] ' + err.message);
                response.resStatus = 1;
                res.send(JSON.stringify(response));

            } else {
                if (utilsValue.isValid(req.file)) {
                    if(!utilsValue.isValid(newPath)){
                        newPath = req.file.filename;
                    }
                    let des_file = path.join(path.dirname(uploadDir), 'resource', newPath);
                    utilsFile.moveFile(req.file.path, des_file, (result) => {
                        if (!result) {
                            response.resStatus = 1;
                        }
                        res.send(JSON.stringify(response));
                    })
                } else {
                    response.resStatus = 1;
                    res.send(JSON.stringify(response));
                }
            }
        });
    });

    app.get(preRestApi + '/getLocalPathAll', function(req, res) {
        let folderName = req.query.foldername;
        if (utilsValue.isValid(folderName)) {
            utilsFile.getFolderPathAll(folderName, false, (result) => {
                res.send(result)
            })
        } else {
            res.send([])
        }
    });

    app.delete(preRestApi + '/removeFiles', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let filesPath = req.body['filesPath[]'];
        if(utilsValue.isValid(filesPath))
        {
            if(!Array.isArray(filesPath)){
                filesPath = [filesPath]
            }
            if(filesPath.length>0){
                utilsFile.removeFiles(filesPath, (err,result)=>{
                    if(!result){
                        response.resStatus = 1;
                    }
                    res.send(JSON.stringify(response));
                })
            }else{
                 res.send(JSON.stringify(response));
            }
        }else{
            response.resStatus = 1;
            response.resString = 'filesPath param error'
            res.send(JSON.stringify(response));
        }
    });
}