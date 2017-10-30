if(process.env.BROWSER) require('./footer.scss');
import { h, Component } from 'preact';

class Footer extends Component {

    render() {
        return (
            <footer class="page-footer">
                <p>Versatile Internet © { new Date().getFullYear() } </p>
                <p>Amsterdam</p>
            </footer>
        );
    }
}

export default Footer;