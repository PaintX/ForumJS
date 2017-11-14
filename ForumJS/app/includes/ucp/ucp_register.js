var config = require('../../config/config');
var i18n = require('../../helpers/i18n');
var util = require('util');

function run()
{

    let text = i18n.getLangFor('ucp',config['allow_name_chars'] + '_EXPLAIN');
    let minText = i18n.getLangFor('ucp','CHARACTERS');
    if ( config['min_name_chars'] > 1)
        minText = minText[1];
    else
        minText = minText[0];
    minText = util.format(minText,config['min_name_chars']);

    let maxText = i18n.getLangFor('ucp','CHARACTERS');
    if ( config['max_name_chars'] > 1)
        maxText = maxText[1];
    else
        maxText = maxText[0];
    maxText = util.format(maxText,config['max_name_chars']);

    let objRet = {
        'L_USERNAME_EXPLAIN': util.format(text,minText,maxText),
        'L_EMAIL_ADDRESS' : i18n.getLangFor('common','EMAIL_ADDRESS'),
        'L_CONFIRM_EMAIL' : i18n.getLangFor('common','CONFIRM_EMAIL_ADDRESS'),

        'L_PASSWORD_EXPLAIN' : 'mot de passe compris entre 1 et 15 caractéres',
        
        'L_CONFIRM_PASSWORD' : i18n.getLangFor('common','CONFIRM_PASSWORD'),

        'L_TIMEZONE' : i18n.getLangFor('ucp','TIMEZONE'),
        'L_RESET' : i18n.getLangFor('common','RESET'),

        'L_LANGUAGE' : 'Langue',
        'L_SUBMIT' : i18n.getLangFor('common','SUBMIT'),
    };


    
    return objRet;
}

module.exports.run = run;