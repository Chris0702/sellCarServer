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
        let address = req.body.address;
        let payment_type = req.body.payment_type;
        let car_name = req.body.car_name;
        let car_company = req.body.car_company;
        let car_version = req.body.car_version;
        let car_color = req.body.car_color;
        let hopeTime = req.body.hopeTime;
        let status = req.body.status;
        testDrive.saveTestDriveInfo(test_drive_id, name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime, status, (result, msg) => {
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
        let address = req.body.address;
        let payment_type = req.body.payment_type;
        let car_name = req.body.car_name;
        let car_company = req.body.car_company;
        let car_version = req.body.car_version;
        let car_color = req.body.car_color;
        let hopeTime = req.body.hopeTime;
        let pushMessageObj = {
            'appType': req.body.appType,
            'apnsType': req.body.apnsType,
            'apnsToken': req.body.apnsToken,
            'firebaseToken': req.body.firebaseToken
        }
        testDrive.orderTestDriveInfo(name, company, phone,address,payment_type, car_name,car_company ,car_version,car_color, hopeTime, pushMessageObj, (result, msg) => {
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