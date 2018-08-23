let httpRequest = require('../utils/httpRequest');
let config = require('../setting/config').config;
exports.sendLineMessage = function(lineToken, message ,callback) {
  let url = 'https://notify-api.line.me/api/notify';
  let method = 'POST';
  let headers = {
    'Authorization': lineToken,
    'Content-Type': 'application/json'
  };
  let json = {
    'message': message
  }
  httpRequest.sendFormRequest(url, headers, json, method, (error, body) => {
    if (error) {
      callback(false,error);
    } else {
      callback(true,error);
    }
  });
}
