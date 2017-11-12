var i18n = require('../helpers/i18n');
var debug = require('debug')('install:installer');
var routes = require("../config/core.routes");
var check_filesystem = require("./module/check_filesystem");
var check_server_environment = require("./module/check_server_environment");
var messages = require("./module/messages");
var form = require("./module/form");

var process = false;
let obj = {};
let status = 'continue';
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

			status ='finish';
				break;
			}
			case ( 2 ):
			{
				

				let admin_form = {
					'admin_name'	: {
						'label'			: 'ADMIN_USERNAME',
						'description'	: 'ADMIN_USERNAME_EXPLAIN',
						'type'			: 'text',
						'default'		: '',
					},
					'board_email'	: {
						'label'		: 'CONTACT_EMAIL',
						'type'		: 'email',
						'default'	: '',
					},
					'admin_pass1'	: {
						'label'			: 'ADMIN_PASSWORD',
						'description'	: 'ADMIN_PASSWORD_EXPLAIN',
						'type'			: 'password',
					},
					'admin_pass2'	: {
						'label'	: 'ADMIN_PASSWORD_CONFIRM',
						'type'	: 'password',
					},
					'step'	: {
						'default' : 3,
						'type'	: 'hidden',
					},
					'submit_admin'	: {
						'label'	: 'SUBMIT',
						'type'	: 'submit',
					},
				};
				
				let formulaire = form.generate_form_render_data('ADMIN_CONFIG' , admin_form);
				formulaire.U_ACTION = routes.install_install.url+'.html';

				// if a callback is specified, the rendered HTML string has to be sent explicitly
				res.render('./components/adm/style/installer_form.hbs', formulaire , function(err, html) {
					obj.form =  html;
					status ='finish';
				});
					
				break;
			}
			case ( 3 ):
			{


				obj.form ='';
			status ='finish';
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
					res.send(JSON.stringify({ status : status , messages : obj}));

					obj.form =  '';
				break;
			}
		}
	}
	else
    	return template;
}
function _post(req, res, next) {
	req.session.install = {stage : parseInt(req.body.step)};
	status = 'continue';
	res.send(JSON.stringify({ status : 'continue'  , messages : { refresh : true }}));
}

module.exports.post = _post;
module.exports.get = _get;