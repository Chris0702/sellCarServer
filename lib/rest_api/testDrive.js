exports.on = function(app) {
    let preRestApi = '/testDrive';
    let testDrive = require('../role/testDrive');
    app.post(preRestApi + '/saveTestDriveInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let test_drive_id = req.body.test_drive_id;
        let name = req.body.name;
        let company = req.body.company;
        let phone = req.body.phone;
        let line = req.body.line;
        let wechat = req.body.wechat;
        let mail = req.body.mail;
        let region = req.body.region;
        let cars = req.body.cars;
        let hopeTime = req.body.hopeTime;
        let status = req.body.status;
        testDrive.saveTestDriveInfo(test_drive_id, name, company, phone, line, wechat, mail, region, cars, hopeTime, status, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.delete(preRestApi + '/removeTestDriveInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let test_drive_id = req.headers.test_drive_id;
        testDrive.removeTestDriveInfo(test_drive_id, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.post(preRestApi + '/orderTestDrive', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let name = req.body.name;
        let company = req.body.company;
        let phone = req.body.phone;
        let line = req.body.line;
        let wechat = req.body.wechat;
        let mail = req.body.mail;
        let region = req.body.region;
        let cars = req.body.cars;
        let hopeTime = req.body.hopeTime;
        let pushMessageObj = {
            'appType': req.body.appType,
            'apnsType': req.body.apnsType,
            'apnsToken': req.body.apnsToken,
            'firebaseToken': req.body.firebaseToken
        }
        testDrive.orderTestDriveInfo(name, company, phone, line, wechat, mail, region, cars, hopeTime, pushMessageObj, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.get(preRestApi + '/getTestDriveAll', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        testDrive.getTestDriveAll((result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });
}