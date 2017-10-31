if(process.env.BROWSER) require('./home.scss');
import { h, Component } from 'preact';
import Slider from 'react-slick';
import { PrevArrow, NextArrow} from '../common/carousel-arrows';

import vonq from './img/carousel-vonq.png';
import topspots from './img/carousel-topspots.png';
import backbase from './img/carousel-backbase.png';


const slickSettings = {
    //adaptiveHeight: true,
    slidesToShow: 1,
    infinite: true,
    dots: true,
    //autoplay: true,
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
            <main class="home page-main">
                <p>I'm Phil Mander, a freelance and consultant web architect and engineer. I thrive on delivering
                innovative technical solutions that deliver strong business value.</p>
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
                                <p>Selected technologies include: <b>Preact</b>, <b>Mobx</b>, <b>Node.JS</b>, <b>GraphQL</b>, <b>MongoDB</b>.A fast and fully-featured progressive web-app using the latest webdev technologies.</p>
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
                                <p>Design and implement a modern frontend architecture for Vonq's Job Marketing platform.</p>
                                <p>Selected technologies include: <b>React</b> + <b>Redux</b>. Constraints included a phased migration away from a legacy <b>Angular 1</b> frontend.</p>
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
                                <p>Frontend architecture and team lead on Backbase's new CXP digital banking platform.</p>
                                <p>Technologies: A <b>vanilla JS</b> widget rendering framework with Java based server side
                                    rendering. Content management capabilities built with <b>Web Components/Shadow DOM</b></p>
                            </footer>
                        </div>
                    </Slider>
                </div>
            </main>
        );
    }
}

export default Home;