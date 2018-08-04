let request = require('request');
exports.sendJsonRequest = function sendJsonRequest(url, headers, json, method, callback) {
  let options = {
    'url': url,
    'headers': headers,
    'json': json,
    // 'form': json,
    'method': method
  };
  request(options,(error, response, body)=>
  {
  	callback(error,body);
  });
}
