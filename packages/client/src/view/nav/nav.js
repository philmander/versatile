if(process.env.BROWSER) require('./nav.scss');
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

class Nav extends Component {

    render() {
        return (
            <nav class="nav">
                <ul>
                    <li><Link activeClassName="active" href="/blog">Blog</Link></li>
                    <li><Link activeClassName="active" href="/work">Work</Link></li>
                    <li><Link activeClassName="active" href="/about">About</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;