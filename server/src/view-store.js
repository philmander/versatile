class ViewStore {
    constructor({ api }) {
        this.api = api;
        this.blogRoll = null;
        this.pageCache = {};
    }

    init() {

    }

    async getBlogRoll() {
        if(!this.blogRoll) {
            this.blogRoll = await this.api.getBlogRoll();
        }
    }

    async getPage(path) {
        if(!this.pageCache[path]) {
            this.pageCache[path] = await this.api.getPage(path);
        }
    }

    toJSON() {
        return {
            blogRoll: this.blogRoll,
            pageCache: this.pageCache,
        };
    }
}

module.exports = ViewStore;