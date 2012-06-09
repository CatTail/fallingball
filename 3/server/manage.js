#! /usr/local/bin/node
var util = require('util');
var http = require('http');
var url = require('url');
//settings
var settings = require('./settings.js').settings;
var urlpatterns = require('./urls.js').urlpatterns;

switch(process.argv[2]){
	case 'runserver':
		runserver();
		break;
	default:
		console.log('argument not support');
		break;
}

//run server
function runserver(){
	var server = http.createServer(function(req,res){
		//save as global object
		var global = require('catjs').global;
		global.request = req;
		global.response = res;
		//route request depend on the url
		var urlObj = url.parse(req.url);
		var view = urlpatterns.find(urlObj.path);
		view.args.unshift(req);
		var html = view.func.apply(null,view.args);
		res.end(html);
	});
	server.listen(settings.port,settings.host,function(){
		console.log('catjs server starting!');
		console.log('Listening at '+settings.host+":"+settings.port);
	});
}
