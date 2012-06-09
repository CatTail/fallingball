//resolve urlpatterns to view functions
var patterns = require('catjs').utils.patterns;
var loadStatic = require('catjs').utils.loadStatic;

exports.urlpatterns = patterns(require('./views.js'),
		['^/$','index',[]],
		['^/join$','join'],
		['^/game$','game'],
		['^/test/(.+)$','test',['test']],
		['^/static/(.+)$',loadStatic]
);
