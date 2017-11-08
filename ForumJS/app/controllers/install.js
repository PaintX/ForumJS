var i18n = require('../helpers/i18n');
var routes = require("../config/core.routes");

function _get (req, res, next)
{
	let template = {};
	
	template.SHOW_INSTALL_START_FORM = true;
	template.TITLE = i18n.helper('INSTALL_INTRO');
	template.CONTENT = i18n.helper('INSTALL_INTRO_BODY');
	template.U_ACTION = routes.install.url;
	
    return template;
}

function _post (req, res, next)
{
  return {};
}

module.exports.post = _post;
module.exports.get = _get;
