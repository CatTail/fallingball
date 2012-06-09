//application settings file
var settings =
{	host:"localhost"
,	port:8000
,	appname:"bounceball"
,	TEMPLATE_DIRS:process.cwd()+'/templates/'
,	STATIC_DIRS:process.cwd()+'/templates/'
}
//extend exports object with settings
//so it will be elegent to use in other module
exports.settings = require('catjs').conf.global_settings.extend(settings);
