import { useState, useEffect } from 'react';
import FooterV from '../components/footer-v/footerV';
import Map from '../components/map';
import Loader from '../components/map/loader';
// import Header from './components/Header';

const ContactsPage = (props) => {
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const res = await fetch(
                'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
            );
            const { events } = await res.json();

            setEventData(events);
            setLoading(false);
        };

        fetchEvents();
    }, []);

    return (
        <div className="contact-map_wrap">
            <div className="contact-map">
                {!loading ? <Map eventData={eventData} /> : <Loader />}
            </div>

            <div id="content" className="site-content" tabIndex={-1}>
                <div className="col-full">
                    <div id="primary" className="content-area">
                        <main id="main" className="site-main">
                            <div className="entry-content" />
                            <header className="contact-header">
                                <h1 className="entry-title">Contact Us</h1>
                                <p className="description">
                                    We are a second-generation family business
                                    established in 1972
                                </p>
                            </header>
                            <div className="contact-form-with-address">
                                <div className="row">
                                    <div className="col-md-9 col-sm-9 col-xs-12">
                                        <div className="contact-form">
                                            <h2>Leave us a Message</h2>
                                            <p>
                                                Aenean massa diam, viverra vitae
                                                luctus sed, gravida eget est.
                                                Etiam nec ipsum porttitor,
                                                consequat libero eu, dignissim
                                                eros. Nulla auctor lacinia enim
                                                id mollis.
                                            </p>
                                            [wpforms id="1072"]
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-3 col-xs-12">
                                        <div className="store-info">
                                            <h2>Our Address</h2>
                                            <p>
                                                17 Princess Road London, Greater
                                                London NW1 8JR, UK
                                                <br />
                                                Support (+800) 856 800 604
                                                <br />
                                                E-mail: info@pizzaro.com
                                            </p>
                                            <div className="address">
                                                <h3>Opening Hours</h3>
                                                <div className="address-info">
                                                    <ul>
                                                        <li className="clearfix">
                                                            <span className="day">
                                                                Monday
                                                            </span>
                                                            <span className="pull-right flip hours">
                                                                12-6 PM
                                                            </span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">
                                                                Tuesday
                                                            </span>
                                                            <span className="pull-right flip hours">
                                                                12-6 PM
                                                            </span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">
                                                                Wednesday
                                                            </span>
                                                            <span className="pull-right flip hours">
                                                                12-6 PM
                                                            </span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">
                                                                Thursday
                                                            </span>
                                                            <span className="pull-right flip hours">
                                                                12-6 PM
                                                            </span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">
                                                                Friday
                                                            </span>
                                                            <span className="pull-right flip hours">
                                                                12-6 PM
                                                            </span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">
                                                                Saturday
                                                            </span>
                                                            <span className="pull-right flip hours">
                                                                12-6 PM
                                                            </span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">
                                                                Sunday
                                                            </span>
                                                            <span className="pull-right flip hours">
                                                                Closed
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="address">
                                                <h3>Careers.</h3>
                                                <div className="address-info">
                                                    <p className="inner-right-md">
                                                        If you are interested in
                                                        employment opportunities
                                                        at Pizzaro, please email
                                                        us:{' '}
                                                        <a href="mailto:contact@yourstore.com">
                                                            contact@yourstore.com
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <FooterV />
        </div>
    );
};

export default ContactsPage;
