const GitHubApi = require('github');
const marked = require('marked');
const highlight = require('highlight.js');

const owner = 'philmander';
const repo = 'versatile';

const CACHE_CLEAR_INTERVAL = 1000 * 60 * 60; // 1 hour

class Api {

    constructor({ logger }) {
        this.logger = logger;
        this.cache = new Map();
        this.github = new GitHubApi({
            version: '3.0.0',
            protocol: 'https',
            host: 'api.github.com'
        });
        setInterval(() => {
            this.cache.clear();
        }, CACHE_CLEAR_INTERVAL);
    }

    async getBlogRoll() {
        const path = 'content/blog.json';
        if(this.cache.get(path)) {
            return this.cache.get(path);
        }
        const blogJSON = await this._getContent(path);
        const blogRoll = JSON.parse(blogJSON);
        this.logger.trace(blogRoll);
        this.cache.set(path, blogRoll);
        return blogRoll;
    }

    async getPage(path) {
        if(this.cache.get(path)) {
            return this.cache.get(path);
        }

        const markdown = await this._getContent(`content/${path}.md`);
        const html = marked(markdown, {
            highlight: (code, lang) => {
                try {
                    return highlight.highlight(lang, code).value;
                } catch(err) {
                    return code;
                }
            },
            gfm: true,
            tables: true,
            breaks: false,
            smartLists: true,
            smartypants: true,
        });
        this.cache.set(path, html);
        return html;
    }

    async _getContent(path) {
        try {
            const res = await this.github.repos.getContent({ owner, repo, path });
            return new Buffer(res.data.content, 'base64').toString('utf8');
        } catch(err) {
            this.logger.warn({ err}, 'Could not get github content at path %s', path);
            throw err;
        }
    }
}

module.exports = function(...opts) {
    return new Api(...opts);
};