var express = require('express');
var path = require('path');
var pagespace = require('pagespace');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var session = require("express-session");

var app = express();
var siteName = 'versatile';

app.use(favicon(__dirname + '/theme/assets/favicon.ico'));
app.use(/^(?!\/_static).+/, [ bodyParser.json(), cookieParser(), session({secret: process.env.SESSION_SECRET || 'keyboardcat'})]);
app.set('view engine', 'hbs');

//serve custom statics
app.use(express.static(__dirname + '/theme/assets'));

// view engine setup
app.set('views', [ pagespace.getViewDir(), path.join(__dirname, 'theme/templates') ]);
app.engine('hbs', pagespace.getViewEngine());

//pagespace setup
var pagespaceConf = {
    db: 'mongodb://127.0.0.1/' + siteName,
    logLevel: 'info'
};
app.use(pagespace.init(pagespaceConf));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
        console.error(err);
        res.status(err.status || 500);
        var resData = {
            message: err.message,
            status: err.status,
            stack: err.stack || ''
        };
        if(req.headers.accept && req.headers.accept.indexOf('application/json') === -1) {
            res.render('error.hbs', resData);
        } else {
            res.json(resData)
        }
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            status: err.status,
            error: {}
        });
    });
}

module.exports = app;