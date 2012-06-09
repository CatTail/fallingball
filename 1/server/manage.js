#! /usr/local/bin/node
var util = require('util');
var http = require('http');
//settings
var settings = require('./settings.js').settings;
var urlpatterns = require('./urls.js').urlpatterns;
//websocket
var WebSocketServer = require('websocket').server;

switch(process.argv[2]){
	case 'runserver':
		runserver();
		break;
	default:
		console.log('argument not support');
		break;
};

//run server
function runserver(){
	//save as global object
	var global = require('catjs').global;

	var server = http.createServer(function(req,res){
		//save request and response
		global.request = require('catjs').http.wrapRequest(req);
		global.response = res;

		//route request depend on the url
		var view = urlpatterns.find(req.url.path);
		view.args.unshift(res);
		view.args.unshift(req);
		view.func.apply(null,view.args);
	});
	server.listen(settings.port,settings.host,function(){
		console.log('catjs server starting!');
		console.log('Listening at '+settings.host+":"+settings.port);
	});
	var wsServer = new  WebSocketServer({httpServer:server});

	global.httpServer = server;
	global.wsServer = wsServer;

	require('./websocket.js');
}
