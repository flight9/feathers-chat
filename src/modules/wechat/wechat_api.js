var fs = require('fs');
var c = require('./config');

var WechatAPI = require('wechat-api')
var wechatApi = new WechatAPI(c.appId, c.appSecret, function (callback) {
  // 传入一个获取全局 token 的方法
  fs.readFile('access_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(null, null);} // 这里不能用 return callback(err) 会造成后面 function (token, callback) 不调用
    callback(null, JSON.parse(txt));
  });
}, function (token, callback) {
  // 请将 token 存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis 等
  // console.log('Save token:', token);
  fs.writeFile('access_token.txt', JSON.stringify(token), callback);
})

wechatApi.registerTicketHandle(getTicketToken, saveTicketToken);
function getTicketToken(type, callback) {
  // console.log('getTicketToken type:', type)
  fs.readFile('jsapi_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(null, null);} // 这里不能用 return callback(err) 会造成后面 function (token, callback) 不调用
    callback(null, JSON.parse(txt));
  });
}
function saveTicketToken(type, ticketToken, callback) {
  // console.log('Save type+js_token:', type, ticketToken)
  fs.writeFile('jsapi_token.txt', JSON.stringify(ticketToken), callback);
}

module.exports = wechatApi;
