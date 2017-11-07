'use strict';

console.log('');
console.log('************************************************');
console.log('****            Starting  ForumJS           ****');
console.log('************************************************');
console.log('');

var express = require('express');
var session = require('express-session');
var objectAssign = require('object-assign');
var bodyParser = require('body-parser');
var handlebars = require("express-handlebars");
var cookieParser = require('cookie-parser');
var path = require('path');
var routes = require('./app/config/core.routes');

var app = express();
var paths = {};

var sess = session({ secret: 'this is my appppppppp', resave: true, saveUninitialized: true });

app.use(sess);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/app/public')));
app.set('views', path.join(__dirname,'/app/views'));

app.set('view engine', '.hbs');
app.engine('.hbs', handlebars({ extname: '.hbs', partialsDir: './app/views/components' }));

/**
 * Load all routes in core.routes.
 */
var path = {};
for (var key in routes) {
    var controller = require('./app/controllers/' + routes[key].controller);

    for (var action in controller) {
        var url = routes[key].url;

        if (url != '/') {
            url += ".html";
        }

        var renderPage = "./pages/" + routes[key].view;
        var actionPage = controller[action];

        if (path[url] == undefined)
            path[url] = objectAssign({}, path[url], { 'render': renderPage, 'action': {} });

        path[url].action[action.toUpperCase()] = actionPage;

        app[action](url, function (req, res, next) {

            function _render(result) {
                var sessionData = objectAssign(result, { 'session': req.session });
                res.render(path[req.route.path].render, result);
            }
            var result = path[req.route.path].action[req.method](req, res, next, _render);
            if (result != undefined && result != null) {
                _render(result);
            }
        });
    }
}


var _route, _routes = [];

app._router.stack.forEach(function (middleware) {
    if (middleware.route) { // routes registered directly on the app
        _routes.push(middleware.route);
    } else if (middleware.name === 'router') { // router middleware 
        middleware.handle.stack.forEach(function (handler) {
            _route = handler.route;
            _route && _routes.push(route);
        });
    }
});

_routes.map(function (r) {
    var methode = "";
    if (r.methods.post != undefined && r.methods.post == true)
        methode = "POST";
    if (r.methods.get != undefined && r.methods.get == true)
        methode = "GET ";

    var print = "{ method : '" + methode + "' , path : '" + r.path + "' }";
    console.log(print);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    console.log('   404 => ' + req.method + ' ' + req.originalUrl);
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).render('./pages/Error_404', { title: "Sorry, page not found", 'session': req.session });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('');
    console.log('=> Server started on port ' + server.address().port);
});
