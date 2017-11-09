const express = require('express');

module.exports = function({ api, logger }) {
    logger = logger.child({module: 'api-router'});

    const router = express.Router();

    router.get('/blog', async (req, res, next) => {
        const blogRoll = await api.getBlogRoll();
        res.json(blogRoll);
    });

    router.get('/page/*', async (req, res, next) => {
        const page = await api.getPage(req.params[0]);
        res.send(page);
    });

    return router;
};
