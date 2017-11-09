if(process.env.BROWSER) require('./contact.scss');
import { h, Component } from 'preact';

class Contact extends Component {

    render(props = {}) {
        return (
            <div>
                <h2>Contact</h2>
                <ul class="contact-list">
                    <li><a class="email" href="mailto:philip@versatile.nl">philip@versatile.nl</a></li>
                    <li><a class="tel" href="tel:0031623865456">+31 (0) 623865456</a></li>
                    <li><a class="linkedin" href="https://www.linkedin.com/in/philmander/" target="_blank">/in/philmander</a></li>
                    <li><a class="github" href="https://github.com/philmander" target="_blank">github.com/philmander</a></li>
                    <li><a class="twitter" href="https://twitter.com/philmander">@philmander</a></li>
                </ul>
                <p>KvK: <b>63889943</b></p>
            </div>
        )
    }
}

export default Contact;