/*
 * Created on Tue Nov 08 2016
 *
 * Copyright (c) 2016 Sylvain LERIS - Y3S SAS
 */
var routes =
{
   'index': {
		url: '/',
		controller: 'index',
		view: 'index_body',
	},

	'login':
	{
		url:'/user/login',
		controller : 'user',
	},

	'signup':
	{
		url:'/user/signup',
		controller : 'user',
		view: 'ucp_register',
	}
}

module.exports = routes;