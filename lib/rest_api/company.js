exports.on = function(app) {
    let preRestApi = '/company';
    let company = require('../role/company');
    app.get(preRestApi + '/getCompanyList', function(req, res) {
        company.getCompanyList((list)=>{
             res.send(list);
        })
    });
}
