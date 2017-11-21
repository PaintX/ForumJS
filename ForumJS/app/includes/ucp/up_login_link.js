var config = require('../../config/config');
var i18n = require('../../helpers/i18n');
var util = require('util');

function run()
{
    let login_link_error = undefined;
    let data = undefined;
    let login_error = undefined;
    let login_username = undefined;

    // Ensure the person was sent here with login_link data
    if (data != undefined)
    {
        login_link_error = i18n.getLangFor('ucp','LOGIN_LINK_NO_DATA_PROVIDED');
    }

    let objRet = {
        // Common template elements
        'LOGIN_LINK_ERROR' : login_link_error,
        'S_HIDDEN_FIELDS'	: undefined , //	=> $this->get_hidden_fields($data),

        // Registration elements
        'REGISTER_ACTION'	: undefined , //=> append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=register'),
        
        // Login elements
        'LOGIN_ERROR'		: login_error,
        'LOGIN_USERNAME'	: login_username,
    };

    return objRet;
}




module.exports.run = run;