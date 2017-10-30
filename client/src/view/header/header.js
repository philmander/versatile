if(process.env.BROWSER) require('./header.scss');
import { h, Component } from 'preact';
import { route } from 'preact-router';
import Nav from '../nav/nav';

class Header extends Component {

    render() {
        return (
            <header class="page-header">
                <p><a href='/'>Versatile</a><span>By Phil Mander</span></p>
                <Nav />
            </header>
        );
    }
}

export default Header;