exports.on = function(app) {
    let preRestApi = '/car';
    let config = require('../config').config;
    let car = require('../role/car');

    app.post(preRestApi + '/saveCarInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let company = req.body.company;
        let name = req.body.name;
        let price = req.body.price;
        let special_price = req.body.special_price;
        car.saveCarInfo(company, name, price, special_price, (result,msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.delete(preRestApi + '/deleteCarInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let company = req.headers.company;
        let name = req.headers.name;
        car.removeCarInfo(company, name, (result,msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });
}
