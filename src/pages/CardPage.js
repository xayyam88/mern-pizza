/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    removeCartItem,
    plusCartItem,
    minusCartItem,
    clearCart
} from '../redux/actions/cartActions';
import CartItem from '../components/cart-item/cartItem';
import CheckoutSteps from '../components/checkout-steps/checkoutSteps';
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component';
import 'animate.css/animate.min.css';

export default function CardPage(props) {
    const dispatch = useDispatch();

    const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);

    const couponCode = 'BIG20';
    let couponProccentAddLocalStor = +JSON.parse(
        localStorage.getItem('couponProccentAdd')
    );

    const [couponUpdate, setCouponUpdate] = React.useState(false);

    const [coupon, setCoupon] = React.useState(false);
    const [couponInput, setCouponInput] = React.useState(
        couponProccentAddLocalStor === 0 ? '' : couponCode
    );
    const [couponButtonMesage, setCouponButtonMesage] = React.useState(
        couponProccentAddLocalStor === 0 ? 'Apply coupon' : 'Сброить купон'
    );

    const [couponProccentAdd, setCouponProccentAdd] = React.useState(
        couponProccentAddLocalStor === 0 ? 0 : couponProccentAddLocalStor
    );

    const [couponErrorMassage, setCouponErrorMassage] = React.useState('');

    const [couponMassage, setCouponMassage] = React.useState({
        couponCodeMassage: 'Скидка 20% на большую пиццу на самовывоз',
        couponText:
            'Закажите любую большую пиццу на самовывоз со скидкой 20%. Для получения скидки введите промокод BIG20'
    });

    const [couponTrueMassage, setCouponTrueMassage] = React.useState(false);

    const couponApply = (e) => {
        e.preventDefault();
        setCoupon(!coupon);
        if (couponCode === couponInput) {
            function CartNotification() {
                return (
                    <div className="cart-notification_wrap">
                        <h1>Coupon</h1>
                        <span>Əlavə olundu</span>
                    </div>
                );
            }

            store.addNotification({
                content: CartNotification,
                message: 'Sebete elave olundu',
                container: 'center',
                isMobile: true,
                breakpoint: 1500,
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                    duration: 1500,
                    pauseOnHover: true
                }
            });
        }

        setTimeout(() => {
            if (couponCode === couponInput) {
                setCouponUpdate(true);
                setCoupon(coupon);
                setCouponButtonMesage('Сброить купон');
                setCouponErrorMassage('');
                setCouponTrueMassage(!couponTrueMassage);
                setCouponProccentAdd(((totalPrice / 100) * 20).toFixed(2));

                const totalPriceEnd =
                    totalPrice - ((totalPrice / 100) * 20).toFixed(2);

                localStorage.setItem('totalPrice', totalPriceEnd);

                localStorage.setItem(
                    'couponProccentAdd',
                    JSON.stringify(((totalPrice / 100) * 20).toFixed(2))
                );

                window.location.reload();
            } else {
                setCoupon(coupon);
                if (couponInput === '') {
                    setCouponErrorMassage(
                        'Используйте цифры и латинские буквы'
                    );
                    setTimeout(() => {
                        setCouponErrorMassage('');
                    }, 2000);
                } else {
                    setCouponErrorMassage(
                        'Промокод не найден. Попробуйте другой'
                    );
                    setTimeout(() => {
                        setCouponErrorMassage('');
                    }, 2500);
                }
            }
        }, 2000);
    };

    const couponFalse = (e) => {
        e.preventDefault();
        setCoupon(!coupon);

        setTimeout(() => {
            const totalPriceEndPlus = totalPrice + couponProccentAdd;
            localStorage.setItem('totalPrice', totalPriceEndPlus);
            localStorage.setItem('couponProccentAdd', JSON.stringify(0));
            setCoupon(coupon);
            setCouponInput('');
            setCouponButtonMesage('Apply coupon');
            setCouponTrueMassage(!couponTrueMassage);
            setCouponProccentAdd(0);
            window.location.reload();
        }, 2500);
    };

    const addedPizzas = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const onClearCart = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
            dispatch(clearCart());
        }
    };

    const onRemoveItem = (id) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            dispatch(removeCartItem(id));
        }
    };

    const onPlusItem = (id) => {
        dispatch(plusCartItem(id));
    };

    const onMinusItem = (id) => {
        dispatch(minusCartItem(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    React.useEffect(() => {
        window.scroll({
            top: 200,
            behavior: 'smooth'
        });
        setCouponUpdate(false);
    }, [totalPrice]);

    return (
        <div id="content" className="site-content" tabIndex={-1}>
            <ReactNotification />
            <div className="col-full">
                <div className="pizzaro-breadcrumb">
                    <nav className="woocommerce-breadcrumb">
                        <a href="https://demo2.chethemes.com/pizzaro">Home</a>
                        <span className="delimiter">
                            <i className="po po-arrow-right-slider" />
                        </span>
                        Cart
                    </nav>
                </div>
                <div id="primary" className="content-area">
                    <main id="main" className="site-main" role="main">
                        <CheckoutSteps step></CheckoutSteps>
                        {totalCount ? (
                            <div
                                id="post-576"
                                className="post-576 page type-page status-publish hentry"
                            >
                                <div className="entry-content">
                                    <div className="woocommerce">
                                        <div className="woocommerce-notices-wrapper" />
                                        <form className="woocommerce-cart-form">
                                            <table
                                                className="shop_table shop_table_responsive cart woocommerce-cart-form__contents"
                                                cellSpacing={0}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th className="product-remove">
                                                            &nbsp;
                                                        </th>
                                                        <th className="product-thumbnail">
                                                            &nbsp;
                                                        </th>
                                                        <th className="product-name">
                                                            Product
                                                        </th>
                                                        <th className="product-price">
                                                            Price
                                                        </th>
                                                        <th className="product-quantity">
                                                            Quantity
                                                        </th>
                                                        <th className="product-subtotal">
                                                            Subtotal
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {addedPizzas.map((obj) => (
                                                        <CartItem
                                                            key={obj.id}
                                                            id={obj.id}
                                                            img={obj.img}
                                                            productsAdditiveName={
                                                                obj.productsAdditiveName
                                                            }
                                                            couponProccentAdd={
                                                                couponProccentAdd
                                                            }
                                                            name={obj.name}
                                                            type={obj.type}
                                                            size={obj.size}
                                                            price={obj.price}
                                                            totalPrice={
                                                                items[obj.id]
                                                                    .totalPrice
                                                            }
                                                            totalCount={
                                                                items[obj.id]
                                                                    .items
                                                                    .length
                                                            }
                                                            onRemove={
                                                                onRemoveItem
                                                            }
                                                            onMinus={
                                                                onMinusItem
                                                            }
                                                            onPlus={onPlusItem}
                                                        />
                                                    ))}

                                                    <tr>
                                                        <td
                                                            colSpan={6}
                                                            className="actions"
                                                        >
                                                            <div className="coupon">
                                                                <label htmlFor="coupon_code">
                                                                    Coupon:
                                                                </label>{' '}
                                                                <input
                                                                    type="text"
                                                                    className="input-text"
                                                                    placeholder="Coupon code"
                                                                    value={
                                                                        couponInput
                                                                    }
                                                                    disabled={
                                                                        (couponProccentAdd ===
                                                                            0) &
                                                                        (couponProccentAddLocalStor ===
                                                                            0)
                                                                            ? false
                                                                            : true
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setCouponInput(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {(couponButtonMesage ===
                                                                    'Apply coupon') &
                                                                (couponProccentAddLocalStor ===
                                                                    0) ? (
                                                                    <button
                                                                        type="submit"
                                                                        className="button button-coupon"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            couponApply(
                                                                                e
                                                                            )
                                                                        }
                                                                    >
                                                                        {coupon ? (
                                                                            <i class="fa fa-refresh fa-spin"></i>
                                                                        ) : (
                                                                            couponButtonMesage
                                                                        )}
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        type="submit"
                                                                        className="button button-coupon"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            couponFalse(
                                                                                e
                                                                            )
                                                                        }
                                                                    >
                                                                        {coupon ? (
                                                                            <i class="fa fa-refresh fa-spin"></i>
                                                                        ) : (
                                                                            couponButtonMesage
                                                                        )}
                                                                    </button>
                                                                )}
                                                                {couponErrorMassage !==
                                                                    '' && (
                                                                    <div className="coupon-error-massage">
                                                                        <i className="sc-1lk7lib-0 jkSByL svg-icon f25ays-0 eLZFue tooltip__pointer tooltip__pointer_default">
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

                                                                        <div>
                                                                            {
                                                                                couponErrorMassage
                                                                            }
                                                                        </div>

                                                                        <span
                                                                            className="tooltip__close-control"
                                                                            type="button"
                                                                        >
                                                                            <i className="sc-1lk7lib-0 jkSByL svg-icon tooltip__close-control-icon">
                                                                                <svg
                                                                                    viewBox="0 0 22 22"
                                                                                    version="1.1"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                >
                                                                                    <path
                                                                                        fill="#FFFFFF"
                                                                                        fillOpacity="0.2"
                                                                                        fillRule="evenodd"
                                                                                        d="M 11 0C 4.92487 1.14941e-15 -7.1838e-16 4.92487 0 11C 8.62056e-16 17.0751 4.92487 22 11 22C 17.0751 22 22 17.0751 22 11C 22 4.92487 17.0751 -1.14941e-15 11 0Z"
                                                                                    />
                                                                                    <path
                                                                                        transform="translate(6.5 6.5)"
                                                                                        fillRule="evenodd"
                                                                                        d="M 5.33691 4.39941L 8.60645 1.12793C 8.86426 0.870117 8.86426 0.452148 8.60645 0.193359C 8.34863 -0.0644531 7.93066 -0.0644531 7.67285 0.193359L 4.39941 3.46582L 1.12988 0.193359C 0.87207 -0.0644531 0.454102 -0.0644531 0.196289 0.193359C -0.0654297 0.452148 -0.0654297 0.870117 0.196289 1.12793L 3.46582 4.39941L 0.196289 7.67188C -0.0654297 7.92969 -0.0654297 8.34863 0.196289 8.60645C 0.454102 8.86426 0.87207 8.86426 1.12988 8.60645L 4.39941 5.33398L 7.67285 8.60645C 7.93066 8.86426 8.34863 8.86426 8.60645 8.60645C 8.86426 8.34863 8.86426 7.92969 8.60645 7.67188L 5.33691 4.39941Z"
                                                                                    />
                                                                                </svg>
                                                                            </i>
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {(couponProccentAdd >
                                                                    0 ||
                                                                    couponProccentAddLocalStor >
                                                                        0) && (
                                                                    <div className="promocode__description">
                                                                        <div className="promocode__title">
                                                                            {
                                                                                couponCode
                                                                            }
                                                                            :
                                                                            {
                                                                                couponMassage.couponCodeMassage
                                                                            }
                                                                        </div>

                                                                        <div className="promocode__text">
                                                                            <div className="promocode__markdown">
                                                                                <p>
                                                                                    {
                                                                                        couponMassage.couponText
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <button className="checkout-button button">
                                                                <Link to="/">
                                                                    Back to shop
                                                                </Link>
                                                            </button>
                                                            <div className="wc-proceed-to-checkout">
                                                                {/* <a
                                                                    href="https://demo2.chethemes.com/pizzaro/checkout/"
                                                                    className="checkout-button button alt wc-forward"
                                                                >
                                                                    Proceed to
                                                                    checkout
                                                                </a> */}

                                                                <button
                                                                    onClick={
                                                                        checkoutHandler
                                                                    }
                                                                    className="checkout-button button alt wc-forward"
                                                                    disabled={
                                                                        totalCount.length ===
                                                                        0
                                                                    }
                                                                >
                                                                    Proceed to
                                                                    Checkout
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="hidden"
                                                                id="woocommerce-cart-nonce"
                                                                name="woocommerce-cart-nonce"
                                                                defaultValue="b9b49852cc"
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="_wp_http_referer"
                                                                defaultValue="/pizzaro/cart/"
                                                            />{' '}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                        <div className="cart-collaterals">
                                            <div className="cart_totals ">
                                                <h2>Cart totals</h2>
                                                <table
                                                    className="shop_table shop_table_responsive"
                                                    cellSpacing={0}
                                                >
                                                    <tbody>
                                                        <tr className="cart-subtotal">
                                                            <th>Quantity</th>
                                                            <td data-title="Subtotal">
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        {
                                                                            totalCount
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </tr>

                                                        {(couponProccentAdd !==
                                                            0 ||
                                                            couponProccentAddLocalStor >
                                                                0) && (
                                                            <tr className="order-total">
                                                                <th>%</th>
                                                                <td data-title="Total">
                                                                    <strong>
                                                                        <span className="woocommerce-Price-amount amount">
                                                                            <span className="woocommerce-Price-currencySymbol">
                                                                                -{' '}
                                                                                {
                                                                                    couponProccentAdd
                                                                                }
                                                                            </span>
                                                                            ₼
                                                                        </span>
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                        )}

                                                        {(couponProccentAdd !==
                                                            0 ||
                                                            couponProccentAddLocalStor >
                                                                0) && (
                                                            <tr className="order-total">
                                                                <th>
                                                                    Old Total
                                                                </th>
                                                                <td data-title="Total">
                                                                    <strong>
                                                                        <span className="woocommerce-Price-amount amount">
                                                                            <span className="woocommerce-Price-currencySymbol">
                                                                                {`${(
                                                                                    totalPrice +
                                                                                    couponProccentAddLocalStor
                                                                                ).toFixed(
                                                                                    2
                                                                                )} `}
                                                                            </span>
                                                                            ₼
                                                                        </span>
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                        )}

                                                        <tr className="order-total">
                                                            <th>
                                                                {couponProccentAdd ===
                                                                0
                                                                    ? 'Total'
                                                                    : 'New Total'}
                                                            </th>
                                                            <td data-title="Total">
                                                                <strong>
                                                                    <span className="woocommerce-Price-amount amount">
                                                                        <span className="woocommerce-Price-currencySymbol">
                                                                            {totalPrice.toFixed(
                                                                                2
                                                                            )}{' '}
                                                                        </span>
                                                                        ₼
                                                                    </span>
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="wc-proceed-to-checkout">
                                                    {/* <a
                                                        href="https://demo2.chethemes.com/pizzaro/checkout/"
                                                        className="checkout-button button alt wc-forward"
                                                    >
                                                        Proceed to checkout
                                                    </a> */}

                                                    <button
                                                        onClick={
                                                            checkoutHandler
                                                        }
                                                        className="checkout-button button alt wc-forward"
                                                        disabled={
                                                            totalCount.length ===
                                                            0
                                                        }
                                                    >
                                                        Proceed to Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* .entry-content */}
                            </div>
                        ) : (
                            <div
                                id="post-576"
                                className="post-576 page type-page status-publish hentry"
                            >
                                <div className="entry-content">
                                    <div className="woocommerce">
                                        <div className="woocommerce-notices-wrapper" />
                                        <p className="cart-empty woocommerce-info">
                                            Your cart is currently empty.
                                        </p>{' '}
                                        <p className="return-to-shop">
                                            <Link
                                                className="button wc-backward"
                                                to="/"
                                            >
                                                Return to shop
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
