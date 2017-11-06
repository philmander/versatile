import { h, Component } from 'preact';

class Comments extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render(props = {}) {
        console.log('render comments')
        return <div id="disqus_thread" style={{marginTop: '4rem'}}></div>
    }

    componentDidMount() {
        var d = document, s = d.createElement('script');
        s.src = '//versatile-intenet.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }
}

export default Comments;