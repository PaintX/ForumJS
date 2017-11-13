var config = require('../../config/config');
var i18n = require('../../helpers/i18n');
var util = require('util');

function run()
{

    let text = i18n.getLangFor('ucp',config['allow_name_chars'] + '_EXPLAIN');

    let objRet = {
        'L_USERNAME_EXPLAIN': util.format(text,5,8), //$user->lang(config['allow_name_chars'] + '_EXPLAIN', $user->lang('CHARACTERS', (int) $config['min_name_chars']), $user->lang('CHARACTERS', (int) $config['max_name_chars'])),
    };


    
    return objRet;
}

module.exports.run = run;