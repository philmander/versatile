//if(process.env.BROWSER) require('styles/index.scss');

import { h, Component } from 'preact';
import Router from 'preact-router';
import Context from './context';
import Header from './header/header';
import Page from './page/page';
import Home from './home/home';
import Blog from './blog/blog';
import Footer from './footer/footer';

export default function(store) {
    store.init();

    class App extends Component {

        render(props = {}) {
            const { url } = props;
            return (
                <Context store={store}>
                    <Header />
                    <Router url={url}>
                        <Home path="/"/>
                        <Blog path="/blog"/>
                        <Page path="/blog/:page" />
                        <Page path="/work" page="work" />
                        <Page path="/about" page="about" />
                    </Router>
                    <Footer/>
                </Context>
            );
        }
    }

    return App;
}