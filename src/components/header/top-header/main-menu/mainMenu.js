/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../../redux/actions/userActions';
import styled from 'styled-components';

const StyledBurger = styled.div`
    width: 1.9rem;
    height: 1.2rem;
    position: absolute;
    top: -15px;
    right: 5%;
    z-index: 20;
    display: none;
    @media (max-width: 1197px) {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }
    div {
        width: 22px;
        height: 0.1rem;
        background-color: ${({ open }) => (open ? '#ffffff' : '#ffffff')};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;
        &:nth-child(1) {
            transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
        }
        &:nth-child(2) {
            transform: ${({ open }) =>
                open ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({ open }) => (open ? 0 : 1)};
        }
        &:nth-child(3) {
            transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }
`;

const MainMenu = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [visibleCamera, setVisibleCamera] = React.useState(false);

    const cameraLink = () => {
        setVisibleCamera(!visibleCamera);
    };

    const [open, setOpen] = React.useState(false);

    const BurgerMenuSet = () => {
        setOpen(!open);
    };

    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
        setOpen(!open);
    };

    return (
        <div>
            {visibleCamera && (
                <div className="sc-1gg5fcy-4 hTFLRd">
                    <iframe
                        className="iv-i"
                        src="https://open.ivideon.com/embed/v2/?server=100-B427V1wi21x0xNlBSVmCJd&camera=655360&width=&height=&lang=ru?autoplay=1&loop=1&autopause=0"
                        width={390}
                        height={220}
                        frameBorder={0}
                        frameBorder={0}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />

                    <i
                        id="camera-close"
                        className="sc-1lk7lib-0 jkSByL svg-icon sc-1gg5fcy-10 eJPAbM"
                        onClick={() => setVisibleCamera(false)}
                    >
                        <svg
                            width={22}
                            height={22}
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.9"
                                d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0Z"
                                fill="#373535"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.066 11.0007L6.79418 7.72894C6.53605 7.47081 6.53605 7.05231 6.79418 6.79418C7.05231 6.53605 7.47081 6.53605 7.72893 6.79418L11.0007 10.066L14.2713 6.79543C14.5294 6.53731 14.9479 6.53731 15.206 6.79543C15.4641 7.05356 15.4641 7.47206 15.206 7.73019L11.9355 11.0007L15.207 14.2722C15.4651 14.5304 15.4651 14.9489 15.207 15.207C14.9489 15.4651 14.5304 15.4651 14.2722 15.207L11.0007 11.9355L7.72796 15.2082C7.46983 15.4664 7.05133 15.4664 6.7932 15.2082C6.53508 14.9501 6.53508 14.5316 6.7932 14.2735L10.066 11.0007Z"
                                fill="white"
                            />
                        </svg>
                    </i>
                </div>
            )}

            <nav
                id="site-navigation"
                className="main-navigation"
                role="navigation"
            >
                <button className="menu-toggle">
                    <span className="close-icon">
                        <i className="fas fa-times"></i>
                    </span>
                    <StyledBurger open={open} onClick={BurgerMenuSet}>
                        <div />
                        <div />
                        <div />
                    </StyledBurger>
                    <span className=" screen-reader-text">Menu</span>
                </button>
                <div
                    className={
                        open
                            ? 'handheld-navigation'
                            : 'handheld-navigation handheld-navigation_close'
                    }
                >
                    <span onClick={BurgerMenuSet} className="phm-close">
                        Bağla
                    </span>
                    <ul id="menu-food-menu" className="menu">
                        <li
                            id="menu-item-557"
                            className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-557"
                        >
                            <Link to="/contacts" onClick={BurgerMenuSet}>
                                Əlaqə
                            </Link>
                        </li>
                        <li
                            id="menu-item-559"
                            className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-559"
                        >
                            <Link to="/stock" onClick={BurgerMenuSet}>
                                Aksiya
                            </Link>
                        </li>
                        <li
                            id="menu-item-647"
                            className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-560"
                        >
                            <a href="#">Basir</a>
                            <ul className="sub-menu2">
                                <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                    <Link
                                        to="/products"
                                        onClick={BurgerMenuSet}
                                    >
                                        Products created
                                    </Link>
                                </li>
                                <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                    <Link
                                        to="/orderhistory"
                                        onClick={BurgerMenuSet}
                                    >
                                        orderhistory
                                    </Link>
                                </li>
                                <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                    <Link to="/" onClick={signoutHandler}>
                                        signout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="primary-navigation">
                    <ul id="menu-main-menu" className="menu nav-menu">
                        <li
                            id="menu-item-617"
                            className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item current_page_item menu-item-617"
                        >
                            <Link to="/contacts">Əlaqə</Link>
                        </li>
                        <li
                            id="menu-item-618"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-619"
                        >
                            <Link to="/stock">Aksiya</Link>
                        </li>
                        <li
                            id="menu-item-619"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-619"
                        >
                            <span>
                                <i class="lakub_derza_timan"></i>
                                <span
                                    class="lakub_derza_timan2"
                                    onClick={cameraLink}
                                >
                                    Live
                                </span>
                            </span>
                        </li>

                        {userInfo && userInfo.isAdmin ? (
                            <li
                                id="menu-item-647"
                                className="menu-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-618"
                            >
                                <Link to="#">{userInfo.name}</Link>

                                <ul className="sub-menu">
                                    <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                        <Link to="/products">
                                            Products created
                                        </Link>
                                    </li>
                                    <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                        <Link to="/orderhistory">
                                            Orderhistory
                                        </Link>
                                    </li>
                                    <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                        <Link to="/" onClick={signoutHandler}>
                                            signout
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        ) : userInfo && !userInfo.isAdmin ? (
                            <li
                                id="menu-item-647"
                                className="menu-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-618"
                            >
                                <Link to="#">{userInfo.name}</Link>

                                <ul className="sub-menu">
                                    <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                        <Link to="/orderhistory">
                                            Alış veriş tarixi
                                        </Link>
                                    </li>
                                    <li className="nav-title menu-item menu-item-type-custom menu-item-object-custom menu-item-572">
                                        <Link to="/" onClick={signoutHandler}>
                                            Signout
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li
                                id="menu-item-647"
                                className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-557"
                            >
                                <Link to="/signin">Daxil ol</Link>
                            </li>
                        )}
                    </ul>
                </div>{' '}
            </nav>
        </div>
    );
};

export default MainMenu;
