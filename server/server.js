/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const lodash = require('lodash-express');
const clientView = require('versatile-client/lib/view/view').default;
const md5File = require('md5-file');
const favicon = require('serve-favicon');

const logging = require('./src/logging');
const renderPreactApp = require('./src/render-preact-app');
const api = require('./src/api/api')();
const restApi = require('./src/api/rest');
const ViewStore = require('./src/view-store');
const serveImages = require('./src/images');

const inProduction = process.env.NODE_ENV === 'production';
const inDevelopment = process.env.NODE_ENV === 'development';
if(inDevelopment) {
    // env vars containing db config for development.
    // in production env vars are not loaded this way, they are passed in via Docker's CLI (--env-file)
    require('dotenv').config({ path: '../.env' });
}

// logger setup
const logger = logging({
    name: 'versatile-website',
    level: 'debug',
});

logger.info(`Starting Versatile Website in "${process.env.NODE_ENV || 'default'}" mode.`);

// express setup
const app = express();

app.set('views', path.join(__dirname, 'views'));
lodash(app, 'html');
app.set('view engine', 'html');
app.set('x-powered-by', false);

if(!inProduction) {
    app.disable('view cache');
}

app.use(favicon(path.join(__dirname,'../favicon.ico')));

// serve statics
const staticDir = path.join(__dirname, 'node_modules/versatile-client/dist');
app.use('/static', (req, res, next) => {
    res.set({ 'Cache-Control': 'public, max-age=31536000' }); // far future. hash will force revaliation
    next();
});
app.use('/static', express.static(staticDir));
logger.info('Express is serving statics from "%s"', staticDir);

const tmpDir = path.join(__dirname, '../tmp');
app.use('/images', serveImages({ tmpDir, logger }));

app.use((req, res, next) => {
    req.initialState = new ViewStore({ api });
    next();
});

app.use('/api', restApi({ api, logger }));

app.use('/blog', async (req, res, next) => {
    await req.initialState .getBlogRoll();
    next();
});

app.use([ '/blog/:blogPage', '/work', '/about' ], async (req, res, next) => {
    const path = req.params.blogPage ? `blog/${req.params.blogPage}` : `pages/${req._parsedUrl.pathname.substr(1)}`;
    try {
        await req.initialState .getPage(path);
        next();
    } catch(err) {
        err.status = 404;
        next(err);
    }
});

app.use(renderPreactApp({
    locals: {
        hashes: {
            css: md5File.sync(path.join(__dirname, 'node_modules/versatile-client/dist/styles.css')),
            js: md5File.sync(path.join(__dirname, 'node_modules/versatile-client/dist/main.js')),
        },
    },
    component: clientView,
}));

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
err.status = 404;
next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!inProduction) {
    app.use((err, req, res) => {
        console.error(err);
    res.status(err.status || 500);
    const resData = {
        message: err.message,
        status: err.status,
        stack: err.stack || ''
    };
    if(req.headers.accept && req.headers.accept.indexOf('application/json') === -1) {
        res.render('error.hbs', resData);
    } else {
        res.json(resData);
    }
});
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res) => {
        res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        status: err.status,
        error: {}
    });
});
}

const port = process.env.PORT || 9999;
const server = app.listen(port, () => {
    logger.info('Versatile website is now running on localhost:%s', port);
}).on('error', err => {
    if(err.code === 'EADDRINUSE') {
    logger.error('Cannot start Versatile. Something is already running on port %s.', port);
    process.exit(1);
} else {
    logger.error(err, 'Couldn\'t start Versatile :(');
}
}).on('close', () =>{

});

module.exports = {
    server
};