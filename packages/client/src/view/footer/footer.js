if(process.env.BROWSER) require('./footer.scss');
import { h, Component } from 'preact';

class Footer extends Component {

    render() {
        return (
            <footer class="page-footer">
                <p>This site is built with <a href="https://preactjs.com/" target="_blank">Preact</a> and <a href="https://mobx.js.org" target="_blank">Mobx</a>. You can view its <a href="https://github.com/philmander/versatile" target="_blank">source on Github</a></p>
                <div>
                    <p>Versatile Internet © { new Date().getFullYear() } </p>
                    <p>Amsterdam</p>
                </div>
            </footer>
        );
    }
}

export default Footer;