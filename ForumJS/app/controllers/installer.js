var i18n = require('../helpers/i18n');
var debug = require('debug')('install:installer');
var routes = require("../config/core.routes");
var check_filesystem = require("./module/check_filesystem");
var check_server_environment = require("./module/check_server_environment");
var messages = require("./module/messages");

function _get(req, res, next) {
	if ( req.session.install == undefined )
	{
		req.session.install = { stage : 0 };
	}
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
		'STAGE_NAME' : 0,
    });

    template.l_block2.push({
        'L_TITLE': i18n.getLangForInstall('STAGE_REQUIREMENTS'),
        'S_SELECTED': false,
		'STAGE_NAME' : 1,
    });

    template.l_block2.push({
        'L_TITLE': i18n.getLangForInstall('STAGE_OBTAIN_DATA'),
        'S_SELECTED': false,
		'STAGE_NAME' : 2,
    }); 

    template.l_block2.push({
        'L_TITLE': i18n.getLangForInstall('STAGE_INSTALL'),
        'S_SELECTED': false,
		'STAGE_NAME' : 3,
	});

	let stage = 0;
	let obj = {};
	if ( req.session.install  != undefined)
	{
		stage = parseInt(req.session.install.stage );
		messages.clear_error_messages();
		messages.clear_warning_messages();
		switch ( stage )
		{
			case ( 1 ):
			{
				check_filesystem.run();
				check_server_environment.run();

				obj.form =  	'<form id="install_install" method="post" action="'+routes.install_install.url+'.html">' +
				'<fieldset class="submit-buttons">'+
					'<legend>{{L_SUBMIT}}</legend>'+
					'<input type="hidden" name="step" value="2" />'+
					'<input class="button1" name="install" type="submit" value="{{L_INSTALL}}" />'+
				'</fieldset>'+
			'</form>';
				break;
			}
			case ( 2 ):
			{
				obj.form =  	'<form id="install_install" method="post" action="'+routes.install_install.url+'.html">' +
				'<fieldset class="submit-buttons">'+
					'<legend>{{L_SUBMIT}}</legend>'+
					'<input type="hidden" name="step" value="2" />'+
					'<input class="button1" name="install" type="submit" value="{{L_INSTALL}}" />'+
				'</fieldset>'+
			'</form>';
				break;
			}
		}
	}

	if ( req.query.action != undefined)
	{
		switch ( req.query.action )
		{
			case ( 'status' ):
			{
				
				obj.nav =  {active : stage};
				obj.errors = messages.get_error_messages();
				obj.warnings = messages.get_warning_messages();
				
				if (stage>3 || obj.errors.length > 0)
					res.send(JSON.stringify({ status : 'finish' , messages : obj}));
				else
					res.send(JSON.stringify({ status : 'continue' , messages : obj}));
				break;
			}
		}
	}
	else
    	return template;
}
function _post(req, res, next) {
	/*let template = _get(req, res, next);
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
			messages.clear_error_messages();
			messages.clear_warning_messages();
			template.SHOW_INSTALL_STEP_2_FORM = true;
			template.TITLE = i18n.getLangForInstall('STAGE_REQUIREMENTS');
			template.CONTENT = '';
			
			if (!check_filesystem.run())
			{
				//debug(messages.get_error_messages());
			}
			
			check_server_environment.run();
			debug(messages.get_error_messages());
			debug(messages.get_warning_messages());
			
			
			if ( messages.get_error_messages().length > 0 )
			{
				template.CONTENT += '<div id="error-container" class="errorbox">';
				
				messages.get_error_messages().map((error)=>
				{template.CONTENT += '<br>';
					template.CONTENT += '<div>';
					template.CONTENT += '<strong>';
					template.CONTENT += error.title;
					template.CONTENT += '</strong>';
					if ( error.description != undefined )
					{
						template.CONTENT += '<p>';
						template.CONTENT += error.description;
						template.CONTENT += '</p>';
					}
					template.CONTENT += '</div>';
					
				});
				template.CONTENT += '<br>';
				template.CONTENT += '</div>';
			}
			
			if ( messages.get_warning_messages().length > 0 )
			{
				template.CONTENT += '<div id="warning-container" class="warningbox">';
				messages.get_warning_messages().map((warning)=>
				{
					template.CONTENT += '<div>';
					template.CONTENT += '<strong>';
					template.CONTENT += warning.title;
					template.CONTENT += '</strong>';
					
					if ( warning.description != undefined )
					{
						template.CONTENT += '<p>';
						template.CONTENT += warning.description;
						template.CONTENT += '</p>';
					}
			
					template.CONTENT += '</div>';
				});
				template.CONTENT += '</div>';
			}

			template.L_NEXT_STEP = i18n.helper('NEXT_STEP');
			//console.log(result);
			break;
		}
	}
	return template;*/
	req.session.install = {stage : parseInt(req.body.step)};
	res.send(JSON.stringify({ status : 'continue'  , messages : { refresh : true }}));
	//return {}
}

module.exports.post = _post;
module.exports.get = _get;