/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react';

import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';

import { detailsProduct } from '../redux/actions/productActions.js';
import classNames from 'classnames';
import data from './../data';
import PropTypes, { func } from 'prop-types';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { useMediaQuery } from 'react-responsive';
import 'animate.css/animate.min.css';

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const productId = props.location.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { error, product, loading } = productDetails;
    const { totalPrice, totalCount } = useSelector(({ cart }) => cart);

    const [visibleInfo, setVisibleInfo] = React.useState(false);
    const [addButtonActive, setAddButtonActive] = React.useState(true);

    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    // hover
    const [
        productForhalveedAdditive,
        setProductForhalveedAdditive
    ] = React.useState([]);

    const [clicked, setClicked] = React.useState(false);
    const [clicked2, setClicked2] = React.useState(false);

    const [rightTemp, setRightTemp] = React.useState({
        name: 'Выберите правую половинку',
        imageUrl:
            'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
        price: '',
        descPizz: '',
        types: '',
        description: '',
        isCompletedRight: false
    });
    const [leftTemp, setLeftTemp] = React.useState({
        name: 'Выберите левую половинку',
        imageUrl:
            'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
        price: '',
        descPizz: [],
        types: '',
        description: '',
        isCompletedLeft: false
    });

    const productForhalveedSelect = (e, id) => {
        // selectActiveHover

        const element = productForhalveedAdditive.findIndex(
            (elem) => elem._id === id
        );

        if (!clicked) {
            setClicked(true);
            const newTaskList = [...productForhalveedAdditive];
            // console.log([newTaskList]);
            newTaskList[element] = {
                ...newTaskList[element],
                visibleLeftAdd: true
            };

            newTaskList.map(
                (newTaskLeft) =>
                    newTaskLeft.visibleLeftAdd &&
                    setRightTemp({
                        name: newTaskLeft.name,
                        imageUrl: newTaskLeft.imageUrl,
                        descPizz: newTaskLeft.descPizz,
                        price: newTaskLeft.price,
                        description: newTaskLeft.description,
                        types: newTaskLeft.types,
                        isCompletedRight: true
                    })
            );

            setProductForhalveedAdditive(newTaskList);
        } else if (clicked && !clicked2) {
            setClicked2(true);
            const newTaskList = [...productForhalveedAdditive];
            newTaskList[element] = {
                ...newTaskList[element],
                visibleRightAdd: true
            };

            newTaskList.map(
                (newTaskLeft) =>
                    newTaskLeft.visibleRightAdd &&
                    setLeftTemp({
                        name: newTaskLeft.name,
                        imageUrl: newTaskLeft.imageUrl,
                        descPizz: newTaskLeft.descPizz,
                        description: newTaskLeft.description,
                        types: newTaskLeft.types,
                        price: newTaskLeft.price,
                        isCompletedLeft: true
                    })
            );

            setProductForhalveedAdditive(newTaskList);
        } else if (clicked && clicked) {
            productForhalveedAdditive.map((productForhalveed, index) => {
                productForhalveed.visibleLeftAdd = false;
                productForhalveed.visibleRightAdd = false;

                productForhalveed.visibleLeftAdd === false &&
                    setLeftTemp({
                        name: 'Выберите левую половинку',
                        imageUrl:
                            'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
                        descPizz: '',
                        description: '',
                        isCompletedLeft: false
                    });
                productForhalveed.visibleRightAdd === false &&
                    setRightTemp({
                        name: 'Выберите правую половинку',
                        imageUrl:
                            'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
                        descPizz: '',
                        description: '',
                        isCompletedRight: false
                    });
            });

            setClicked(false);
            setClicked2(false);
        }
    };

    const [activeType, setActiveType] = React.useState(0);
    const [activeType2, setActiveType2] = React.useState(0);

    function activeTypeFunction() {
        setActiveType2(1);
    }

    function activeTypeFunction2() {
        setActiveType2(0);
    }

    const onSelectType = (index) => {
        setActiveType(index);
    };

    const sortRef = React.useRef();
    const toggleVisibleInfo = () => {
        setVisibleInfo(!visibleInfo);
    };

    const handleOutsideClick = (e) => {
        if (e.target !== sortRef.current) {
            setVisibleInfo(false);
        }
    };

    // hover
    const [productsAdditiveSave, setProductsAdditiveSave] = React.useState(
        data.productsAdditive
    );

    const productsAdditivePluse = (sum) => {
        var arr = productsAdditiveSave;
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].visibleAdd === true) {
                sum = sum + parseInt(arr[i].price);
            }
        }
        return sum;
    };

    const onAddProduct = () => {
        let arr = productsAdditiveSave;
        let sum = 0;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].visibleAdd === true) {
                sum = sum + parseInt(arr[i].price);
            }
        }

        const productsAdditiveName2 = productsAdditiveSave.map((obj) => {
            return obj.visibleAdd === true ? ` ${obj.label}` : '';
        });

        const productsAdditiveName = productsAdditiveName2.filter(
            (obj) => obj !== ''
        );

        const obj = {
            name: !leftTemp.isCompletedLeft
                ? product.name
                : `${leftTemp.name} + ${rightTemp.name}`,
            price: leftTemp.isCompletedLeft
                ? leftTemp.price + rightTemp.price
                : (product.sizes[activeSize] === 26
                      ? product.price
                      : product.sizes[activeSize] === 30 &&
                        product.sizes.length === 3
                      ? product.price + 30
                      : product.sizes[activeSize] === 40 &&
                        product.sizes.length === 3
                      ? product.price + 40
                      : product.price) + sum,
            id: productId,
            productsAdditiveName: productsAdditiveName,
            img: product.imageUrl,
            size: !leftTemp.isCompletedLeft ? product.sizes[activeSize] : 35,
            type: !leftTemp.isCompletedLeft
                ? product.types[activeType]
                : activeType2
        };

        function CartNotification() {
            return (
                <div className="cart-notification_wrap">
                    <h1>{product.name}</h1>
                    <span>Sebete elave olundu</span>
                </div>
            );
        }

        store.addNotification({
            content: CartNotification,
            message: 'Sebete elave olundu',
            container: 'top-left',
            isMobile: true,
            breakpoint: 700,
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
                duration: 1500,
                pauseOnHover: true
            }
        });

        setAddButtonActive(false);

        dispatch(
            { type: 'ADD_PIZZA_CART', payload: obj },

            setTimeout(function () {
                props.history.push(props.location.pathname);
                productsAdditiveSave.map((prodAdd, index) => {
                    prodAdd.visibleAdd = false;
                });

                productForhalveedAdditive.map((productForhalveed, index) => {
                    productForhalveed.visibleLeftAdd = false;
                    productForhalveed.visibleRightAdd = false;

                    productForhalveed.visibleLeftAdd === false &&
                        setLeftTemp({
                            name: 'Sol tərəfi seçin',
                            imageUrl:
                                'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
                            descPizz: '',
                            description: '',
                            isCompletedLeft: false
                        });
                    productForhalveed.visibleRightAdd === false &&
                        setRightTemp({
                            name: 'Sağ tərəfi seçin',
                            imageUrl:
                                'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
                            descPizz: '',
                            description: '',
                            isCompletedRight: false
                        });
                });
                setActiveType2(0);
                setClicked(false);
                setClicked2(false);
                setActiveType(0);
                setActiveSize(0);
                setVisibleDesc(false);
                setAddButtonActive(true);
            }, 2500)
        );
    };

    const selectActiveHoverDelete = (e, id) => {
        //let's find index of element
        const element = productsAdditiveSave.findIndex(
            (elem) => elem._id == id
        );

        //copy array into new variable
        const newTaskList = [...productsAdditiveSave];

        //edit our element
        newTaskList[element] = {
            ...newTaskList[element],
            visibleAdd: false
        };

        setProductsAdditiveSave(newTaskList);
    };

    const selectActiveHover = (e, id) => {
        //let's find index of element
        const element = productsAdditiveSave.findIndex(
            (elem) => elem._id == id
        );

        //copy array into new variable

        const newTaskList = [...productsAdditiveSave];
        newTaskList[element] = {
            ...newTaskList[element],
            visibleAdd: true
        };

        setProductsAdditiveSave(newTaskList);
    };
    // hover

    const [visibleDesc, setVisibleDesc] = React.useState();

    const selectDisableActive = (e, index) => {
        setVisibleDesc(index, !visibleDesc);
    };

    const [activeSize, setActiveSize] = React.useState(0);
    const onSelectSize = (index) => {
        setActiveSize(index);
    };

    const closeModalFunc = () => {
        props.history.push(props.location.pathname);
        productsAdditiveSave.map((prodAdd, index) => {
            prodAdd.visibleAdd = false;
        });

        productForhalveedAdditive.map((productForhalveed, index) => {
            productForhalveed.visibleLeftAdd = false;
            productForhalveed.visibleRightAdd = false;

            productForhalveed.visibleLeftAdd === false &&
                setLeftTemp({
                    name: 'Sol tərəfi seçin',
                    imageUrl:
                        'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
                    descPizz: '',
                    description: '',
                    isCompletedLeft: false
                });
            productForhalveed.visibleRightAdd === false &&
                setRightTemp({
                    name: 'Sağ tərəfi seçin',
                    imageUrl:
                        'https://dodopizza-a.akamaihd.net/site-static/dist/fdb09565b56cb9ae35ac.svg',
                    descPizz: '',
                    description: '',
                    isCompletedRight: false
                });
        });
        setActiveType2(0);
        setClicked(false);
        setClicked2(false);
        setActiveType(0);
        setActiveSize(0);
        setVisibleDesc(false);
        setAddButtonActive(true);
    };

    const isTabletOrMobileDevice = useMediaQuery({
        query: '(min-width: 772px)'
    });

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    React.useEffect(() => {
        dispatch(detailsProduct(productId));
        setProductForhalveedAdditive(products);
    }, [dispatch, productId, products]);

    if (product !== undefined) {
        return (
            <div>
                {productId !== undefined && (
                    <Modal onClick={(e) => console.log(e)} key={productId}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                        >
                            <div className="modal-container-body">
                                <ReactNotification />
                                <div
                                    onClick={(e) =>
                                        (e.target.className ===
                                            'fa fa-angle-down' ||
                                            e.target.className ===
                                                'fa fa-times') &&
                                        closeModalFunc(e)
                                    }
                                    className="modal-close-button"
                                    key={productId}
                                >
                                    {isTabletOrMobileDevice ? (
                                        <i className="fa fa-times"></i>
                                    ) : (
                                        <i className="fa fa-angle-down"></i>
                                    )}
                                </div>
                                {product.halveedCheckout === true ? (
                                    <div className="modal-container-body-wrap">
                                        <div className="sc-1aajm7d-0 hGPgkU">
                                            <div className="sc-1aajm7d-1 hVpeDt">
                                                <div className="s11itg-0 cPTwiN scroll">
                                                    <div
                                                        style={{
                                                            position:
                                                                'relative',
                                                            overflow: 'hidden',
                                                            width: '100%',
                                                            height: '100%'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                inset: 0,
                                                                overflow:
                                                                    'scroll',
                                                                marginRight:
                                                                    '-17px',
                                                                marginBottom:
                                                                    '-17px'
                                                            }}
                                                        >
                                                            <div className="sc-6x49ya-0 kXQcDK">
                                                                <div className="sc-6x49ya-1 gHnskb">
                                                                    Sağ və sol
                                                                    hissələr
                                                                    üçün pizzanı
                                                                    seçin
                                                                </div>

                                                                {productForhalveedAdditive.map(
                                                                    (
                                                                        productForhalveed,
                                                                        index
                                                                    ) =>
                                                                        product.productsListSave.map(
                                                                            (
                                                                                productsList
                                                                            ) =>
                                                                                productsList ===
                                                                                    productForhalveed.name &&
                                                                                productForhalveed._id !==
                                                                                    '603fdb5a172c073ae04687e1' && (
                                                                                    <div
                                                                                        className={`sc-6x49ya-2 hSRdGm`}
                                                                                        key={
                                                                                            productForhalveed._id
                                                                                        }
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            productForhalveedSelect(
                                                                                                e,
                                                                                                productForhalveed._id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <div
                                                                                            className={`sc-6x49ya-3 iLjtrw ${
                                                                                                productForhalveed.visibleLeftAdd
                                                                                                    ? ' sc-6x49ya-4_hover'
                                                                                                    : ''
                                                                                            }
                                                                                ${
                                                                                    productForhalveed.visibleRightAdd
                                                                                        ? ' sc-6x49ya-4_hover'
                                                                                        : ''
                                                                                }
                                                                                
                                                                                `}
                                                                                        >
                                                                                            <img
                                                                                                src={
                                                                                                    productForhalveed.imageUrl
                                                                                                }
                                                                                                alt={
                                                                                                    productForhalveed.name
                                                                                                }
                                                                                                title={
                                                                                                    productForhalveed.name
                                                                                                }
                                                                                                className="sc-6x49ya-4 kGYe"
                                                                                            />

                                                                                            {productForhalveed.visibleLeftAdd ? (
                                                                                                <div class="sc-6x49ya-5 gZdGdr"></div>
                                                                                            ) : (
                                                                                                ''
                                                                                            )}
                                                                                            {productForhalveed.visibleRightAdd ? (
                                                                                                <div class="sc-6x49ya-5 gZdGdr gZdGdright"></div>
                                                                                            ) : (
                                                                                                ''
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="sc-6x49ya-6 jtAlmo">
                                                                                            <div className="sc-6x49ya-7 fcXASF">
                                                                                                {
                                                                                                    productForhalveed.name
                                                                                                }
                                                                                            </div>
                                                                                            <span className="money ">
                                                                                                <span className="money__value">
                                                                                                    {productForhalveed.price.toFixed(
                                                                                                        2
                                                                                                    )}{' '}
                                                                                                    ₼
                                                                                                </span>
                                                                                                <span className="money__currency money__currency_on-the-right"></span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                        )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                height: 6,
                                                                right: 2,
                                                                bottom: 2,
                                                                left: 2,
                                                                borderRadius: 3,
                                                                visibility:
                                                                    'hidden'
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                    display:
                                                                        'block',
                                                                    height:
                                                                        '100%',
                                                                    cursor:
                                                                        'pointer',
                                                                    borderRadius:
                                                                        'inherit',
                                                                    backgroundColor:
                                                                        'rgba(0, 0, 0, 0.2)',
                                                                    width: 0,
                                                                    transform:
                                                                        'translateX(0px)'
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                width: 6,
                                                                right: 2,
                                                                bottom: 2,
                                                                top: 2,
                                                                borderRadius: 3,
                                                                visibility:
                                                                    'visible'
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                    display:
                                                                        'block',
                                                                    width:
                                                                        '100%',
                                                                    height: 286,
                                                                    transform:
                                                                        'translateY(0px)'
                                                                }}
                                                                className="scroll__scrollbar"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sc-1aajm7d-2 esVBuu">
                                                <div className="sc-1aajm7d-3 eHvzMT">
                                                    <img
                                                        src="https://dodopizza-a.akamaihd.net/site-static/dist/c6707f17b454b0af1283.svg"
                                                        className="sc-1aajm7d-4 bFsDms"
                                                    />

                                                    {leftTemp.isCompletedLeft && (
                                                        <div className="sc-1aajm7d-5 kByizX">
                                                            <div>
                                                                <div className="yzwcys-0 hfXxjD mount-animation-enter-done">
                                                                    <picture className="sc-1shx3k4-0 hIRvjj">
                                                                        <source
                                                                            srcSet={
                                                                                leftTemp.imageUrl
                                                                            }
                                                                            sizes="256px"
                                                                        />
                                                                        <img
                                                                            alt="Додо"
                                                                            title="Додо"
                                                                            className="img"
                                                                            src={
                                                                                leftTemp.imageUrl
                                                                            }
                                                                        />
                                                                    </picture>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rightTemp.isCompletedRight && (
                                                        <div className="sc-1aajm7d-5 iMUGnG">
                                                            <div>
                                                                <div className="yzwcys-0 hfXxjD mount-animation-enter-done">
                                                                    <picture className="sc-1shx3k4-0 hIRvjj">
                                                                        <source
                                                                            srcSet={
                                                                                rightTemp.imageUrl
                                                                            }
                                                                            sizes="256px"
                                                                        />
                                                                        <img
                                                                            alt="Маргарита"
                                                                            title="Маргарита"
                                                                            className="img"
                                                                            src={
                                                                                rightTemp.imageUrl
                                                                            }
                                                                        />
                                                                    </picture>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="sc-1aajm7d-6 jGUHUO">
                                                    <div>
                                                        <div className="yzwcys-0 hfXxjD">
                                                            <div className="sc-1aajm7d-7 jECjRn">
                                                                <div className="sc-1aajm7d-8 jqHwOE">
                                                                    <img
                                                                        src={
                                                                            rightTemp.imageUrl
                                                                        }
                                                                        className="sc-1aajm7d-9 jFhvhd"
                                                                    />
                                                                    {rightTemp.isCompletedRight && (
                                                                        <div class="sc-6x49ya-5 gZdGdr"></div>
                                                                    )}
                                                                </div>

                                                                {rightTemp.isCompletedRight ? (
                                                                    <div className="sc-1aajm7d-11 jygkHs">
                                                                        <div className="sc-1aajm7d-12 kfHoIW">
                                                                            <span>
                                                                                {
                                                                                    rightTemp.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="sc-1hrv7kf-0 sc-1hrv7kf-01 fjjoGc">
                                                                            {
                                                                                rightTemp.description
                                                                            }
                                                                            ,
                                                                            {rightTemp.descPizz.map(
                                                                                (
                                                                                    descPizzaRight
                                                                                ) => (
                                                                                    <button
                                                                                        data-testid="product__option"
                                                                                        type="button"
                                                                                        className="sc-1hrv7kf-3 dhaJEk "
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                descPizzaRight.label
                                                                                            }
                                                                                        </span>
                                                                                        <i className="sc-1lk7lib-0 lmohzF svg-icon">
                                                                                            <svg
                                                                                                width={
                                                                                                    14
                                                                                                }
                                                                                                height={
                                                                                                    14
                                                                                                }
                                                                                                viewBox="0 0 14 14"
                                                                                                fill="none"
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                            >
                                                                                                <circle
                                                                                                    cx={
                                                                                                        7
                                                                                                    }
                                                                                                    cy={
                                                                                                        7
                                                                                                    }
                                                                                                    r="6.6"
                                                                                                    stroke="#737272"
                                                                                                    strokeWidth="0.8"
                                                                                                />
                                                                                                <path
                                                                                                    d="M5 5L9 9"
                                                                                                    stroke="#737272"
                                                                                                    strokeWidth="1.2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                />
                                                                                                <path
                                                                                                    d="M9 5L5 9"
                                                                                                    stroke="#737272"
                                                                                                    strokeWidth="1.2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                />
                                                                                            </svg>
                                                                                        </i>
                                                                                    </button>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="sc-1aajm7d-12 kfHoIW">
                                                                        Выберите
                                                                        правую
                                                                        половинку
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="sc-1aajm7d-7 kVkCfA">
                                                            <div className="sc-1aajm7d-8 jqHwOE">
                                                                <img
                                                                    src={
                                                                        leftTemp.imageUrl
                                                                    }
                                                                    className="sc-1aajm7d-9 jFhvhd"
                                                                />
                                                                {leftTemp.isCompletedLeft && (
                                                                    <div class="sc-6x49ya-5 gZdGdr gZdGdright"></div>
                                                                )}
                                                            </div>
                                                            <div className="sc-1aajm7d-11 jygkHs">
                                                                {leftTemp.isCompletedLeft ? (
                                                                    <div className="sc-1aajm7d-11 jygkHs">
                                                                        <div className="sc-1aajm7d-12 kfHoIW">
                                                                            <span>
                                                                                {
                                                                                    leftTemp.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        <div className="sc-1hrv7kf-0 sc-1hrv7kf-01 fjjoGc">
                                                                            {
                                                                                leftTemp.description
                                                                            }
                                                                            ,
                                                                            {leftTemp.descPizz.map(
                                                                                (
                                                                                    descPizzaLeft
                                                                                ) => (
                                                                                    <button
                                                                                        data-testid="product__option"
                                                                                        type="button"
                                                                                        className="sc-1hrv7kf-3 dhaJEk "
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                descPizzaLeft.label
                                                                                            }
                                                                                        </span>
                                                                                        <i className="sc-1lk7lib-0 lmohzF svg-icon">
                                                                                            <svg
                                                                                                width={
                                                                                                    14
                                                                                                }
                                                                                                height={
                                                                                                    14
                                                                                                }
                                                                                                viewBox="0 0 14 14"
                                                                                                fill="none"
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                            >
                                                                                                <circle
                                                                                                    cx={
                                                                                                        7
                                                                                                    }
                                                                                                    cy={
                                                                                                        7
                                                                                                    }
                                                                                                    r="6.6"
                                                                                                    stroke="#737272"
                                                                                                    strokeWidth="0.8"
                                                                                                />
                                                                                                <path
                                                                                                    d="M5 5L9 9"
                                                                                                    stroke="#737272"
                                                                                                    strokeWidth="1.2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                />
                                                                                                <path
                                                                                                    d="M9 5L5 9"
                                                                                                    stroke="#737272"
                                                                                                    strokeWidth="1.2"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                />
                                                                                            </svg>
                                                                                        </i>
                                                                                    </button>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="sc-1aajm7d-12 kfHoIW">
                                                                        {
                                                                            leftTemp.name
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="sc-1aajm7d-14 iCWDlx">
                                                            <div className="z6jeag-0 cMRQsd">
                                                                <div
                                                                    width={0}
                                                                    offset={0}
                                                                    className="z6jeag-1 dkJOqZ"
                                                                />
                                                                <input
                                                                    type="radio"
                                                                    id="b5ddcb3c-b138-4af4-ba1e-75f563be59693"
                                                                    name="size_159"
                                                                    className="z6jeag-3 fVopZC"
                                                                    defaultValue={
                                                                        3
                                                                    }
                                                                    defaultChecked
                                                                />
                                                                <label
                                                                    data-testid="menu__pizza_size_3"
                                                                    htmlFor="b5ddcb3c-b138-4af4-ba1e-75f563be59693"
                                                                    className="z6jeag-2 fyMkxq"
                                                                >
                                                                    Большая
                                                                    35&nbsp;см
                                                                </label>
                                                            </div>

                                                            <div className="z6jeag-0 kxKIyD">
                                                                <div className="z6jeag-1 dFUnpu" />

                                                                <input
                                                                    name="size_20"
                                                                    className="z6jeag-3 fCKLTk"
                                                                />
                                                                <label
                                                                    className={`z6jeag-2 eMiiQc ${
                                                                        activeType2 ===
                                                                        0
                                                                            ? 'eMiiQc-active'
                                                                            : ''
                                                                    }`}
                                                                    onClick={() =>
                                                                        activeTypeFunction2()
                                                                    }
                                                                >
                                                                    Традиционное
                                                                </label>
                                                                <input
                                                                    name="size_20"
                                                                    className="z6jeag-3 fCKLTk"
                                                                />
                                                                <label
                                                                    className={`z6jeag-2 eMiiQc ${
                                                                        activeType2 ===
                                                                        1
                                                                            ? 'eMiiQc-active'
                                                                            : ''
                                                                    }`}
                                                                    onClick={() =>
                                                                        activeTypeFunction()
                                                                    }
                                                                >
                                                                    Тонкое
                                                                </label>
                                                            </div>

                                                            <div className="sc-1aajm7d-15 iPUJis">
                                                                {!leftTemp.isCompletedLeft ? (
                                                                    <button
                                                                        type="button"
                                                                        className="sc-91ilwk-0 hmteXa sc-15fdqut-21 CBDaq"
                                                                    >
                                                                        В
                                                                        корзину
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        type="button"
                                                                        className="sc-91ilwk-0 hmteXa sc-15fdqut-21 CBDaq"
                                                                        onClick={
                                                                            onAddProduct
                                                                        }
                                                                        disabled={
                                                                            !addButtonActive
                                                                                ? 'disabled'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        {(
                                                                            rightTemp.price +
                                                                            leftTemp.price
                                                                        ).toFixed(
                                                                            2
                                                                        )}{' '}
                                                                        ₼
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            product.imageSize.length === 0
                                                ? 'modal-container-body-wrap modal-container-body-wrap2'
                                                : 'modal-container-body-wrap'
                                        }
                                    >
                                        <div className="modal-container-body_left">
                                            <div className="sc-15fdqut-1 eKgwVM">
                                                {product.imageSize.length ===
                                                0 ? (
                                                    <div className="sc-15fdqut-2 fVbNEP">
                                                        <img
                                                            data-src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg"
                                                            src={
                                                                product.imageUrl
                                                            }
                                                            className="sc-1shx3k4-0 kHJKlH lazy undefined loaded"
                                                            alt="Пепперони"
                                                            title="Пепперони"
                                                            type={1}
                                                            data-ll-status="loaded"
                                                        />
                                                    </div>
                                                ) : (
                                                    product.sizes.map(
                                                        (size, index) =>
                                                            activeSize ===
                                                                index &&
                                                            size === 26 ? (
                                                                <div>
                                                                    <div className="sc-15fdqut-2 fVbNEP">
                                                                        <img
                                                                            data-src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg"
                                                                            src={
                                                                                product.imageUrl
                                                                            }
                                                                            className="sc-1shx3k4-0 kHJKlH lazy undefined loaded"
                                                                            alt="Пепперони"
                                                                            title="Пепперони"
                                                                            type={
                                                                                1
                                                                            }
                                                                            data-ll-status="loaded"
                                                                        />
                                                                    </div>

                                                                    <div className="sc-15fdqut-3 sc-15fdqut-4 sSweh">
                                                                        <i className="sc-1lk7lib-0 lmohzF svg-icon">
                                                                            <svg
                                                                                width={
                                                                                    382
                                                                                }
                                                                                height={
                                                                                    382
                                                                                }
                                                                                viewBox="0 0 382 382"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <circle
                                                                                    cx={
                                                                                        191
                                                                                    }
                                                                                    cy={
                                                                                        191
                                                                                    }
                                                                                    r={
                                                                                        190
                                                                                    }
                                                                                    stroke="#6F6E6F"
                                                                                    strokeWidth="0.6"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeDasharray="1 6.1"
                                                                                />
                                                                            </svg>
                                                                        </i>
                                                                    </div>

                                                                    <div className="sc-15fdqut-3 sc-15fdqut-5 lnSDsE">
                                                                        <i className="sc-1lk7lib-0 lmohzF svg-icon">
                                                                            <svg
                                                                                width={
                                                                                    450
                                                                                }
                                                                                height={
                                                                                    450
                                                                                }
                                                                                viewBox="0 0 450 450"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <ellipse
                                                                                    opacity="0.6"
                                                                                    cx={
                                                                                        225
                                                                                    }
                                                                                    cy={
                                                                                        225
                                                                                    }
                                                                                    rx={
                                                                                        224
                                                                                    }
                                                                                    ry={
                                                                                        224
                                                                                    }
                                                                                    stroke="#6F6E6F"
                                                                                    strokeWidth="0.8"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeDasharray="2 12.2"
                                                                                />
                                                                            </svg>
                                                                        </i>
                                                                    </div>
                                                                </div>
                                                            ) : activeSize ===
                                                                  index &&
                                                              size === 30 ? (
                                                                <div>
                                                                    <div className="sc-15fdqut-2 jqDVHY">
                                                                        <img
                                                                            src={
                                                                                activeType ===
                                                                                0
                                                                                    ? product
                                                                                          .imageSize[0]
                                                                                    : product
                                                                                          .imageSize[2]
                                                                            }
                                                                            className="sc-1shx3k4-0 kHJKlH lazy undefined loaded"
                                                                            alt="Пепперони"
                                                                            title="Пепперони"
                                                                            type={
                                                                                1
                                                                            }
                                                                            data-ll-status="loaded"
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            product
                                                                                .imageSize
                                                                                .length >
                                                                            0
                                                                                ? 'sc-15fdqut-3 sc-15fdqut-5 lnSDsE'
                                                                                : 'sc-15fdqut-3 sc-15fdqut-5 lnSDsE'
                                                                        }
                                                                    >
                                                                        <i className="sc-1lk7lib-0 lmohzF svg-icon">
                                                                            <svg
                                                                                width={
                                                                                    450
                                                                                }
                                                                                height={
                                                                                    450
                                                                                }
                                                                                viewBox="0 0 450 450"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <ellipse
                                                                                    opacity="0.6"
                                                                                    cx={
                                                                                        225
                                                                                    }
                                                                                    cy={
                                                                                        225
                                                                                    }
                                                                                    rx={
                                                                                        224
                                                                                    }
                                                                                    ry={
                                                                                        224
                                                                                    }
                                                                                    stroke="#6F6E6F"
                                                                                    strokeWidth="0.8"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeDasharray="2 12.2"
                                                                                />
                                                                            </svg>
                                                                        </i>
                                                                    </div>
                                                                </div>
                                                            ) : activeSize ===
                                                                  index &&
                                                              size === 40 ? (
                                                                <>
                                                                    <div className="sc-15fdqut-2 bNVHut">
                                                                        <img
                                                                            src={
                                                                                activeType ===
                                                                                0
                                                                                    ? product
                                                                                          .imageSize[1]
                                                                                    : product
                                                                                          .imageSize[3]
                                                                            }
                                                                            className="sc-1shx3k4-0 kHJKlH lazy undefined loaded"
                                                                            alt="Пепперони"
                                                                            title="Пепперони"
                                                                            type={
                                                                                1
                                                                            }
                                                                            data-ll-status="loaded"
                                                                        />
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                ''
                                                            )
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="modal-container-body_right">
                                            <div className="modal-container-body_right-top hoRzRV kvCIeb">
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: '0px',
                                                        overflowX: 'scroll',

                                                        marginBottom: '-17px',
                                                        paddingBottom: '3px'
                                                    }}
                                                >
                                                    <div className="sc-15fdqut-10 jYZoPo">
                                                        <h1
                                                            itemProp="name"
                                                            className="product_title entry-title"
                                                        >
                                                            {product.name}
                                                        </h1>

                                                        <div className="sc-15fdqut-12 cjpIJe">
                                                            <div className="sc-1647d85-1 bHMUr">
                                                                <button
                                                                    type="button"
                                                                    className="sc-1647d85-0 dvRVMV"
                                                                    onClick={
                                                                        toggleVisibleInfo
                                                                    }
                                                                >
                                                                    <span
                                                                        ref={
                                                                            sortRef
                                                                        }
                                                                    >
                                                                        i
                                                                    </span>
                                                                </button>

                                                                {visibleInfo && (
                                                                    <div>
                                                                        <div className="yzwcys-0 eKmpCd mount-animation-enter-done">
                                                                            <div className="sc-1nskza9-0 iuA-dLm sc-1647d85-2 dwGHDz tooltip">
                                                                                <i className="sc-1lk7lib-0 lmohzF svg-icon sc-1nskza9-1 ObPzm pointer">
                                                                                    <svg
                                                                                        viewBox="0 0 18 12"
                                                                                        version="1.1"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                    >
                                                                                        <path
                                                                                            transform="translate(-2 0)"
                                                                                            fillRule="evenodd"
                                                                                            d="M 9.52569 1.60834L 3.07216 8.64855C 1.89626 9.93135 2.80626 12 4.54647 12L 17.4535 12C 19.1937 12 20.1037 9.93135 18.9278 8.64855L 12.4743 1.60834C 11.6816 0.743602 10.3184 0.743603 9.52569 1.60834Z"
                                                                                        />
                                                                                    </svg>
                                                                                </i>
                                                                                <h2 className="sc-1647d85-4 UgJIu">
                                                                                    Пищевая
                                                                                    ценность
                                                                                    на&nbsp;100&nbsp;г
                                                                                </h2>

                                                                                <section className="sc-1647d85-5 dKqVun">
                                                                                    <div>
                                                                                        Энерг.
                                                                                        ценность
                                                                                    </div>

                                                                                    {product
                                                                                        .imageSize
                                                                                        .length ===
                                                                                        0 && (
                                                                                        <div>
                                                                                            {
                                                                                                product
                                                                                                    .energyValue[0]
                                                                                                    .label
                                                                                            }{' '}
                                                                                            ккал
                                                                                        </div>
                                                                                    )}

                                                                                    {product.sizes.map(
                                                                                        (
                                                                                            size,
                                                                                            index
                                                                                        ) =>
                                                                                            activeSize ===
                                                                                                index &&
                                                                                            size ===
                                                                                                26 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .energyValue[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    ккал
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  30 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .energyValue[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    ккал
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  40 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .energyValue[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    ккал
                                                                                                </div>
                                                                                            ) : (
                                                                                                ''
                                                                                            )
                                                                                    )}
                                                                                </section>

                                                                                <section className="sc-1647d85-5 dKqVun">
                                                                                    <div>
                                                                                        Белки
                                                                                    </div>

                                                                                    {product
                                                                                        .imageSize
                                                                                        .length ===
                                                                                        0 && (
                                                                                        <div>
                                                                                            {
                                                                                                product
                                                                                                    .protein[0]
                                                                                                    .label
                                                                                            }{' '}
                                                                                            ккал
                                                                                        </div>
                                                                                    )}

                                                                                    {product.sizes.map(
                                                                                        (
                                                                                            size,
                                                                                            index
                                                                                        ) =>
                                                                                            activeSize ===
                                                                                                index &&
                                                                                            size ===
                                                                                                26 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .protein[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  30 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .protein[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  40 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .protein[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : (
                                                                                                ''
                                                                                            )
                                                                                    )}
                                                                                </section>
                                                                                <section className="sc-1647d85-5 dKqVun">
                                                                                    <div>
                                                                                        Жиры
                                                                                    </div>

                                                                                    {product
                                                                                        .imageSize
                                                                                        .length ===
                                                                                        0 && (
                                                                                        <div>
                                                                                            {
                                                                                                product
                                                                                                    .fats[0]
                                                                                                    .label
                                                                                            }{' '}
                                                                                            ккал
                                                                                        </div>
                                                                                    )}
                                                                                    {product.sizes.map(
                                                                                        (
                                                                                            size,
                                                                                            index
                                                                                        ) =>
                                                                                            activeSize ===
                                                                                                index &&
                                                                                            size ===
                                                                                                26 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .fats[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  30 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .fats[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  40 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .fats[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : (
                                                                                                ''
                                                                                            )
                                                                                    )}
                                                                                </section>
                                                                                <section className="sc-1647d85-5 dKqVun">
                                                                                    <div>
                                                                                        Углеводы
                                                                                    </div>

                                                                                    {product.sizes.map(
                                                                                        (
                                                                                            size,
                                                                                            index
                                                                                        ) =>
                                                                                            activeSize ===
                                                                                                index &&
                                                                                            size ===
                                                                                                26 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .carbohydrates[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  30 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .carbohydrates[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  40 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .carbohydrates[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : (
                                                                                                ''
                                                                                            )
                                                                                    )}
                                                                                </section>
                                                                                <div className="sc-1647d85-6 kQSPdW" />
                                                                                <section className="sc-1647d85-5 dKqVun">
                                                                                    <div>
                                                                                        Вес
                                                                                    </div>

                                                                                    {product
                                                                                        .imageSize
                                                                                        .length ===
                                                                                        0 && (
                                                                                        <div>
                                                                                            {
                                                                                                product
                                                                                                    .weight[0]
                                                                                                    .label
                                                                                            }{' '}
                                                                                            ккал
                                                                                        </div>
                                                                                    )}

                                                                                    {product.sizes.map(
                                                                                        (
                                                                                            size,
                                                                                            index
                                                                                        ) =>
                                                                                            activeSize ===
                                                                                                index &&
                                                                                            size ===
                                                                                                26 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .weight[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  30 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .weight[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : activeSize ===
                                                                                                  index &&
                                                                                              size ===
                                                                                                  40 ? (
                                                                                                <div>
                                                                                                    {
                                                                                                        product
                                                                                                            .weight[
                                                                                                            index
                                                                                                        ]
                                                                                                            .label
                                                                                                    }{' '}
                                                                                                    г
                                                                                                </div>
                                                                                            ) : (
                                                                                                ''
                                                                                            )
                                                                                    )}
                                                                                </section>

                                                                                {product
                                                                                    .imageSize
                                                                                    .length !==
                                                                                    0 && (
                                                                                    <section className="sc-1647d85-5 dKqVun">
                                                                                        <div>
                                                                                            Диаметр
                                                                                        </div>

                                                                                        {product.sizes.map(
                                                                                            (
                                                                                                size,
                                                                                                index
                                                                                            ) =>
                                                                                                activeSize ===
                                                                                                    index &&
                                                                                                size ===
                                                                                                    26 ? (
                                                                                                    <div>
                                                                                                        {
                                                                                                            size
                                                                                                        }
                                                                                                        .sm
                                                                                                    </div>
                                                                                                ) : activeSize ===
                                                                                                      index &&
                                                                                                  size ===
                                                                                                      30 ? (
                                                                                                    <div>
                                                                                                        {
                                                                                                            size
                                                                                                        }
                                                                                                        .sm
                                                                                                    </div>
                                                                                                ) : activeSize ===
                                                                                                      index &&
                                                                                                  size ===
                                                                                                      40 ? (
                                                                                                    <div>
                                                                                                        {
                                                                                                            size
                                                                                                        }
                                                                                                        .sm
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    ''
                                                                                                )
                                                                                        )}
                                                                                    </section>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {product.imageSize
                                                        .length === 0 ? (
                                                        <div>
                                                            {
                                                                product.description
                                                            }
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="woocommerce-product-details__short-description">
                                                                <p>
                                                                    {product.sizes.map(
                                                                        (
                                                                            size,
                                                                            index
                                                                        ) =>
                                                                            activeSize ===
                                                                                index &&
                                                                            size ===
                                                                                26 ? (
                                                                                <div>
                                                                                    {
                                                                                        size
                                                                                    }{' '}
                                                                                    см,
                                                                                    традиционное
                                                                                    тесто,
                                                                                    {
                                                                                        +product
                                                                                            .weight[
                                                                                            index
                                                                                        ]
                                                                                            .label
                                                                                    }{' '}
                                                                                    г
                                                                                </div>
                                                                            ) : activeSize ===
                                                                                  index &&
                                                                              size ===
                                                                                  30 ? (
                                                                                <div>
                                                                                    {
                                                                                        size
                                                                                    }{' '}
                                                                                    см,
                                                                                    {activeType ===
                                                                                    0
                                                                                        ? 'Tрадиционное '
                                                                                        : 'Тонкое   '}
                                                                                    тесто,
                                                                                    {
                                                                                        +product
                                                                                            .weight[
                                                                                            index
                                                                                        ]
                                                                                            .label
                                                                                    }{' '}
                                                                                    г
                                                                                </div>
                                                                            ) : activeSize ===
                                                                                  index &&
                                                                              size ===
                                                                                  40 ? (
                                                                                <div>
                                                                                    {
                                                                                        size
                                                                                    }{' '}
                                                                                    см,
                                                                                    {activeType ===
                                                                                    0
                                                                                        ? 'Tрадиционное '
                                                                                        : 'Тонкое '}
                                                                                    тесто,
                                                                                    {
                                                                                        +product
                                                                                            .weight[
                                                                                            index
                                                                                        ]
                                                                                            .label
                                                                                    }{' '}
                                                                                    г
                                                                                </div>
                                                                            ) : (
                                                                                ''
                                                                            )
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="sc-15fdqut-15 coZwvJ">
                                                                <div className="sc-1hrv7kf-0 fjjoGc">
                                                                    {
                                                                        product.description
                                                                    }
                                                                    ,
                                                                    {product.descPizz.map(
                                                                        (
                                                                            descpizz,
                                                                            index
                                                                        ) => (
                                                                            <button
                                                                                data-testid="product__option"
                                                                                type="button"
                                                                                className={`sc-1hrv7kf-3 dhaJEk ${
                                                                                    visibleDesc ===
                                                                                    index
                                                                                        ? ' dhaJEk-disable'
                                                                                        : ''
                                                                                }`}
                                                                            >
                                                                                <span
                                                                                    onClick={(
                                                                                        e
                                                                                    ) => {
                                                                                        selectDisableActive(
                                                                                            e,
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        descpizz.label
                                                                                    }
                                                                                </span>
                                                                                {visibleDesc !==
                                                                                index ? (
                                                                                    <i className="sc-1lk7lib-0 lmohzF svg-icon">
                                                                                        <svg
                                                                                            width={
                                                                                                14
                                                                                            }
                                                                                            height={
                                                                                                14
                                                                                            }
                                                                                            viewBox="0 0 14 14"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <circle
                                                                                                cx={
                                                                                                    7
                                                                                                }
                                                                                                cy={
                                                                                                    7
                                                                                                }
                                                                                                r="6.6"
                                                                                                stroke="#737272"
                                                                                                strokeWidth="0.8"
                                                                                            />
                                                                                            <path
                                                                                                d="M5 5L9 9"
                                                                                                stroke="#737272"
                                                                                                strokeWidth="1.2"
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                            />
                                                                                            <path
                                                                                                d="M9 5L5 9"
                                                                                                stroke="#737272"
                                                                                                strokeWidth="1.2"
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                            />
                                                                                        </svg>
                                                                                    </i>
                                                                                ) : (
                                                                                    <i className="sc-1lk7lib-0 lmohzF svg-icon">
                                                                                        <svg
                                                                                            width={
                                                                                                14
                                                                                            }
                                                                                            height={
                                                                                                14
                                                                                            }
                                                                                            viewBox="0 0 14 14"
                                                                                            fill="none"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <circle
                                                                                                cx={
                                                                                                    7
                                                                                                }
                                                                                                cy={
                                                                                                    7
                                                                                                }
                                                                                                r="6.6"
                                                                                                stroke="#737272"
                                                                                                strokeWidth="0.8"
                                                                                            />
                                                                                            <path
                                                                                                d="M4.687 9.41667C4.687 9.41667 5.58895 9.41667 8.1095 9.41667C10.63 9.41667 10.6303 5.46995 8.1095 5.46995C5.58871 5.46995 5.88146 5.46995 4.82073 5.46995M3.5 5.46995L5.55039 6.90736L4.82073 5.46995M3.5 5.46995L5.55039 4L4.82073 5.46995M3.5 5.46995C3.5 5.46995 4.19855 5.46995 4.82073 5.46995"
                                                                                                stroke="#737272"
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                            />
                                                                                        </svg>
                                                                                    </i>
                                                                                )}
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="sc-15fdqut-16 dtQNGu">
                                                                <div className="z6jeag-0 kxKIyD">
                                                                    {product.sizes.map(
                                                                        (
                                                                            size,
                                                                            index
                                                                        ) => (
                                                                            <>
                                                                                <input
                                                                                    name="size_20"
                                                                                    className="z6jeag-3 fCKLTk"
                                                                                />
                                                                                <label
                                                                                    onClick={() =>
                                                                                        onSelectSize(
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                    className={`z6jeag-2 eMiiQc ${classNames(
                                                                                        {
                                                                                            'eMiiQc-active':
                                                                                                activeSize ===
                                                                                                index,

                                                                                            'eMiiQc-disable': !product.sizes.includes(
                                                                                                size
                                                                                            )
                                                                                        }
                                                                                    )}`}
                                                                                >
                                                                                    {`${size}.sm`}
                                                                                </label>
                                                                            </>
                                                                        )
                                                                    )}
                                                                </div>

                                                                <div className="z6jeag-0 kxKIyD">
                                                                    <div className="z6jeag-1 dFUnpu" />

                                                                    {product.types.map(
                                                                        (
                                                                            type,
                                                                            index
                                                                        ) => (
                                                                            <>
                                                                                <input
                                                                                    name="size_20"
                                                                                    className="z6jeag-3 fCKLTk"
                                                                                />
                                                                                <label
                                                                                    onClick={() =>
                                                                                        onSelectType(
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                    className={`z6jeag-2 eMiiQc ${classNames(
                                                                                        {
                                                                                            ' eMiiQc-active':
                                                                                                (activeType ===
                                                                                                    index) |
                                                                                                (activeSize ===
                                                                                                    0),
                                                                                            ' eMiiQc-disable':
                                                                                                activeSize ===
                                                                                                    0 &&
                                                                                                type ===
                                                                                                    1
                                                                                        }
                                                                                    )}`}
                                                                                >
                                                                                    {type ===
                                                                                    0
                                                                                        ? 'Традиционное'
                                                                                        : type ===
                                                                                          1
                                                                                        ? 'Тонкое'
                                                                                        : ''}
                                                                                </label>
                                                                            </>
                                                                        )
                                                                    )}
                                                                </div>

                                                                <div className="sc-15fdqut-18 qTzCk">
                                                                    <div className="sc-15fdqut-19 cLOlKl">
                                                                        <span className="sc-15fdqut-20 lneyRL">
                                                                            Добавить
                                                                            в
                                                                            пиццу
                                                                        </span>

                                                                        <ul className="sc-1keftj-0 iQYpYQ">
                                                                            {product.productsAdditiveSave.map(
                                                                                (
                                                                                    additiveId
                                                                                ) =>
                                                                                    productsAdditiveSave.map(
                                                                                        (
                                                                                            prodAdd,
                                                                                            index
                                                                                        ) =>
                                                                                            additiveId ===
                                                                                                index && (
                                                                                                <li
                                                                                                    className={`sc-1keftj-1 cnqrdx ${
                                                                                                        prodAdd.visibleAdd &&
                                                                                                        productId !==
                                                                                                            undefined
                                                                                                            ? ' cnqrdx_hover'
                                                                                                            : ''
                                                                                                    }`}
                                                                                                    key={
                                                                                                        prodAdd._id
                                                                                                    }
                                                                                                >
                                                                                                    <div
                                                                                                        onClick={(
                                                                                                            e
                                                                                                        ) => {
                                                                                                            if (
                                                                                                                !prodAdd.visibleAdd
                                                                                                            ) {
                                                                                                                selectActiveHover(
                                                                                                                    e,
                                                                                                                    prodAdd._id
                                                                                                                );
                                                                                                            } else {
                                                                                                                selectActiveHoverDelete(
                                                                                                                    e,
                                                                                                                    prodAdd._id
                                                                                                                );
                                                                                                            }
                                                                                                        }}
                                                                                                    >
                                                                                                        <img
                                                                                                            className="image"
                                                                                                            src={
                                                                                                                prodAdd.imgUrl
                                                                                                            }
                                                                                                        />
                                                                                                        <h2 className="title">
                                                                                                            {
                                                                                                                prodAdd.label
                                                                                                            }
                                                                                                        </h2>
                                                                                                        <span className="money">
                                                                                                            <span className="money__value">
                                                                                                                {
                                                                                                                    prodAdd.price
                                                                                                                }
                                                                                                            </span>
                                                                                                            <span className="money__currency money__currency_on-the-right">
                                                                                                                ₼
                                                                                                            </span>
                                                                                                        </span>
                                                                                                        {prodAdd.visibleAdd && (
                                                                                                            <svg className="selected-icon">
                                                                                                                <circle fill="#fff" />
                                                                                                                <path
                                                                                                                    fillRule="evenodd"
                                                                                                                    clipRule="evenodd"
                                                                                                                    d="M10 3.25c3.74 0 6.75 3.01 6.75 6.75s-3.01 6.75-6.75 6.75S3.25 13.74 3.25 10 6.26 3.25 10 3.25zM18.25 10c0-4.57-3.68-8.25-8.25-8.25S1.75 5.43 1.75 10s3.68 8.25 8.25 8.25 8.25-3.68 8.25-8.25z"
                                                                                                                    fill="#FF6900"
                                                                                                                />
                                                                                                                <path
                                                                                                                    fillRule="evenodd"
                                                                                                                    clipRule="evenodd"
                                                                                                                    d="M12.881 8.076a.6.6 0 010 .848l-3.638 3.639a.6.6 0 01-.849 0l-1.818-1.82a.6.6 0 11.848-.848L8.82 11.29l3.214-3.214a.6.6 0 01.848 0z"
                                                                                                                    fill="#FF6900"
                                                                                                                />
                                                                                                            </svg>
                                                                                                        )}
                                                                                                    </div>
                                                                                                </li>
                                                                                            )
                                                                                    )
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="modal-container-body_right-bottom">
                                                <div className="sc-15fdqut-17 fOLzOv">
                                                    <button
                                                        type="button"
                                                        className="sc-91ilwk-0 hmteXa sc-15fdqut-21 CBDaq"
                                                        onClick={onAddProduct}
                                                        disabled={
                                                            !addButtonActive
                                                                ? 'disabled'
                                                                : ''
                                                        }
                                                    >
                                                        Səbətə əlavə et -
                                                        <span className="money ">
                                                            {activeSize === 1
                                                                ? ` ${(
                                                                      product.price +
                                                                      30 +
                                                                      productsAdditivePluse()
                                                                  ).toFixed(
                                                                      2
                                                                  )}` + ` ₼`
                                                                : activeSize ===
                                                                  2
                                                                ? ` ${(
                                                                      product.price +
                                                                      40 +
                                                                      productsAdditivePluse()
                                                                  ).toFixed(
                                                                      2
                                                                  )}` + ` ₼`
                                                                : ` ${(
                                                                      product.price +
                                                                      productsAdditivePluse()
                                                                  ).toFixed(
                                                                      2
                                                                  )}` + ` ₼`}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        );
    } else {
        return <div>{detailsProduct === false}</div>;
    }
};

ProductPage.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        _id: PropTypes.string.isRequired,
        types: PropTypes.array,
        sizes: PropTypes.array,
        descPizz: PropTypes.array
    })
};

export default ProductPage;
