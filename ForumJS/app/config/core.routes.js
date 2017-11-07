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
    },
   'site_infos': {
       url: '/api/site/infos',
       controller: 'site',
   },
}

module.exports = routes;