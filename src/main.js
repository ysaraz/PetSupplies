var express = require('express');
var app = express();
var enrollRoute = require('./core/route');

enrollRoute(app);

var server = app.listen(8080, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});