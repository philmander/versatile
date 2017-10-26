import { h, Component } from 'preact';
import { observer } from 'mobx-observer';

@observer
class Context extends Component {

    constructor() {
        super();
        if(process.env.BROWSER) {
            window.addEventListener('orientationchange', () => {
                this.forceUpdate();
            });
        }
    }

    getChildContext() {
        return {
            store: this.props.store,
            breakpoints: {
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1800,
            },

            // a global space for elements that may need to be accessed by a disparate component
            elements: {},
            trackPageView: () => {
                if(process.env.BROWSER && window.GA_KEY) {
                    window.ga('send', 'pageview');
                }
            }
        };
    }

    render() {
        return (
                <div>{ this.props.children }</div>
        );
    }
}

export default Context;