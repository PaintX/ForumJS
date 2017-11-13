var constants = require('./constants');
var i18n = require('../helpers/i18n');
var config = require('../config/config');
var routes = require('../config/core.routes');
var util = require('util');
/**
* Generate page header
*/
function page_header ( session )
{
    let page_title = '';
    let display_online_list = false;
    let user = session.user;
    if ( user == undefined)
        user = { user_id : constants.ANONYMOUS};          
        
    let objRet = {}; 

    // Generate logged in/logged out status
    let l_login_logout = '';
	if (user.user_id != constants.ANONYMOUS)
	{
		/*$u_login_logout = append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=logout', true, $user->session_id);*/
        l_login_logout = i18n.getLangFor('common','LOGOUT');
	}
	else
	{
		/*$u_login_logout = append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=login');*/        
        l_login_logout = i18n.getLangFor('common','LOGIN');
    }
    
    // Last visit date/time
    let s_last_visit = (user.user_id != constants.ANONYMOUS) ? /*$user->format_date($user->data['session_last_visit'])*/'' : '';

	// Get users online list ... if required
    let l_online_users = '';
    let online_userlist = '' ;
    let l_online_record = '';
    let l_online_time = '';

	if (config['load_online'] && config['load_online_time'] && display_online_list)
	{
		/**
		* Load online data:
		* For obtaining another session column use $item and $item_id in the function-parameter, whereby the column is session_{$item}_id.
		*/
	/*	$item_id = max($item_id, 0);

		$online_users = obtain_users_online($item_id, $item);
		$user_online_strings = obtain_users_online_string($online_users, $item_id, $item);

		$l_online_users = $user_online_strings['l_online_users'];
		$online_userlist = $user_online_strings['online_userlist'];
		$total_online_users = $online_users['total_online'];

		if ($total_online_users > $config['record_online_users'])
		{
			$config->set('record_online_users', $total_online_users, false);
			$config->set('record_online_date', time(), false);
		}

		$l_online_record = $user->lang('RECORD_ONLINE_USERS', (int) $config['record_online_users'], $user->format_date($config['record_online_date'], false, true));

		$l_online_time = $user->lang('VIEW_ONLINE_TIMES', (int) $config['load_online_time']);*/
	}

    // Check for new private messages if user is logged in
    let s_privmsg_new = false;
  /*  if (!empty($user->data['is_registered']))
	{
		if ($user->data['user_new_privmsg'])
		{
			if (!$user->data['user_last_privmsg'] || $user->data['user_last_privmsg'] > $user->data['session_last_visit'])
			{
				$sql = 'UPDATE ' . USERS_TABLE . '
					SET user_last_privmsg = ' . $user->data['session_last_visit'] . '
					WHERE user_id = ' . $user->data['user_id'];
				$db->sql_query($sql);

				$s_privmsg_new = true;
			}
			else
			{
				$s_privmsg_new = false;
			}
		}
		else
		{
			$s_privmsg_new = false;
		}
	}*/
/*
    $forum_id = $request->variable('f', 0);
	$topic_id = $request->variable('t', 0);

	$s_feed_news = false;

	// Get option for news
	if ($config['feed_enable'])
	{
		$sql = 'SELECT forum_id
			FROM ' . FORUMS_TABLE . '
			WHERE ' . $db->sql_bit_and('forum_options', FORUM_OPTION_FEED_NEWS, '<> 0');
		$result = $db->sql_query_limit($sql, 1, 0, 600);
		$s_feed_news = (int) $db->sql_fetchfield('forum_id');
		$db->sql_freeresult($result);
	}

	// Determine board url - we may need it later
	$board_url = generate_board_url() . '/';
	// This path is sent with the base template paths in the assign_vars()
	// call below. We need to correct it in case we are accessing from a
	// controller because the web paths will be incorrect otherwise.
	/* @var $phpbb_path_helper \phpbb\path_helper */
/*	$phpbb_path_helper = $phpbb_container->get('path_helper');
	$corrected_path = $phpbb_path_helper->get_web_root_path();
	$web_path = (defined('PHPBB_USE_BOARD_URL_PATH') && PHPBB_USE_BOARD_URL_PATH) ? $board_url : $corrected_path;

	// Send a proper content-language to the output
	$user_lang = $user->lang['USER_LANG'];
	if (strpos($user_lang, '-x-') !== false)
	{
		$user_lang = substr($user_lang, 0, strpos($user_lang, '-x-'));
	}

	$s_search_hidden_fields = array();
	if ($_SID)
	{
		$s_search_hidden_fields['sid'] = $_SID;
	}

	if (!empty($_EXTRA_URL))
	{
		foreach ($_EXTRA_URL as $url_param)
		{
			$url_param = explode('=', $url_param, 2);
			$s_search_hidden_fields[$url_param[0]] = $url_param[1];
		}
	}

	$dt = $user->create_datetime();
	$timezone_offset = $user->lang(array('timezones', 'UTC_OFFSET'), phpbb_format_timezone_offset($dt->getOffset()));
	$timezone_name = $user->timezone->getName();
	if (isset($user->lang['timezones'][$timezone_name]))
	{
		$timezone_name = $user->lang['timezones'][$timezone_name];
	}

	// Output the notifications
	$notifications = false;
	if ($config['load_notifications'] && $config['allow_board_notifications'] && $user->data['user_id'] != ANONYMOUS && $user->data['user_type'] != USER_IGNORE)
	{
		/* @var $phpbb_notifications \phpbb\notification\manager */
/*		$phpbb_notifications = $phpbb_container->get('notification_manager');

		$notifications = $phpbb_notifications->load_notifications('notification.method.board', array(
			'all_unread'	: true,
			'limit'			: 5,
		));

		foreach ($notifications['notifications'] as $notification)
		{
			$template->assign_block_vars('notifications', $notification->prepare_for_display());
		}
	}

	/** @var \phpbb\controller\helper $controller_helper */
/*	$controller_helper = $phpbb_container->get('controller.helper');
	$notification_mark_hash = generate_link_hash('mark_all_notifications_read');
*/

objRet = {
    'SITENAME'						: config['sitename'],
    'SITE_DESCRIPTION'				: config['site_desc'],
    'PAGE_TITLE'					: page_title,
   /* 'SCRIPT_NAME'					: str_replace('.' . $phpEx, '', $user->page['page_name']),*/
    'LAST_VISIT_DATE'				: util.format(i18n.getLangFor('common','YOU_LAST_VISIT'), s_last_visit),
    'LAST_VISIT_YOU'				: s_last_visit,
   /* 'CURRENT_TIME'					: sprintf($user->lang['CURRENT_TIME'], $user->format_date(time(), false, true)),*/
    'TOTAL_USERS_ONLINE'			: l_online_users,
    'LOGGED_IN_USER_LIST'			: online_userlist,
    'RECORD_USERS'					: l_online_record,
/*
    'PRIVATE_MESSAGE_COUNT'			: (!empty($user->data['user_unread_privmsg'])) ? $user->data['user_unread_privmsg'] : 0,
    'CURRENT_USER_AVATAR'			: phpbb_get_user_avatar($user->data),
    'CURRENT_USERNAME_SIMPLE'		: get_username_string('no_profile', $user->data['user_id'], $user->data['username'], $user->data['user_colour']),
    'CURRENT_USERNAME_FULL'			: get_username_string('full', $user->data['user_id'], $user->data['username'], $user->data['user_colour']),
    'UNREAD_NOTIFICATIONS_COUNT'	: ($notifications !== false) ? $notifications['unread_count'] : '',
    'NOTIFICATIONS_COUNT'			: ($notifications !== false) ? $notifications['unread_count'] : '',
    'U_VIEW_ALL_NOTIFICATIONS'		: append_sid("{$phpbb_root_path}ucp.$phpEx", 'i=ucp_notifications'),
    'U_MARK_ALL_NOTIFICATIONS'		: append_sid("{$phpbb_root_path}ucp.$phpEx", 'i=ucp_notifications&amp;mode=notification_list&amp;mark=all&amp;token=' . $notification_mark_hash),
    'U_NOTIFICATION_SETTINGS'		: append_sid("{$phpbb_root_path}ucp.$phpEx", 'i=ucp_notifications&amp;mode=notification_options'),
    'S_NOTIFICATIONS_DISPLAY'		: $config['load_notifications'] && $config['allow_board_notifications'],

    'S_USER_NEW_PRIVMSG'			: $user->data['user_new_privmsg'],
    'S_USER_UNREAD_PRIVMSG'			: $user->data['user_unread_privmsg'],
    'S_USER_NEW'					: $user->data['user_new'],

    'SID'				: $SID,
    '_SID'				: $_SID,
    'SESSION_ID'		: $user->session_id,
    'ROOT_PATH'			: $web_path,
    'BOARD_URL'			: $board_url,
*/
    'L_LOGIN_LOGOUT'	: l_login_logout,
    'L_INDEX'			: (config['board_index_text'] !== '') ? config['board_index_text'] : i18n.getLangFor('common' , 'FORUM_INDEX'),
    /*'L_SITE_HOME'		: ($config['site_home_text'] !== '') ? $config['site_home_text'] : $user->lang['HOME'],
    'L_ONLINE_EXPLAIN'	: $l_online_time,

    'U_PRIVATEMSGS'			: append_sid("{$phpbb_root_path}ucp.$phpEx", 'i=pm&amp;folder=inbox'),
    'U_RETURN_INBOX'		: append_sid("{$phpbb_root_path}ucp.$phpEx", 'i=pm&amp;folder=inbox'),
    'U_MEMBERLIST'			: append_sid("{$phpbb_root_path}memberlist.$phpEx"),
    'U_VIEWONLINE'			: ($auth->acl_gets('u_viewprofile', 'a_user', 'a_useradd', 'a_userdel')) ? append_sid("{$phpbb_root_path}viewonline.$phpEx") : '',
    'U_LOGIN_LOGOUT'		: $u_login_logout,*/
    'U_INDEX'				: routes.index.url,
   /* 'U_SEARCH'				: append_sid("{$phpbb_root_path}search.$phpEx"),
    'U_SITE_HOME'			: $config['site_home_url'],*/
    'U_REGISTER'			: routes.signup.url,
    /*'U_PROFILE'				: append_sid("{$phpbb_root_path}ucp.$phpEx"),
    'U_USER_PROFILE'		: get_username_string('profile', $user->data['user_id'], $user->data['username'], $user->data['user_colour']),
    'U_MODCP'				: append_sid("{$phpbb_root_path}mcp.$phpEx", false, true, $user->session_id),
    'U_FAQ'					: $controller_helper->route('phpbb_help_faq_controller'),
    'U_SEARCH_SELF'			: append_sid("{$phpbb_root_path}search.$phpEx", 'search_id=egosearch'),
    'U_SEARCH_NEW'			: append_sid("{$phpbb_root_path}search.$phpEx", 'search_id=newposts'),
    'U_SEARCH_UNANSWERED'	: append_sid("{$phpbb_root_path}search.$phpEx", 'search_id=unanswered'),
    'U_SEARCH_UNREAD'		: append_sid("{$phpbb_root_path}search.$phpEx", 'search_id=unreadposts'),
    'U_SEARCH_ACTIVE_TOPICS': append_sid("{$phpbb_root_path}search.$phpEx", 'search_id=active_topics'),
    'U_DELETE_COOKIES'		: append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=delete_cookies'),
    'U_CONTACT_US'			: ($config['contact_admin_form_enable'] && $config['email_enable']) ? append_sid("{$phpbb_root_path}memberlist.$phpEx", 'mode=contactadmin') : '',
    'U_TEAM'				: ($user->data['user_id'] != ANONYMOUS && !$auth->acl_get('u_viewprofile')) ? '' : append_sid("{$phpbb_root_path}memberlist.$phpEx", 'mode=team'),
    'U_TERMS_USE'			: append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=terms'),
    'U_PRIVACY'				: append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=privacy'),
    'U_RESTORE_PERMISSIONS'	: ($user->data['user_perm_from'] && $auth->acl_get('a_switchperm')) ? append_sid("{$phpbb_root_path}ucp.$phpEx", 'mode=restore_perm') : '',
    'U_FEED'				: $controller_helper->route('phpbb_feed_index'),
*/
    'S_USER_LOGGED_IN'		:  (user.user_id != constants.ANONYMOUS) ? true : false,
 /*   'S_AUTOLOGIN_ENABLED'	: ($config['allow_autologin']) ? true : false,
    'S_BOARD_DISABLED'		: ($config['board_disable']) ? true : false,
    'S_REGISTERED_USER'		: (!empty($user->data['is_registered'])) ? true : false,
    'S_IS_BOT'				: (!empty($user->data['is_bot'])) ? true : false,
    'S_USER_LANG'			: $user_lang,
    'S_USER_BROWSER'		: (isset($user->data['session_browser'])) ? $user->data['session_browser'] : $user->lang['UNKNOWN_BROWSER'],
    'S_USERNAME'			: $user->data['username'],
    'S_CONTENT_DIRECTION'	: $user->lang['DIRECTION'],
    'S_CONTENT_FLOW_BEGIN'	: ($user->lang['DIRECTION'] == 'ltr') ? 'left' : 'right',
    'S_CONTENT_FLOW_END'	: ($user->lang['DIRECTION'] == 'ltr') ? 'right' : 'left',
    'S_CONTENT_ENCODING'	: 'UTF-8',
    'S_TIMEZONE'			: sprintf($user->lang['ALL_TIMES'], $timezone_offset, $timezone_name),
    'S_DISPLAY_ONLINE_LIST'	: ($l_online_time) ? 1 : 0,
    'S_DISPLAY_SEARCH'		: (!$config['load_search']) ? 0 : (isset($auth) ? ($auth->acl_get('u_search') && $auth->acl_getf_global('f_search')) : 1),
    'S_DISPLAY_PM'			: ($config['allow_privmsg'] && !empty($user->data['is_registered']) && ($auth->acl_get('u_readpm') || $auth->acl_get('u_sendpm'))) ? true : false,
    'S_DISPLAY_MEMBERLIST'	: (isset($auth)) ? $auth->acl_get('u_viewprofile') : 0,
    'S_NEW_PM'				: ($s_privmsg_new) ? 1 : 0,*/
    'S_REGISTER_ENABLED'	: (config['require_activation'] != constants.USER_ACTIVATION_DISABLE) ? true : false,
 /*   'S_FORUM_ID'			: $forum_id,
    'S_TOPIC_ID'			: $topic_id,
*/
    'S_LOGIN_ACTION'		: routes.login.url,
 /*   'S_LOGIN_REDIRECT'		: build_hidden_fields(array('redirect' : $phpbb_path_helper->remove_web_root_path(build_url()))),

    'S_ENABLE_FEEDS'			: ($config['feed_enable']) ? true : false,
    'S_ENABLE_FEEDS_OVERALL'	: ($config['feed_overall']) ? true : false,
    'S_ENABLE_FEEDS_FORUMS'		: ($config['feed_overall_forums']) ? true : false,
    'S_ENABLE_FEEDS_TOPICS'		: ($config['feed_topics_new']) ? true : false,
    'S_ENABLE_FEEDS_TOPICS_ACTIVE'	: ($config['feed_topics_active']) ? true : false,
    'S_ENABLE_FEEDS_NEWS'		: ($s_feed_news) ? true : false,

    'S_LOAD_UNREADS'			: ($config['load_unreads_search'] && ($config['load_anon_lastread'] || $user->data['is_registered'])) ? true : false,

    'S_SEARCH_HIDDEN_FIELDS'	: build_hidden_fields($s_search_hidden_fields),

    'T_ASSETS_VERSION'		: $config['assets_version'],
    'T_ASSETS_PATH'			: "{$web_path}assets",
    'T_THEME_PATH'			: "{$web_path}styles/" . rawurlencode($user->style['style_path']) . '/theme',
    'T_TEMPLATE_PATH'		: "{$web_path}styles/" . rawurlencode($user->style['style_path']) . '/template',
    'T_SUPER_TEMPLATE_PATH'	: "{$web_path}styles/" . rawurlencode($user->style['style_path']) . '/template',
    'T_IMAGES_PATH'			: "{$web_path}images/",
    'T_SMILIES_PATH'		: "{$web_path}{$config['smilies_path']}/",
    'T_AVATAR_PATH'			: "{$web_path}{$config['avatar_path']}/",
    'T_AVATAR_GALLERY_PATH'	: "{$web_path}{$config['avatar_gallery_path']}/",
    'T_ICONS_PATH'			: "{$web_path}{$config['icons_path']}/",
    'T_RANKS_PATH'			: "{$web_path}{$config['ranks_path']}/",
    'T_UPLOAD_PATH'			: "{$web_path}{$config['upload_path']}/",
    'T_STYLESHEET_LINK'		: "{$web_path}styles/" . rawurlencode($user->style['style_path']) . '/theme/stylesheet.css?assets_version=' . $config['assets_version'],
    'T_STYLESHEET_LANG_LINK': "{$web_path}styles/" . rawurlencode($user->style['style_path']) . '/theme/' . $user->lang_name . '/stylesheet.css?assets_version=' . $config['assets_version'],
    'T_FONT_AWESOME_LINK'	: !empty($config['allow_cdn']) && !empty($config['load_font_awesome_url']) ? $config['load_font_awesome_url'] : "{$web_path}assets/css/font-awesome.min.css?assets_version=" . $config['assets_version'],
    'T_JQUERY_LINK'			: !empty($config['allow_cdn']) && !empty($config['load_jquery_url']) ? $config['load_jquery_url'] : "{$web_path}assets/javascript/jquery.min.js?assets_version=" . $config['assets_version'],
    'S_ALLOW_CDN'			: !empty($config['allow_cdn']),
    'S_COOKIE_NOTICE'		: !empty($config['cookie_notice']),

    'T_THEME_NAME'			: rawurlencode($user->style['style_path']),
    'T_THEME_LANG_NAME'		: $user->data['user_lang'],
    'T_TEMPLATE_NAME'		: $user->style['style_path'],
    'T_SUPER_TEMPLATE_NAME'	: rawurlencode((isset($user->style['style_parent_tree']) && $user->style['style_parent_tree']) ? $user->style['style_parent_tree'] : $user->style['style_path']),
    'T_IMAGES'				: 'images',
    'T_SMILIES'				: $config['smilies_path'],
    'T_AVATAR'				: $config['avatar_path'],
    'T_AVATAR_GALLERY'		: $config['avatar_gallery_path'],
    'T_ICONS'				: $config['icons_path'],
    'T_RANKS'				: $config['ranks_path'],
    'T_UPLOAD'				: $config['upload_path'],

    'SITE_LOGO_IMG'			: $user->img('site_logo'),*/

    'L_USERNAME' : i18n.getLangFor('common' , 'USERNAME'),
    'L_PASSWORD' : i18n.getLangFor('common' , 'PASSWORD'),
    'L_REGISTER' : i18n.getLangFor('common', 'REGISTER'),
}



    return objRet;
}

module.exports.page_header = page_header;