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
   'search': {
       url: '/search.html',
       controller: 'index',
       view: 'index_body',
   },
   'login': {
       url: '/login.html',
       controller: 'index',
       view: 'index_body',
   },
   'register': {
       url: '/register.html',
       controller: 'index',
       view: 'index_body',
   },
   'viewonline': {
       url: '/viewonline.html',
       controller: 'index',
       view: 'index_body',
   },


   'install': {
       url: '/install/index',
       controller: 'install',
       view: 'adm/style/installer_install',
   },
}

module.exports = routes;