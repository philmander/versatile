//if(process.env.BROWSER) require('./header.scss');
import { h, Component } from 'preact';

class Footer extends Component {

    render() {
        return (
            <footer class="page-footer">
                <p>footer</p>
            </footer>
        );
    }
}

export default Footer;