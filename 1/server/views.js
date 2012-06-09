//read file from file system
var loadTemplate = require('catjs').template.loadTemplate;
var simpleRender = require('catjs').template.simpleRender;



var total_num = 0;

exports.index = function(req,res){
	total_num++;
	res.end(simpleRender(loadTemplate('index'),{num:total_num}));
}

/*
exports.join = function(req,res){
	req.on('data',function(){
	});
}
*/

exports.game = function(req,res){
	res.end(loadTemplate('bounceball'));
}

exports.test = function(req){
	return simpleRender(loadTemplate('test'),{variable:'this is a variable'});
}
