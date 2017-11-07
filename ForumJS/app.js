'use strict';
/*var child_process = require('child_process');

console.log('');
console.log('************************************************');
console.log('****           compiling  ForumJS           ****');
console.log('************************************************');
console.log('');

child_process.exec("webpack --watch", { stdio: [0, 1, 2] });
*/

console.log('');
console.log('************************************************');
console.log('****            Starting  ForumJS           ****');
console.log('************************************************');
console.log('');

var express = require('express');
var session = require('express-session');
var objectAssign = require('object-assign');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var websocket = require('./lib/WebSocket/websocket');
var ios = require('socket.io-express-session');
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
    res.status(err.status || 500).send('Not found');
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('');
    console.log('=> Server started on port ' + server.address().port);
});

websocket.listen(server, function (skt) {

    /**
    * Load all routes in core.routes.
    */
    console.log('=> Load routes for WS : ' + skt.id);
    for (var key in routes) {
        var controller = require('./app/controllers/' + routes[key].controller);

        for (var action in controller) {
            var url = routes[key].url;
            var renderPage = "./pages/" + routes[key].view;
            var actionPage = controller[action];
            var request = skt.handshake;
            if (paths[url] == undefined)
                paths[url] = objectAssign({}, paths[url], { 'render': renderPage, 'action': {} });

            paths[url].action[action.toUpperCase()] = actionPage;

            skt.on(url, (msg) => {
                console.log(msg);
                let data = JSON.parse(msg);
                var result = undefined;
                let req;
                if (data.user != undefined) {
                    //-- demande de login dynamique
                    req = objectAssign({}, request, { token: data.token, method: "POST", originalUrl: "/api/users/login", body: JSON.parse(data.user) });

                    if (paths[data.topic].action[req.method] == undefined) {
                        req.method = "POST";
                    }
                    req.action = req.originalUrl.substr(req.originalUrl.lastIndexOf('/') + 1);

                    result = paths[req.originalUrl].action[req.method](req, skt, function () {
                        req = objectAssign({}, request, { token: data.token, method: "GET", originalUrl: data.topic, body: data.data });

                        if (paths[data.topic].action[req.method] == undefined) {
                            req.method = "POST";
                        }
                        req.action = req.originalUrl.substr(req.originalUrl.lastIndexOf('/') + 1);

                        result = paths[data.topic].action[req.method](req, skt);

                    });

                }
                else {
                    req = objectAssign({}, request, { token: data.token, method: "GET", originalUrl: data.topic, body: data.data });

                    if (paths[data.topic].action[req.method] == undefined) {
                        req.method = "POST";
                    }
                    req.action = req.originalUrl.substr(req.originalUrl.lastIndexOf('/') + 1);

                    result = paths[data.topic].action[req.method](req, skt);
                }



            });
        }
    }

    skt.on('disconnect', function () {
        var request = skt.handshake;
        if (request.session.user != undefined)
            websocket.delete(request.session.user.id, skt.id);

        console.log('=> UnLoad routes for WS : ' + skt.id);
    });

});
websocket.use(ios(sess));