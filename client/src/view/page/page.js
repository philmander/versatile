if(process.env.BROWSER) require('./page.scss');
import { h, Component } from 'preact';
import { observer } from 'mobx-observer';
import Contact from './contact';
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
        const showContact = props.url && props.url.startsWith('/about');

        return (
            <div class="row wrap">
                <main class="page-main col-xs-12 col-sm-12 col-md-8">
                    <article dangerouslySetInnerHTML={{ __html }} />
                    { shouldRenderComments && <Comments /> }
                </main>
                {
                    showContact &&
                        <aside class="col-xs-12 col-sm-12 col-md-4">
                            <Contact />
                        </aside>
                }
            </div>
        );
    }

    componentDidMount() {
        if(process.env.BROWSER && window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if(el) {
                window.scrollTo(0, el.offsetTop);
            }
        }
    }

    _getPagePath(props = {}) {
        const prefix = props.url && props.url.startsWith('/blog') ? 'blog' : 'pages';
        return `${prefix}/${props.page}`;
    }
}

export default Page;