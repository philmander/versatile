if(process.env.BROWSER) require('./page.scss');
import { h, Component } from 'preact';
import { observer } from 'mobx-observer';
import Comments from './comments';

@observer
class Page extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.context.store.getPage(this._getPagePath(this.props));
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.page !== nextProps.page) {
            const pagePath = this._getPagePath(nextProps);
            this.context.store.getPage(pagePath);
        }
    }

    render(props = {}) {
        const { store } = this.context;
        const __html = store.currentPage || '<p>Loading...</p>';
        const shouldRenderComments = process.env.BROWSER && window.location.pathname.startsWith('/blog/');

        return (
            <main class="page-main">
                <article dangerouslySetInnerHTML={{ __html }} />
                { shouldRenderComments && <Comments /> }
            </main>
        );
    }

    _getPagePath(props = {}) {
        const prefix = props.url && props.url.startsWith('/blog') ? 'blog' : 'pages';
        return `${prefix}/${props.page}`;
    }
}

export default Page;