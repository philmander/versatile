if(process.env.BROWSER) require('./home.scss');
import { h, Component } from 'preact';
import Slider from 'react-slick';
import { PrevArrow, NextArrow} from '../common/carousel-arrows';

const vonq = process.env.BROWSER ? require('./img/carousel-vonq.png') : '';
const topspots = process.env.BROWSER ? require('./img/carousel-topspots.png') : '';
const backbase = process.env.BROWSER?  require('./img/carousel-backbase.png') : '';

const slickSettings = {
    //adaptiveHeight: true,
    slidesToShow: 1,
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000 * 5,
    pauseOnHover: true,
    useCSS: true,
    lazyLoad: true,
    pagesToPreload: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
};

class Home extends Component {

    render() {
        return (
            <div class="row wrap home">
                <main class="page-main col-xs-12 col-sm-12 col-md-12">
                    <p>I'm <b>Phil Mander</b>, a freelance and consultant web architect and engineer with over
                        15 years experience working with web and mobile technologies.</p>

                    <p>I work with organizations to deliver innovative, robust software solutions with an emphasis on business value.</p>

                    <p>I specialize in many languages and frameworks such as <em>React</em>, <em>Angular</em>, <em>Node.JS</em> and <em>MongoDB</em>, and also <em>agile</em> development methodologies.</p>

                    <p>Please get in touch if you would like to <a href="mailto:philip@versatile.nl">work with me</a>.</p>

                    <p>Here are some highlights of my recent work:</p>
                    <div class="carousel">
                        <Slider {...slickSettings}>
                            <div>
                                <header class="slide-header">
                                    <h2>TopSpots B.V: New Full-stack Webapp</h2>
                                </header>
                                <main class="slide-main">
                                    <img src={topspots} alt="TopSpots Website"/>
                                </main>
                                <footer class="slide-footer">
                                    <p>Full stack architecture and development of TopSpots' new online restaurant guide.</p>
                                    <p>Selected technologies include: <b>Preact</b>, <b>Mobx</b>, <b>Node.JS</b>, <b>GraphQL</b>, <b>MongoDB</b>. A fast and fully-featured progressive webapp for mobile and desktop.</p>
                                    <p><a href="/work#topspots">Read more…</a></p>
                                </footer>
                            </div>
                            <div>
                                <header class="slide-header">
                                    <h2>VONQ B.V: Frontend Architecture</h2>
                                </header>
                                <main class="slide-main">
                                    <img src={vonq} alt="Vonq Job Marketing Platform"/>
                                </main>
                                <footer class="slide-footer">
                                    <p>Designed and delivered a modern frontend architecture for Vonq's Job Marketing Platform.</p>
                                    <p>Selected technologies include: <b>React</b> + <b>Redux</b>. Constraints included a phased migration away from a legacy <b>Angular 1</b> frontend.</p>
                                    <p><a href="/work#vonq">Read more…</a></p>
                                </footer>
                            </div>
                            <div>
                                <header class="slide-header">
                                    <h2>Backbase B.V: Portal Frontend Architecture</h2>
                                </header>
                                <main class="slide-main">
                                    <img src={backbase} alt="Backbase work samples"/>
                                </main>
                                <footer class="slide-footer">
                                    <p>Frontend architect and team lead on Backbase's new CXP digital banking platform.</p>
                                    <p>Technologies: A <b>vanilla JS</b> widget rendering framework with Java based server side
                                        rendering. Content management capabilities built with <b>Web Components/Shadow DOM</b>.</p>
                                    <p><a href="/work#backbase">Read more…</a></p>

                                </footer>
                            </div>
                        </Slider>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;