var sqlite = require('./driver/sqlite');
var crypto = require('crypto');

function init()
{
    sqlite.init();
}

function addUser(data , callback)
{
    function genRandomString(length){
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,length);   /** return required number of characters */
    }
    
    function hashPassword(password, salt) {
        var hash = crypto.createHash('sha256');
        hash.update(password);
        hash.update(salt);
        return hash.digest('hex');
      }

    var user = sqlite.getModel('users');

    user.user_form_salt = genRandomString();
    user.user_password = hashPassword(data.new_password, user.user_form_salt);
    user.user_email = data.email;
    user.user_email_hash = hashPassword(user.user_email, user.user_form_salt);
   // user.username = data.



}

module.exports.init = init;
module.exports.addUser = addUser;