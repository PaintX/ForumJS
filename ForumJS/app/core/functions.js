var config = require("../global/config");
var routes = require("../config/core.routes");

/**
* Generate page header
*/
function page_header(session)
{
    var template = {};
    var user = session.user;

    template.SITENAME = "hello";
    template.SITE_DESCRIPTION = "";
    template.PAGE_TITLE = "page title";
    template.SCRIPT_NAME = "";
    template.U_CANONICAL = "";
    template.S_CONTENT_DIRECTION = "ltr";

    template.U_INDEX = '/';

    //template.L_SITE_HOME =  ($config['site_home_text'] !== '') ? $config['site_home_text'] : $user ->lang['HOME'],
    //template.S_DISPLAY_SEARCH = (!$config['load_search']) ? 0 : (isset($auth) ? ($auth ->acl_get('u_search') && $auth ->acl_getf_global('f_search')) : 1),
    template.S_DISPLAY_SEARCH = true;
    template.S_IN_SEARCH = false;
    template.U_SEARCH = routes.search.url;
        template.U_SITE_HOME = config.get('site_home_url');

   // 'S_SEARCH_HIDDEN_FIELDS'	=> build_hidden_fields($s_search_hidden_fields),
    template.S_USER_LOGGED_IN = false;//(user != undefined) ? true : false;
    template.S_BOARD_DISABLED = true;//($config['board_disable']) ? true : false,
    template.S_CONTENT_FLOW_END = 'right'; //($user ->lang['DIRECTION'] == 'ltr') ? 'right' : 'left',
    template.CURRENT_TIME = new Date().toString();// sprintf($user ->lang['CURRENT_TIME'], $user ->format_date(time(), false, true)),

    template.S_LOGIN_ACTION = routes.login.url;// ((!defined('ADMIN_START')) ? append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=login') : append_sid("{$phpbb_admin_path}index.$phpEx", false, true, $user ->session_id)),
    template.U_LOGIN_LOGOUT = routes.login.url;
    template.U_REGISTER = routes.register.url;//			=> append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=register'),
    template.S_DISPLAY_ONLINE_LIST = true;// ($l_online_time) ? 1 : 0,
    template.U_VIEWONLINE = routes.viewonline.url;// ($auth ->acl_gets('u_viewprofile', 'a_user', 'a_useradd', 'a_userdel')) ? append_sid("{$phpbb_root_path}viewonline.$phpEx") : '',
    template.TOTAL_USERS_ONLINE = 5;//$l_online_users,
    return template;
}

module.exports.page_header = page_header;