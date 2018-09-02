exports.on = function(app) {

    let path = require('path');
    let preWebPath = path.join(__dirname, '../client','views');

    app.get('/management', function(req, res) {
        res.sendfile(path.join(preWebPath, 'management.html'));
    });

    app.get('/car', function(req, res) {
        res.sendfile(path.join(preWebPath, 'car.html'));
    });

    app.get('/testDrive', function(req, res) {
        res.sendfile(path.join(preWebPath, 'testDrive.html'));
    });

    app.get('/index', function(req, res) {
        res.sendfile(path.join(preWebPath, 'index.html'));
    });

}
