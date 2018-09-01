exports.on = function(app) {
    let preRestApi = '/server';
    app.get(preRestApi + '/isExist', function(req, res) {
        let response = {
            'resStatus': 0,
            'resString': ''
        }
        res.send(JSON.stringify(response));
    });
}
