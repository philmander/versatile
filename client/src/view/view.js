//if(process.env.BROWSER) require('styles/index.scss');

import { h, Component } from 'preact';
import {observer} from 'mobx-observer';
import Router from 'preact-router';
import Context from './context';
import Header from './header/header';
import Home from './home/home';
import Blog from './blog/blog';
import Footer from './footer/footer';

@observer
export default function(store) {
    store.init();

    // only used on server
    const { url } = store;

    class App extends Component {
        render() {
            return (
                <Context store={store}>
                    <Header />
                    <Router url={url}>
                        <Home path="/"/>
                        <Blog path="/blog"/>
                    </Router>
                    <Footer/>
                </Context>
            );
        }
    }

    return App;
}