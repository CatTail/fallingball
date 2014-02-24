//resolve urlpatterns to view functions
var patterns = require('catjs').utils.patterns;
var static_file = require('catjs').utils.static_file;

exports.urlpatterns = patterns(require('./views.js'),
		['^/$','index',[]],
		['^/test/$','test',['test']],
		['^/static/(.+)$',static_file]
);
