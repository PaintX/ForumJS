var sqlite = require('./driver/sqlite');
var password = require('./driver/password');


function init()
{
    sqlite.init();
}

function getUserByName ( name , fn )
{
    let retUser = undefined;

    sqlite.get('users' , function(rows)
    {
        rows.map(function(user)
        {
            if ( user.username == name)
            {
                retUser = user;
            }
        });

        if ( fn != undefined)
            fn(retUser);
    });
}

function getUsers(fn)
{
    sqlite.get('users' , function(rows)
    {
        if ( fn != undefined)
            fn(rows);
    });
}

function addUser(data , fn)
{

    var user = sqlite.getModel('users');

    user.user_form_salt = password.generateSalt();
    user.user_password = password.hashPassword(data.new_password, user.user_form_salt);
    user.user_email = data.email;
    user.user_email_hash = password.hashPassword(user.user_email, user.user_form_salt);
    user.username = data.username;


    sqlite.set('users' , user , function()
    {
        if ( fn != undefined)
            fn();
    });

}

module.exports.init = init;
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUserByName = getUserByName;