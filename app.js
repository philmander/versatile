var express = require('express');
var path = require('path');
var pagespace = require('pagespace');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var session = require("express-session");
var bunyan = require('bunyan');

var app = express();
var inProduction = app.get('env') === 'production';
var SITE = 'versatile';

//app.use(favicon(__dirname + '/favicon.ico'));
app.use(/^(?!\/_static).+/, [ bodyParser.json(), cookieParser(), session({secret: process.env.SESSION_SECRET || 'foo'})]);
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/theme/assets'));

// view engine setup
app.set('views', [ pagespace.getViewDir(), path.join(__dirname, 'theme/templates') ]);
app.engine('hbs', pagespace.getViewEngine());

//pagespace setup
var mediaDir = process.env.PAGESPACE_MEDIA_DIR;
var logDir = process.env.PAGESPACE_LOG_DIR;
var logLevel = process.env.PAGESPACE_LOGLEVEL || 'info';
app.use(pagespace.init({
    db: 'mongodb://127.0.0.1/' + SITE,
    dbOptions: {
        user: SITE,
        pass: SITE
    },
    mediaDir: inProduction && mediaDir ? path.join(mediaDir, SITE) : path.join(__dirname, 'media-uploads'),
    logLevel: logLevel,
    logger: inProduction && logDir ? bunyan.createLogger({
        name: SITE,
        streams: [
            {
                level: logLevel,
                path: path.join(logDir, SITE + '.log')
            }
        ]
    }) : null
}));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (inProduction) {
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

var port = 8004;
app.listen(port, function() {
    console.log(SITE + ' site now running on http://localhost:%s', port)
}).on('error', function(err) {
    if(err.code === 'EADDRINUSE') {
        console.error('Cannot start ' + SITE + ' site. Something is already running on port %s.', port);
    } else {
        console.error(err, 'Couldn\'t start ' + SITE + ' site :(');
    }
});