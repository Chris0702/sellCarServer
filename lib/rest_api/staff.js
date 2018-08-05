exports.on = function(app) {
    let preRestApi = '/staff';
    let staff = require('../role/staff');
    app.post(preRestApi + '/saveStaffInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let staff_id = req.body.staff_id;
        let name = req.body.name;
        let phone = req.body.phone;
        let line = req.body.line;
        let wechat = req.body.wechat;
        let mail = req.body.mail;
        let region = req.body.region;
        staff.saveStaffInfo(staff_id, name, phone, line, wechat, mail, region, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.delete(preRestApi + '/removeStaffInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let staff_id = req.headers.staff_id;
        staff.removeStaffInfo(staff_id, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.get(preRestApi + '/getStaffInfoAll', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        staff.getStaffInfoAll((result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });
}