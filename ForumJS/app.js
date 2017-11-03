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
var path = require('path');

var app = express();

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