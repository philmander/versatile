const { resolve, join } = require('path');
const { existsSync, mkdirSync } = require('fs');
const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const RotatingFileStream = require('bunyan-rotating-file-stream');

module.exports = function loggingSetup(opts = {}) {
    // logger setup
    const {
        name = 'default-logger',
        level = 'info',
        dir = resolve(process.cwd(), 'log'),
        env =  (process.env.NODE_ENV || 'development'),
        period = '1d',          // daily rotation
        totalFiles = 10,        // keep up to 10 back copies
        rotateExisting = true,  // Give ourselves a clean file when we start up, based on period
        threshold = '10m',      // Rotate log files larger than 10 megabytes
        totalSize = '20m',      // Don't keep more than 20mb of archived log files
        gzip = true,            // Compress the archive log files to save space
        serializers = bunyan.stdSerializers,
    } = opts;

    if(!existsSync(dir)) {
        mkdirSync(dir);
    }

    // you can view the logs like this:
    // tail -f log/default-logger.log | bunyan -l info
    // or:
    // tail -n 500 | bunyan -l info
    const streams = [];
    if(env === 'production') {
        streams.push({
            stream: new RotatingFileStream({
                path: join(dir, `${name}.log`),
                period,         // daily rotation
                totalFiles,     // keep up to 10 back copies
                rotateExisting, // Give ourselves a clean file when we start up, based on period
                threshold,      // Rotate log files larger than 10 megabytes
                totalSize,      // Don't keep more than 20mb of archived log files
                gzip,           // Compress the archive log files to save space
            }),
            level,
        });
    }

    // nice pretty stream for standard out
    const sdtOutStream = new PrettyStream();
    sdtOutStream.pipe(process.stdout);
    streams.push({
        stream: sdtOutStream,
        level,
    });

    return bunyan.createLogger({
        name,
        streams,
        serializers,
    });
};
