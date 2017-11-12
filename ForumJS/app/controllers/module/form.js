var i18n = require('../../helpers/i18n');

function generate_form_render_data(title, in_form)
{
    let form = {};
    form.options = [];
    form.submit_buttons= [];
    form.options.push({ 'LEGEND' : i18n.getLangForInstall(title) , 'S_LEGEND' : true});
    let not_button_form = false;
    for( let key in in_form)
    {
        let tpl_ary = {};
        tpl_ary['TYPE'] = in_form[key]['type'];
        tpl_ary['TITLE'] = i18n.getLangForInstall(in_form[key]['label']);
        tpl_ary['KEY'] = key;
        tpl_ary['S_EXPLAIN'] = false;

        not_button_form = (in_form[key]['type'] != 'submit' || not_button_form);

        if (in_form[key]['default'] != undefined)
        {
            tpl_ary['DEFAULT'] =in_form[key]['default'];
        }

        if (in_form[key]['description'] != undefined)
        {
            tpl_ary['TITLE_EXPLAIN'] = i18n.getLangForInstall(in_form[key]['description']);
            tpl_ary['S_EXPLAIN'] = true;
        }

        if (in_form[key]['type'] == 'select' || in_form[key]['type'] == 'radio' )
        {
            
        }

        if ( in_form[key]['type'] == 'submit')
            form.submit_buttons.push ( tpl_ary);
        else
            form.options.push(tpl_ary);
    };

    form.S_NOT_ONLY_BUTTON_FORM = not_button_form;

    return form;
}

module.exports.generate_form_render_data = generate_form_render_data;