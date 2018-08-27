exports.on = function(app) {
    let preRestApi = '/file';
    let multer = require('multer');
    let path = require('path');
    let fs = require('fs')
    let utilsFile = require('../utils/file');
    let utilsValue = require('../utils/value');

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
}