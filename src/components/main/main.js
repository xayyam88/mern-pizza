/* eslint-disable no-octal-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import ProductList from './product-list';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions.js';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';

const Main = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { category, sortBy } = useSelector((state) => state.filters);
    const [visibleSliderDetail, setVisibleSliderDetail] = React.useState(false);

    const _id = '603cb30b062664394867569d';
    const _id2 = '603fdb5a172c073ae04687e1';
    const _id3 = '603cb6bb062664394867569e';
    const _id4 = '604c9e0ecc8f4218dc36a45b';
    const _id5 = '604faffd4302ec02f07aa9e7';
    const _id6 = '604e681d860f8e05b0ceb7a4';
    const _id_cofe = '6053c7e54bb7fe0d0469e457';
    const _id_gril = '603cc2dbb9838c1bf0b76e9c';

    const isTabletOrMobileDevice = useMediaQuery({
        query: '(min-width: 992px)'
    });

    const [currentSlide, setCurrentSlide] = React.useState(0);

    const handleAfterChange = (index) => {
        console.log('after change', index);
        setCurrentSlide(index);
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    background: '#8c8484de none repeat scroll 0% 0%',
                    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                    borderRadius: '45px'
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <i
                onClick={onClick}
                className="fa fa-chevron-circle-left"
                style={{ fontSize: 36 }}
            />
        );
    }

    var settings = {
        dots: false,
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '10px',
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        arrows: true,
        beforeChange: function (currentSlide, nextSlide) {
            console.log('before change', currentSlide, nextSlide);
        },
        afterChange: handleAfterChange,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '20px',
                    infinite: true,
                    dots: false,
                    arrows: false,
                    initialSlide: 25
                }
            }
        ]
    };

    const showSliderDetail = () => {
        setVisibleSliderDetail(!visibleSliderDetail);
    };

    React.useEffect(() => {
        dispatch(listProducts(sortBy, category));
    }, [category, sortBy]);

    const [nav1, setNav1] = React.useState(null);
    const [nav2, setNav2] = React.useState(null);
    const slider1 = React.useRef(null);
    const slider2 = React.useRef(null);

    React.useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

    return (
        <div id="content" className="site-content" tabIndex="-1">
            <div className="col-full">
                <div className="pizzaro-sorting">
                    <div className="food-type-filter">
                        {/* <CategoriesPizza
                            activeCategory={category}
                            onClickCategory={onSelectCategory}
                            items={categoryNames}
                        />
                        <SortPizza
                            activeSortType={sortBy.type}
                            items={sortItems}
                            onClickSortType={onSelectSortType}
                        /> */}
                    </div>

                    {isTabletOrMobileDevice ? (
                        <div className="tiles">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="banner top-left">
                                        <Link
                                            to={{
                                                pathname: '/',
                                                search: `?product=${_id_gril}`,
                                                id: _id_gril
                                            }}
                                        >
                                            <div
                                                className="banner-bg"
                                                style={{
                                                    backgroundSize: 'cover',
                                                    backgroundPosition:
                                                        'center center',
                                                    backgroundImage:
                                                        'url( https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/09/2.jpg )',
                                                    height: 442
                                                }}
                                            >
                                                <div className="caption">
                                                    <h3 className="title">
                                                        GRILLED CHICKEN
                                                    </h3>
                                                    <h4 className="subtitle">
                                                        SUMMER PIZZA
                                                    </h4>
                                                    <span className="button">
                                                        HOT &amp; SPICY
                                                    </span>
                                                    <span className="condition">
                                                        <em>*</em>ONLY IN LOCAL
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="banners">
                                        <div className="row">
                                            <div className="banner col-sm-6 top-right">
                                                <Link to={'#'}>
                                                    <div
                                                        className="banner-bg"
                                                        style={{
                                                            backgroundSize:
                                                                'cover',
                                                            backgroundPosition:
                                                                'center center',
                                                            backgroundImage:
                                                                'url( https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/09/5-1.jpg )',
                                                            height: 210
                                                        }}
                                                    >
                                                        <div className="caption">
                                                            <h3 className="title">
                                                                FREE
                                                            </h3>
                                                            <h4 className="subtitle">
                                                                FRIES
                                                            </h4>
                                                            <div className="description">
                                                                for online
                                                                orders in
                                                                wendsdays
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="banner col-sm-6 top-right">
                                                <Link
                                                    to={{
                                                        pathname: '/',
                                                        search: `?product=${_id_cofe}`,
                                                        id: _id_cofe
                                                    }}
                                                >
                                                    <div
                                                        className="banner-bg"
                                                        style={{
                                                            backgroundSize:
                                                                'cover',
                                                            backgroundPosition:
                                                                'center center',
                                                            backgroundImage:
                                                                'url( https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/09/4-1.jpg )',
                                                            height: 210
                                                        }}
                                                    >
                                                        <div className="caption">
                                                            <h3 className="title">
                                                                iCED COFFEE
                                                            </h3>
                                                            <h4 className="subtitle">
                                                                SUMMERS
                                                            </h4>
                                                            <span className="condition">
                                                                <em>*</em>ONLY
                                                                IN LOCAL
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner center">
                                        <Link to={'#'}>
                                            <div
                                                className="banner-bg"
                                                style={{
                                                    backgroundSize: 'cover',
                                                    backgroundPosition:
                                                        'center center',
                                                    backgroundImage:
                                                        'url( https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/09/3-1.jpg )',
                                                    height: 210
                                                }}
                                            >
                                                <div className="caption">
                                                    <h3 className="title">
                                                        <span>ORDER</span>{' '}
                                                        ONLINE
                                                    </h3>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="slider_wrap_first">
                            <Slider {...settings}>
                                <div onClick={() => showSliderDetail()}>
                                    <img
                                        data-src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                        alt="banner"
                                        className="sc-1r7jemq-1 cRJgYg lazy loaded current"
                                        src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                    />
                                </div>
                                <div onClick={() => showSliderDetail()}>
                                    <img
                                        data-src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                        alt="banner"
                                        className="sc-1r7jemq-1 cRJgYg lazy loaded current"
                                        src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1615063943_1a6c222c93d742e9b369396d68cd129e.jpeg"
                                    />
                                </div>
                                <div onClick={() => showSliderDetail()}>
                                    <img
                                        data-src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                        alt="banner"
                                        className="sc-1r7jemq-1 cRJgYg lazy loaded current"
                                        src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1614929752_0979e8e44685413f9cca2125dcd3e702.jpeg"
                                    />
                                </div>
                            </Slider>

                            {visibleSliderDetail && (
                                <div className="slider_detail_wrap">
                                    <i
                                        class="fa fa-times-circle"
                                        onClick={() => showSliderDetail()}
                                    ></i>
                                    <Slider {...settings}>
                                        <div className="slider_detail_item">
                                            <img
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                                alt="banner"
                                                className="sc-1r7jemq-1 cRJgYg lazy loaded current"
                                                src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                            />
                                            <div className="slider_detail_h1_span">
                                                <h1>test1</h1>
                                                <span>
                                                    asdfssfdsadsasdfsfdsadsasadfasfd
                                                </span>
                                            </div>
                                            <button>Ətraflı</button>
                                        </div>
                                        <div className="slider_detail_item">
                                            <img
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                                alt="banner"
                                                className="sc-1r7jemq-1 cRJgYg lazy loaded current"
                                                src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1615063943_1a6c222c93d742e9b369396d68cd129e.jpeg"
                                            />
                                            <div className="slider_detail_h1_span">
                                                <h1>test1</h1>
                                                <span>
                                                    asdfssfdsadsasdfsfdsadsasadfasfd
                                                </span>
                                            </div>
                                            <button>Ətraflı</button>
                                        </div>
                                        <div className="slider_detail_item">
                                            <img
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1613129207_e09fd61190da469ca40bb54b7b6a7403.jpeg"
                                                alt="banner"
                                                className="sc-1r7jemq-1 cRJgYg lazy loaded current"
                                                src="https://dodopizza-a.akamaihd.net/static/Img/Banners/g_1614929752_0979e8e44685413f9cca2125dcd3e702.jpeg"
                                            />
                                            <div className="slider_detail_h1_span">
                                                <h1>test1</h1>
                                                <span>
                                                    asdfssfdsadsasdfsfdsadsasadfasfd
                                                </span>
                                            </div>
                                            <button>Ətraflı</button>
                                        </div>
                                    </Slider>
                                    <div className="count_slider">
                                        {' '}
                                        {currentSlide + 1} / {3}{' '}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <section className="sc-19ze2ur-0">
                        <h2 className="h2-header h2-header_new">
                            Yeni və məhşurlar
                        </h2>
                        <div className="rmfit6-0 kHQfFa slider-container">
                            <Slider {...settings}>
                                <Link
                                    to={{
                                        pathname: '/',
                                        search: `?product=${_id}`,
                                        id: _id
                                    }}
                                >
                                    <div className="sc-19ze2ur-2 ipyQjF">
                                        <picture
                                            className="sc-1shx3k4-0 hIRvjj sc-19ze2ur-3 jHUIhM"
                                            data-type={1}
                                        >
                                            <source
                                                data-srcset="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg 138w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_146x146.jpeg 146w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_183x183.jpeg 183w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_233x233.jpeg 233w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_292x292.jpeg 292w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_366x366.jpeg 366w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_584x584.jpeg 584w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_760x760.jpeg 760w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_1875x1875.jpeg 1875w"
                                                data-sizes="146px"
                                                sizes="146px"
                                                srcSet="/uploads\2021-03-14T15-03-22.490Z-1d1032a9-c51f-47bd-830f-49afabdc29ee.jpg"
                                            />
                                            <img
                                                alt="Цезарь"
                                                title="Цезарь"
                                                className="lazy img loaded"
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                data-ll-status="loaded"
                                            />
                                        </picture>
                                        <div className="sc-19ze2ur-4 dehhwT">
                                            <h2 className="sc-19ze2ur-5 ewCZva">
                                                Пирог-сердце
                                            </h2>
                                            <div className="sc-19ze2ur-6 guNeIV">
                                                <span className="money ">
                                                    <span className="money__value">
                                                        8.9
                                                    </span>
                                                    <span className="money__currency money__currency_on-the-right">
                                                        {' '}
                                                        ₼
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    to={{
                                        pathname: '/',
                                        search: `?product=${_id2}`,
                                        id: _id2
                                    }}
                                >
                                    <div
                                        data-index={0}
                                        className="sc-19ze2ur-2 ipyQjF"
                                    >
                                        <picture
                                            className="sc-1shx3k4-0 hIRvjj sc-19ze2ur-3 jHUIhM"
                                            data-type={1}
                                        >
                                            <source
                                                data-srcset="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg 138w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_146x146.jpeg 146w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_183x183.jpeg 183w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_233x233.jpeg 233w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_292x292.jpeg 292w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_366x366.jpeg 366w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_584x584.jpeg 584w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_760x760.jpeg 760w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_1875x1875.jpeg 1875w"
                                                data-sizes="146px"
                                                sizes="146px"
                                                srcSet="https://dodopizza-a.akamaihd.net/static/Img/Products/f478c9b611984d598bc09d7afdbd7897_292x292.jpeg"
                                            />
                                            <img
                                                alt="Цезарь"
                                                title="Цезарь"
                                                className="lazy img loaded"
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                data-ll-status="loaded"
                                            />
                                        </picture>
                                        <div className="sc-19ze2ur-4 dehhwT">
                                            <h2 className="sc-19ze2ur-5 ewCZva">
                                                Пицца из половинок
                                            </h2>
                                            <div className="sc-19ze2ur-6 guNeIV">
                                                <span className="money ">
                                                    <span className="money__value">
                                                        15
                                                    </span>
                                                    <span className="money__currency money__currency_on-the-right">
                                                        {' '}
                                                        ₼ başlayaraq
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    to={{
                                        pathname: '/',
                                        search: `?product=${_id3}`,
                                        id: _id3
                                    }}
                                >
                                    <div
                                        data-index={0}
                                        className="sc-19ze2ur-2 ipyQjF"
                                    >
                                        <picture
                                            className="sc-1shx3k4-0 hIRvjj sc-19ze2ur-3 jHUIhM"
                                            data-type={1}
                                        >
                                            <source
                                                data-srcset="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg 138w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_146x146.jpeg 146w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_183x183.jpeg 183w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_233x233.jpeg 233w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_292x292.jpeg 292w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_366x366.jpeg 366w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_584x584.jpeg 584w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_760x760.jpeg 760w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_1875x1875.jpeg 1875w"
                                                data-sizes="146px"
                                                sizes="146px"
                                                srcSet="/uploads\2021-03-14T15-25-49.552Z-2.jpeg"
                                            />
                                            <img
                                                alt="Цезарь"
                                                title="Цезарь"
                                                className="lazy img loaded"
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                src="/uploads\2021-03-14T15-25-49.552Z-2.jpeg"
                                                data-ll-status="loaded"
                                            />
                                        </picture>
                                        <div className="sc-19ze2ur-4 dehhwT">
                                            <h2 className="sc-19ze2ur-5 ewCZva">
                                                Чиззи чеддер
                                            </h2>
                                            <div className="sc-19ze2ur-6 guNeIV">
                                                <span className="money ">
                                                    <span className="money__value">
                                                        6.8
                                                    </span>
                                                    <span className="money__currency money__currency_on-the-right">
                                                        {' '}
                                                        ₼
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    to={{
                                        pathname: '/',
                                        search: `?product=${_id2}`,
                                        id: _id2
                                    }}
                                >
                                    <div
                                        data-index={0}
                                        className="sc-19ze2ur-2 ipyQjF"
                                    >
                                        <picture
                                            className="sc-1shx3k4-0 hIRvjj sc-19ze2ur-3 jHUIhM"
                                            data-type={1}
                                        >
                                            <source
                                                data-srcset="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg 138w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_146x146.jpeg 146w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_183x183.jpeg 183w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_233x233.jpeg 233w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_292x292.jpeg 292w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_366x366.jpeg 366w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_584x584.jpeg 584w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_760x760.jpeg 760w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_1875x1875.jpeg 1875w"
                                                data-sizes="146px"
                                                sizes="146px"
                                                srcSet="https://dodopizza-a.akamaihd.net/static/Img/Products/f478c9b611984d598bc09d7afdbd7897_292x292.jpeg"
                                            />
                                            <img
                                                alt="Цезарь"
                                                title="Цезарь"
                                                className="lazy img loaded"
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                data-ll-status="loaded"
                                            />
                                        </picture>
                                        <div className="sc-19ze2ur-4 dehhwT">
                                            <h2 className="sc-19ze2ur-5 ewCZva">
                                                Пицца из половинок
                                            </h2>
                                            <div className="sc-19ze2ur-6 guNeIV">
                                                <span className="money ">
                                                    <span className="money__value">
                                                        15
                                                    </span>
                                                    <span className="money__currency money__currency_on-the-right">
                                                        {' '}
                                                        ₼ başlayaraq
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link
                                    to={{
                                        pathname: '/',
                                        search: `?product=${_id3}`,
                                        id: _id3
                                    }}
                                >
                                    <div
                                        data-index={0}
                                        className="sc-19ze2ur-2 ipyQjF"
                                    >
                                        <picture
                                            className="sc-1shx3k4-0 hIRvjj sc-19ze2ur-3 jHUIhM"
                                            data-type={1}
                                        >
                                            <source
                                                data-srcset="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg 138w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_146x146.jpeg 146w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_183x183.jpeg 183w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_233x233.jpeg 233w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_292x292.jpeg 292w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_366x366.jpeg 366w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_584x584.jpeg 584w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_760x760.jpeg 760w,https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_1875x1875.jpeg 1875w"
                                                data-sizes="146px"
                                                sizes="146px"
                                                srcSet="/uploads\2021-03-14T15-25-49.552Z-2.jpeg"
                                            />
                                            <img
                                                alt="Цезарь"
                                                title="Цезарь"
                                                className="lazy img loaded"
                                                data-src="https://dodopizza-a.akamaihd.net/static/Img/Products/2e3db31b38ff4286a0325a00730d253d_138x138.jpeg"
                                                src="/uploads\2021-03-14T15-25-49.552Z-2.jpeg"
                                                data-ll-status="loaded"
                                            />
                                        </picture>
                                        <div className="sc-19ze2ur-4 dehhwT">
                                            <h2 className="sc-19ze2ur-5 ewCZva">
                                                Чиззи чеддер
                                            </h2>
                                            <div className="sc-19ze2ur-6 guNeIV">
                                                <span className="money ">
                                                    <span className="money__value">
                                                        6.8
                                                    </span>
                                                    <span className="money__currency money__currency_on-the-right">
                                                        {' '}
                                                        ₼
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Slider>
                        </div>
                    </section>
                </div>

                <div id="primary" className="content-area">
                    <main id="main" className="site-main" role="main">
                        <ProductList
                            productList={productList}
                            isTabletOrMobileDevice={isTabletOrMobileDevice}
                        />
                    </main>
                </div>

                <div
                    className="section-product"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundImage:
                            'url( https://demo2.chethemes.com/pizzaro/wp-content/uploads/2016/09/01-HomePage.png )',
                        height: 556
                    }}
                >
                    <div className="product-wrapper">
                        <div className="product-inner">
                            <a
                                href="https://demo2.chethemes.com/pizzaro/product/pepperoni-pizza/"
                                className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                            >
                                <h2 className="woocommerce-loop-product__title">
                                    Peperoni pizza
                                </h2>
                                <div className="woocommerce-product-details__short-description">
                                    <p>
                                        Extra-virgin olive oil, garlic,
                                        mozzarella cheese, onions, mushrooms,
                                        green olives, black olives, fresh
                                        tomatoes.
                                    </p>
                                </div>
                            </a>

                            <Link
                                to={{
                                    pathname: '/',
                                    search: `?product=${_id3}`,
                                    id: _id3
                                }}
                                className="button"
                            >
                                <i className="fa fa-check-circle"></i> Daha
                                ətraflı
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="features-list">
                    <div className="row">
                        <div className="feature col-xs-12 col-sm-3">
                            <div className="feature-icon">
                                <i className="fa fa-shopping-basket" />
                            </div>
                            <div className="feature-label">
                                <h4>Keyfiyyət</h4>
                                <p>
                                    Praesent pulvinar neque pellentesque mattis
                                    pretium.
                                </p>
                            </div>
                        </div>
                        <div className="feature col-xs-12 col-sm-3">
                            <div className="feature-icon">
                                <i class="fa fa-history"></i>
                            </div>
                            <div className="feature-label">
                                <h4>Vaxtında çatdırılma</h4>
                                <p>
                                    Praesent pulvinar neque pellentesque mattis
                                    pretium.
                                </p>
                            </div>
                        </div>
                        <div className="feature col-xs-12 col-sm-3">
                            <div className="feature-icon">
                                <i
                                    class="fa fa-thumbs-o-up"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            <div className="feature-label">
                                <h4>Təcrübəli aşbazlar</h4>
                                <p>
                                    Praesent pulvinar neque pellentesque mattis
                                    pretium.
                                </p>
                            </div>
                        </div>
                        <div className="feature col-xs-12 col-sm-3">
                            <div className="feature-icon">
                                <i class="fa fa-cutlery" aria-hidden="true"></i>
                            </div>
                            <div className="feature-label">
                                <h4>Ləziz taamlar</h4>
                                <p>
                                    Praesent pulvinar neque pellentesque mattis
                                    pretium.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
