var ucp_register = require('../includes/ucp/ucp_register');

function _get (req, res, next)
{
  let objRet = {};
  objRet = ucp_register.run();
  return objRet;
}

function _post (req, res, next)
{
  return {};
}

module.exports.post = _post;
module.exports.get = _get;