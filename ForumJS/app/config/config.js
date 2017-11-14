var constants = require('../includes/constants');

var config = {
    sitename : 'hello_world',
    site_desc : '',

    load_online : false,
    load_online_time : false,

    require_activation : constants.USER_ACTIVATION_NONE,

    allow_name_chars : 'USERNAME_CHARS_ANY',
    min_name_chars : 5,
    max_name_chars : 25,
}

function load()
{

}

function save()
{

}

module.exports = config;
module.exports.load = load;
module.exports.save = save;