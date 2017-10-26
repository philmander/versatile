//if(process.env.BROWSER) require('./header.scss');
import { h, Component } from 'preact';

class Header extends Component {

    render() {
        return (
            <header class="page-header">
                <p>header</p>
            </header>
        );
    }
}

export default Header;