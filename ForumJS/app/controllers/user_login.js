var up_login_link = require('../includes/ucp/up_login_link');
var database = require('../includes/db');

function _get (req, res, next , render)
{
  return up_login_link.run();
}

function _post (req, res, next , render)
{
  let objret = up_login_link.run();
  let formulaire = req.body;

  objret.ERROR = [];
  if ( formulaire.username.length == 0)
  {
    objret.ERROR.push("Login non renseigné");
  }

  if ( objret.ERROR.length == 0)
  {
    database.getUserByName(formulaire.username, function(users)
    {

    });   
  }

  return objret;
}

module.exports.post = _post;
module.exports.get = _get;