exports.on = function(app) {
    let preRestApi = '/car';
    let car = require('../role/car');
    app.post(preRestApi + '/saveCarInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let car_id = req.body.car_id;
        let company = req.body.company;
        let name = req.body.name;
        let price = req.body.price;
        let special_price = req.body.special_price;
        let description = req.body.description;
        car.saveCarInfo(car_id, company, name, price, special_price,description, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.delete(preRestApi + '/removeCarInfo', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let car_id = req.headers.car_id;
        car.removeCarInfo(car_id, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.get(preRestApi + '/getCarsInfoByCompany', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        let company = req.query.company;
        car.getCarsInfoByCompany(company, (result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });

    app.get(preRestApi + '/getCarsInfoAll', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        car.getCarsInfoAll((result, msg) => {
            if (!result) {
                response.resStatus = 1;
            }
            response.resString = msg
            res.send(JSON.stringify(response));
        });
    });
}