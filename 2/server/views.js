//read file from file system
var loadTemplate = require('catjs').template.loadTemplate;

exports.index = function(){
	return loadTemplate('index');
}

exports.test = function(){
	Array.prototype.forEach.call(arguments,function(arg){
//		console.log(arg);
	});
	return 'testing';
}
