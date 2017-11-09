var i18n = require('../helpers/i18n');
var routes = require("../config/core.routes");

function _get (req, res, next)
{
    let actionTab = req.originalUrl.split('/');
	let template = {};
	template.SHOW_INSTALL_START_FORM = true;
/*	template.TITLE = i18n.helper('INSTALL_INTRO');
	template.CONTENT = i18n.helper('INSTALL_INTRO_BODY');
	template.U_ACTION = routes.install.url;
	*/

    template.L_INSTALL = i18n.getLangForACP('INSTALL');
    template.L_INSTALL_PANEL = i18n.getLangForInstall('INSTALL_PANEL');
    template.L_SELECT_LANG = i18n.getLangForInstall('SELECT_LANG');
    template.S_LANG_SELECT = true;
    template.L_CHANGE = i18n.helper('CHANGE'),

    template.language_select_item = [];
    for (let idx in i18n.params.locales)
    {
        let selected = false;
        if (i18n.params.locales[idx] == i18n.params.actualLocale)
            selected = true;

        template.language_select_item.push({
            'VALUE': i18n.params.locales[idx],
            'NAME': i18n.getLocaleName(i18n.params.locales[idx]),
            'SELECTED': selected,
        });
    }

    template.t_block1 = [];
    template.l_block1 = [];
    template.l_block2 = [];

    template.t_block1.push({ L_TITLE: i18n.getLangForInstall('MENU_OVERVIEW'), S_SELECTED: true, U_TITLE: routes.install.url });
    template.t_block1.push({ L_TITLE: i18n.getLangForACP('INSTALL'), S_SELECTED: false, U_TITLE: routes.install_install.url });



    if (actionTab[1] != undefined)
    {
        switch (actionTab[1])
        {
           /* case ('install'):
            {
                template.t_block1.push({ L_TITLE: i18n.getLangForInstall('MENU_OVERVIEW'), S_SELECTED: false, U_TITLE: routes.install.url });
                template.t_block1.push({ L_TITLE: i18n.getLangForACP('INSTALL'), S_SELECTED: true, U_TITLE: routes.install_install.url });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('INTRODUCTION_TITLE'),
                    'S_SELECTED': true,
                    'U_TITLE': routes.install_install.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('STAGE_REQUIREMENTS'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_SUPPORT'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install_support.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_LICENSE'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install_license.url,
                }); 


                break;
            }*/

            case ('license'):
            {
                template.TITLE = i18n.getLangForInstall('LICENSE_TITLE');


                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_INTRO'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_SUPPORT'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install_support.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_LICENSE'),
                    'S_SELECTED': true,
                    'U_TITLE': routes.install_license.url,
                }); 

                break;
            }
            case ('support'):
            {
                template.TITLE = i18n.getLangForInstall('SUPPORT_TITLE');
                template.BODY = i18n.getLangForInstall('SUPPORT_BODY');

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_INTRO'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_SUPPORT'),
                    'S_SELECTED': true,
                    'U_TITLE': routes.install_support.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_LICENSE'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install_license.url,
                }); 
                break;
             }
            default:
            {
                template.TITLE = i18n.getLangForInstall('INTRODUCTION_TITLE');
                template.BODY = i18n.getLangForInstall('INTRODUCTION_BODY');

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_INTRO'),
                    'S_SELECTED' :  true,
                    'U_TITLE': routes.install.url,
                });

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_SUPPORT'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install_support.url,
                });    

                template.l_block1.push({
                    'L_TITLE': i18n.getLangForInstall('MENU_LICENSE'),
                    'S_SELECTED': false,
                    'U_TITLE': routes.install_license.url,
                }); 

                break;
            }
        }
    }


    return template;
}

function _post (req, res, next)
{
  return {};
}

module.exports.post = _post;
module.exports.get = _get;
