var up_login_link = require('../includes/ucp/up_login_link');
var database = require('../includes/db');
var password = require('../includes/driver/password');

function _get (req, res, next , render)
{
  return up_login_link.run();
}

function _post (req, res, next , render)
{
  let userSession = req.session;
  let objret = up_login_link.run();
  let formulaire = req.body;

  objret.ERROR = [];
  if ( formulaire.login_username.length == 0)
  {
    objret.ERROR.push("Login non renseigné");
  }

  if ( objret.ERROR.length == 0)
  {
    database.getUserByName(formulaire.login_username, function(user)
    {
      if ( user != undefined )
      {
        if ( password.hashPassword(formulaire.login_password , user.user_form_salt) != user.user_password )
        {
          objret.ERROR.push("Login ou mot de passe érronné");
          render( objret );
        }
        else
        {
          userSession.user = {};
          userSession.user = Object.assign({} , user);
        }
      }
      else
      {
        objret.ERROR.push("Login ou mot de passe érronné");
        render( objret );
      }
    });   
  }
  else
    return objret;
}

module.exports.post = _post;
module.exports.get = _get;