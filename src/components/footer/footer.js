/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import HeaderLogo from '../header/top-header/header-logo';
import { useSelector } from 'react-redux';
import Map from '../map';
import { Redirect, Link } from 'react-router-dom';
import Loader from '../map/loader';

const Footer = () => {
    const { totalCount } = useSelector(({ cart }) => cart);
    const [eventData, setEventData] = React.useState([]);
    const [visibleCountry, setVisibleCountry] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const toggleVisibleSort = () => {
        setVisibleCountry(!visibleCountry);
        <Redirect to="/" />;
    };

    const changePosition2 = () => {
        if (!visibleCountry) {
            setTimeout(function () {
                if (window.scrollY <= 149) {
                    setVisibleCountry(visibleCountry);
                }
            }, 2200);
        }
    };

    window.addEventListener('scroll', changePosition2);

    React.useEffect(() => {
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
        <div>
            <footer
                id="colophon"
                className={
                    visibleCountry
                        ? 'site-footer footer-v1 footer-scroll'
                        : 'site-footer footer-v1'
                }
                role="contentinfo"
            >
                <div className="col-full">
                    <div className="footer-social-icons">
                        <span className="social-icon-text">Follow us</span>
                        <ul className="social-icons list-unstyled">
                            <li>
                                <a className="fa fa-facebook" href="#test1"></a>
                            </li>
                            <li>
                                <a className="fa fa-twitter" href="#test75"></a>
                            </li>
                            <li>
                                <a
                                    className="fa fa-instagram"
                                    href="#test7"
                                ></a>
                            </li>
                            <li>
                                <a className="fa fa-youtube" href="#test5"></a>
                            </li>
                            <li>
                                <a className="fa fa-dribbble" href="#test2"></a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-logo">
                        <HeaderLogo />
                    </div>
                    <div className="site-address">
                        <ul className="address">
                            <li>Pizzaro Restoranları</li>
                            <li>Bakı ş. Yasamal r-nu., Zivər Əhbədbəyov</li>
                            <li>Telefon: +994 452 45 22</li>
                        </ul>
                    </div>
                    <div className="site-info">
                        <p className="copyright">
                            Copyright © 2021 Pizzaro Theme. All rights reserved.
                        </p>
                    </div>

                    <div className="">
                        <a
                            onClick={toggleVisibleSort}
                            className="footer-action-btn"
                            href="#map"
                        >
                            <i className="po po-map-marker"></i>
                            Restoranları xəritədə axtar
                        </a>
                    </div>
                    <div className="pizzaro-handheld-footer-bar">
                        <ul className="columns-3">
                            <li className="my-account">
                                {userInfo && userInfo.isAdmin ? (
                                    <Link to="/orderhistory">Orderhistory</Link>
                                ) : userInfo && !userInfo.isAdmin ? (
                                    <Link to="/orderhistory">Orderhistory</Link>
                                ) : (
                                    <Link to="/signin">Signin</Link>
                                )}
                            </li>
                            <li className="cart">
                                <Link
                                    className="footer-cart-contents"
                                    to="/card"
                                >
                                    <span className="count">{totalCount}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>

            {visibleCountry && (
                <div id="footer-map">
                    {!loading ? <Map eventData={eventData} /> : <Loader />}
                    <div id="map"></div>
                </div>
            )}
        </div>
    );
};

export default Footer;
