var express = require('express');
var path = require('path');

module.exports = function(app){

	app.use(express.static('public'));

	app.get('/', function (req, res) {
		// res.sendFile( __dirname + "/../html/" + "list.html" );
		var file = path.resolve(__dirname + "/../html/" + "list.html")
		res.sendFile(file);
	});

	app.get('/Test/*', function (req, res) {
		var controller = require('../controller/test');
		controller.run(res,req.params);
	});

	app.get('/O/*', function (req, res) {
		var controller = require('../controller/original');
		controller.run(res,req.params);
	});

	app.get('/DB/*', function (req, res) {
		var controller = require('../controller/db');
		controller.run(res,req.params);
	});

	app.get('/Test1',function(req,res){
		var log = JSON.stringify(req.path);
		res.send(log);
	});

	app.get('/Test2',function(req,res){
		res.json({ user: 'tobi' });
	});

	app.get('/Test3/*',function(req,res){
		var path = req.path;
		var baseUrl = req.baseUrl;
		var originalUrl = req.originalUrl;
		var params = req.params;
		res.json({ user: 'tobi',path:path,baseUrl:baseUrl,originalUrl:originalUrl,params:params });
	});

};