var ucp_register = require('../includes/ucp/ucp_register');

function _get (req, res, next)
{
  return ucp_register.run();
}

function _post (req, res, next)
{
  let objret = ucp_register.run();
  let formulaire = req.body;

  objret.USERNAME = req.body.username;
  objret.EMAIL = req.body.email;
  objret.EMAIL_CONFIRM = req.body.email_confirm;
  objret.PASSWORD = req.body.new_password;
  objret.PASSWORD_CONFIRM = req.body.password_confirm;

  objret.ERROR = [];
  if ( formulaire.email != formulaire.email_confirm)
  {
    objret.ERROR.push("Les adresses E-mail ne sont pas identique");
  }

  if ( formulaire.new_password != formulaire.password_confirm)
  {
    objret.ERROR.push("Les mots de passe ne sont pas identique");
  }

  if (objret.ERROR.length < 1 )
  {
    //-- redirection vers ?
  }
  return objret;
}

module.exports.post = _post;
module.exports.get = _get;