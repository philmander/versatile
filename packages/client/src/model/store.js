import { observable, action, useStrict } from 'mobx';

useStrict(true);

class Store {

    @observable blogRoll = null;
    @observable currentPage = null;
    pageCache = {};

    constructor() {
        if(window.initialState) {
            this.blogRoll = window.initialState.blogRoll || null;
            this.pageCache = window.initialState.pageCache || {};
        }
    }

    init() {

    }

    @action getBlogRoll() {
        if(!this.blogRoll) {
            return fetch('/api/blog').then(res => {
                return res.json();
            }).then(action(blogRoll => {
                this.blogRoll = blogRoll;
            }));
        }
    }

    @action getPage(path) {
        const page = this.pageCache[path];
        if(!page) {
            this.currentPage = null;
            return fetch(`/api/page/${path}`).then(res => {
                return res.text();
            }).then(action(html => {
                this.pageCache[path] = html;
                this.currentPage = html;
            }));
        } else {
            this.currentPage = page;
        }
    }
}

export default Store;