//read file from file system
var loadTemplate = require('catjs').template.loadTemplate;
var simpleRender = require('catjs').template.simpleRender;


var connections = [];
function register(username,connection){
	connections.push({username:username,connection:connection});
}

// WebSocket server
require('catjs').global.wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);

	// This is the most important callback for us, we'll handle
	// all messages from users here.
	connection.on('message', function(message) {
		if( message.type === 'utf8' ){
			var command = message.utf8Data.split(':')[0];
			var arg = message.utf8Data.split(':')[1];
			switch( command ){
				case 'register':
					register(arg,connection);
					if( connections.length === 2 ){
						connections.forEach(function(c){
							c.connection.send('find:')
						});
					}
					break;
				case 'match':
					var username = arg;
					connections.forEach(function(c){
						if( c.username === username ){
							c.connection = connection;
							connection.send("test:"+username);
						}
					});
					break;
			}
		}
	});

	connection.on('close', function(connection) {
		// close user connection
	});
});



/*
//玩家
var Player = (function(){
	
	var init = function(name,request,response){
		this.name = name;
		this.request = request;
		this.response = response;
	};
	init.prototype = {
	};
	return init;
})();

//小组
var Pair = (function(){

	var init = function(){
	};
	init.prototype = {
	};
	return init;
})();

//所有小组
var PairSet = (function(){

	var init = function(){
	};
	init.prototype = {
	};
	return init;
})();
*/
