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
    let usernameIsFound = false;
    database.getUsers(function(users){
      users.map(function(user){
        if ( user.username == formulaire.username)
          usernameIsFound = true;
      });

      if ( usernameIsFound )
      {
        objret.ERROR.push("Ce nom d'utilisateur est deja utilisé ");
        return render(objret);
      }
      else
      {
        database.addUser(formulaire,function()
        {
          render(objret);
          //-- redirection vers ?
        });
      }
    });

    return undefined; 
  }
  else
    return objret;
}

module.exports.post = _post;
module.exports.get = _get;