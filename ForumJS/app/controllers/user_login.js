var ucp_register = require('../includes/ucp/ucp_register');
var database = require('../includes/db');

function _get (req, res, next , render)
{
  return ucp_register.run();
}

function _post (req, res, next , render)
{
  let objret = ucp_register.run();
  let formulaire = req.body;

  return objret;
}

module.exports.post = _post;
module.exports.get = _get;