var i18n = require('../helpers/i18n');
var routes = require("../config/core.routes");
var check_filesystem = require("./module/check_filesystem");

function _get(req, res, next) {
    let template = {};
    template.SHOW_INSTALL_START_FORM = true;
    template.L_INSTALL = i18n.getLangForACP('INSTALL');
    template.L_INSTALL_PANEL = i18n.getLangForInstall('INSTALL_PANEL');
    template.L_SELECT_LANG = i18n.getLangForInstall('SELECT_LANG');
    template.S_LANG_SELECT = true;
    template.L_CHANGE = i18n.helper('CHANGE'),

    template.language_select_item = [];
    for (let idx in i18n.params.locales) {
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

    template.t_block1.push({ L_TITLE: i18n.getLangForInstall('MENU_OVERVIEW'), S_SELECTED: false, U_TITLE: routes.install.url });
    template.t_block1.push({ L_TITLE: i18n.getLangForACP('INSTALL'), S_SELECTED: true, U_TITLE: routes.install_install.url });


    template.U_ACTION = routes.install_install.url;
    template.TITLE = i18n.getLangForInstall('INSTALL_INTRO');
    template.CONTENT = i18n.getLangForInstall('INSTALL_INTRO_BODY');


    template.l_block2.push({
        'L_TITLE': i18n.getLangForInstall('INTRODUCTION_TITLE'),
        'S_SELECTED': true,
		'step' : 0,
    });

    template.l_block2.push({
        'L_TITLE': i18n.getLangForInstall('STAGE_REQUIREMENTS'),
        'S_SELECTED': false,
		'step' : 1,
    });

    template.l_block2.push({
        'L_TITLE': i18n.getLangForInstall('STAGE_OBTAIN_DATA'),
        'S_SELECTED': false,
		'step' : 2,
    }); 

    template.l_block2.push({
        'L_TITLE': i18n.getLangForInstall('STAGE_INSTALL'),
        'S_SELECTED': false,
		'step' : 3,
    });

    return template;
}
function _post(req, res, next) {
	let template = _get(req, res, next);
	template.SHOW_INSTALL_START_FORM = false;
	template.l_block2.map((val) =>
	{
		val.S_SELECTED = false;
		if ( val.step == req.body.step )
		{
			val.S_SELECTED = true;
		}
	});
	
	switch ( parseInt(req.body.step) )
	{
		case (1):
		{
			template.TITLE = 'test';
			template.CONTENT = 'cvbcvb';
			
			check_filesystem.run();
			
			
			break;
		}
	}
	console.log(req.body.step);
    return template;
}

module.exports.post = _post;
module.exports.get = _get;