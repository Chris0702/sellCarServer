exports.on = function(app) {
    let preRestApi = '/sales';
    let config = require('../config').config;
    let sales = require('../role/sales');
    app.post(preRestApi + '/saveSalesInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let sales_id = req.body.sales_id;
        let company = req.body.company;
        let name = req.body.name;
        let phone = req.body.phone;
        let line = req.body.line;
        let wechat = req.body.wechat;
        let mail = req.body.mail;
        let region = req.body.region;
        sales.saveSalesInfo(sales_id, name, company, phone, line, wechat, mail, region, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.delete(preRestApi + '/removeSalesInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let sales_id = req.headers.sales_id;
        sales.removeSalesInfo(sales_id, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });
}