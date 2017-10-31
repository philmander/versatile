const fs = require('fs');
const { join } = require('path');
const { parse } = require('url');
const serveStatic = require('serve-static');
const GitHubApi = require('github');

const github = new GitHubApi({
    version: '3.0.0',
    protocol: 'https',
    host: 'api.github.com'
});

const owner = 'philmander';
const repo = 'versatile';

module.exports = function({ tmpDir, logger}) {
    if(!fs.existsSync(tmpDir)) {
        logger.info('Tmp dir %s does not exist. Creating it...', tmpDir);
        fs.mkdir(tmpDir, err => {
            logger.warn({ err } , 'Could not create photosDir at %s', tmpDir);
        });
    }

    const imageServer = serveStatic(tmpDir, {
        index: false
    });

    return (req, res, next) => {
        const imagePath = parse(req.url).pathname;
        const fullImagePath = join(tmpDir, imagePath);
        fs.exists(fullImagePath, async exists => {
           // send the image directly from disk
           if(exists) {
               imageServer(req, res, err => {
                   req.status = 404;
                   req.url = req.originalUrl;
                   next(err);
               });
           } else {
               // before sending get+cache the image from github, then send it
               const ghPath = join('content/images', imagePath);
               try {
                   const ghRes = await github.repos.getContent({ owner, repo, path: ghPath });
                   const buff = new Buffer(ghRes.data.content, 'base64');
                   fs.writeFile(fullImagePath, buff, 'base64', err => {
                       if(err) {
                           return next(err)
                       }
                       imageServer(req, res, err => {
                           req.status = 404;
                           req.url = req.originalUrl;
                           next(err);
                       });
                   });
               } catch(err) {
                   next(err);
               }
           }
        });
    }
};