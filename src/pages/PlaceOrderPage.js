/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/checkout-steps/checkoutSteps';
import { createOrder } from './../redux/actions/orderActions';
import LoadingBox from './../components/loading-box/loadingBox';
import MessageBox from './../components/message-box/messageBox';

const PlaceOrderPage = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const items = cart.items;

    const addedPizzas = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const countOneProduct = addedPizzas.map(
        (obj) => items[obj.id].items.length
    );

    if (cart.shippingAddress === undefined) {
        props.history.push('/card');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const shippingAddress =
        cart.shippingAddress === undefined ? {} : cart.shippingAddress;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: addedPizzas,
                countOneProduct: countOneProduct,
                shippingAddress: cart.shippingAddress,
                totalPrice: cart.totalPrice,
                totalCount: cart.totalCount,
                couponProccentAdd: cart.couponProccentAdd,
                userName: userInfo.name,
                userId: userInfo._id
            })
        );
    };

    useEffect(() => {
        window.scroll({
            top: 200,
            behavior: 'smooth'
        });
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: 'ORDER_CREATE_RESET' });
        }
    }, [dispatch, order, props.history, success]);

    return (
        <div>
            <div id="content" className="site-content" tabIndex={-1}>
                <div className="col-full">
                    <div className="pizzaro-breadcrumb">
                        <nav className="woocommerce-breadcrumb">
                            <a href="index.html">Home</a>
                            <span className="delimiter">
                                <i className="po po-arrow-right-slider" />
                            </span>
                            <a href="checkout.html">Checkout</a>
                            <span className="delimiter">
                                <i className="po po-arrow-right-slider" />
                            </span>
                            Order Received
                        </nav>
                    </div>
                    <div id="primary" className="content-area">
                        <main id="main" className="site-main">
                            <CheckoutSteps
                                step
                                step1
                                step2
                                step
                            ></CheckoutSteps>
                            <div
                                id="post-9"
                                className="post-9 page type-page status-publish hentry"
                            >
                                <div
                                    classname="form-row place-order"
                                    style={{ textAlign: 'center' }}
                                >
                                    {loading && <LoadingBox></LoadingBox>}
                                    {error && (
                                        <MessageBox variant="danger">
                                            {error}
                                        </MessageBox>
                                    )}
                                    <button
                                        type="submit"
                                        classname="button alt"
                                        onClick={placeOrderHandler}
                                    >
                                        Place order
                                    </button>
                                </div>
                                {/* .entry-header */}
                                <div className="entry-content">
                                    <div className="woocommerce">
                                        {/* <p className="woocommerce-thankyou-order-received">
                                            Thank you. Your order has been
                                            received.
                                        </p>
                                        <ul className="woocommerce-thankyou-order-details order_details">
                                            <li className="order">
                                                Order Number:
                                                <strong>645</strong>
                                            </li>
                                            <li className="date">
                                                Date:
                                                <strong>
                                                    February 2, 2017
                                                </strong>
                                            </li>
                                            <li className="total">
                                                Total:
                                                <strong>
                                                    <span className="woocommerce-Price-amount amount">
                                                        <span className="woocommerce-Price-currencySymbol">
                                                            {`${cart.totalPrice} `}
                                                        </span>
                                                        ₼
                                                    </span>
                                                </strong>
                                            </li>
                                            <li className="method">
                                                Payment Method:
                                                <strong>
                                                   
                                                </strong>
                                            </li>
                                        </ul>
                                        <div className="clear" />
                                        <p>
                                            Make your payment directly into our
                                            bank account. Please use your Order
                                            ID as the payment reference. Your
                                            order won’t be shipped until the
                                            funds have cleared in our account.
                                        </p> */}
                                        <h2>Order Details</h2>
                                        <table className="shop_table order_details">
                                            <thead>
                                                <tr>
                                                    <th className="product-name">
                                                        Product
                                                    </th>
                                                    <th className="product-total">
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            {addedPizzas.map((obj) => (
                                                <tbody>
                                                    <tr className="order_item">
                                                        <td
                                                            className="product-name"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center'
                                                            }}
                                                        >
                                                            <img
                                                                src={obj.img}
                                                                width={90}
                                                                height={90}
                                                                style={{
                                                                    marginRight:
                                                                        '10px'
                                                                }}
                                                            />
                                                            <div>
                                                                <a href="single-product-v1.html">
                                                                    {obj.name}
                                                                </a>
                                                                <strong className="product-quantity">
                                                                    ×
                                                                    {`${
                                                                        items[
                                                                            obj
                                                                                .id
                                                                        ].items
                                                                            .length
                                                                    } (1ed ${
                                                                        obj.price
                                                                    } ₼)`}
                                                                </strong>
                                                                <dl className="variation">
                                                                    <dt className="variation-PickSize362590">
                                                                        {`${
                                                                            obj.type ===
                                                                            0
                                                                                ? 'Tрадиционное'
                                                                                : 'Тонкое'
                                                                        } тесто ${
                                                                            obj
                                                                                .productsAdditiveName
                                                                                .length ===
                                                                            6
                                                                                ? ''
                                                                                : `+ ${obj.productsAdditiveName}`
                                                                        }`}
                                                                    </dt>
                                                                    <dd className="variation-PickSize362590">
                                                                        <p>
                                                                            {obj.size !==
                                                                                undefined &&
                                                                                `${obj.size} sm`}
                                                                        </p>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                        </td>
                                                        <td className="product-total">
                                                            <span className="woocommerce-Price-amount amount">
                                                                <span className="woocommerce-Price-currencySymbol">
                                                                    {`${items[
                                                                        obj.id
                                                                    ].totalPrice.toFixed(
                                                                        2
                                                                    )} `}
                                                                </span>
                                                                ₼
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))}

                                            <tfoot>
                                                <tr>
                                                    <th scope="row">
                                                        Payment Method:
                                                    </th>
                                                    <td>
                                                        {
                                                            shippingAddress.paymentMethod
                                                        }
                                                    </td>
                                                </tr>

                                                {cart.couponProccentAdd > 0 && (
                                                    <>
                                                        <tr className="cart-subtotal">
                                                            <th>Coupon</th>
                                                            <td>
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        -{' '}
                                                                        {
                                                                            cart.couponProccentAdd
                                                                        }{' '}
                                                                        ₼
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr className="cart-subtotal">
                                                            <th>Old Price</th>
                                                            <td>
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        {`${(
                                                                            cart.totalPrice +
                                                                            +cart.couponProccentAdd
                                                                        ).toFixed(
                                                                            2
                                                                        )} `}{' '}
                                                                        ₼
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )}

                                                <tr>
                                                    <th scope="row">
                                                        {cart.couponProccentAdd ===
                                                        0
                                                            ? 'Total'
                                                            : 'New Total'}
                                                        :
                                                    </th>
                                                    <td>
                                                        <span className="woocommerce-Price-amount amount">
                                                            <span className="woocommerce-Price-currencySymbol">
                                                                {`${cart.totalPrice.toFixed(
                                                                    2
                                                                )} `}
                                                            </span>
                                                            ₼
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <header>
                                            <h2>Customer Details</h2>
                                        </header>
                                        <table className="shop_table customer_details">
                                            <tbody>
                                                <tr>
                                                    <th>Customer name:</th>
                                                    <td>{userInfo.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Telephone:</th>
                                                    <td>
                                                        {shippingAddress.phone}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <header className="title">
                                            <h3>Billing Address</h3>
                                        </header>
                                        <address>
                                            {shippingAddress.address}
                                        </address>
                                    </div>
                                </div>
                                {/* .entry-content */}
                            </div>
                            {/* #post-## */}
                        </main>
                        {/* #main */}
                        {/* <div
                            classname="form-row place-order"
                            style={{ textAlign: 'right' }}
                        >
                            <button type="submit" classname="button alt">
                                Place order
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* .col-full */}
            </div>

            <div className="footer-v1-static-content">
                <div className="kc-css-994088 kc_row">
                    <div className="kc-row-container  kc-container">
                        <div className="kc-wrap-columns">
                            <div className="kc-css-194963 kc_col-sm-12 kc_column kc_col-sm-12">
                                <div className="stretch-full-width kc-col-container">
                                    <div className="kc-css-126640 kc_shortcode kc_wrap_instagram  kc_ins_col_6">
                                        <ul className="row">
                                            <li className="col-md-2 col-sm-2 col-lg-2 col-xs-4">
                                                <a
                                                    href="https://www.instagram.com/p/BO4Gyf2hTkr/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        alt
                                                        src="https://transvelo.github.io/pizzaro-html/assets/images/footer/1.jpg"
                                                    />
                                                </a>
                                            </li>
                                            <li className="col-md-2 col-sm-2 col-lg-2 col-xs-4">
                                                <a
                                                    href="https://www.instagram.com/p/BO4Gtf1BCmM/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        alt
                                                        src="https://transvelo.github.io/pizzaro-html/assets/images/footer/2.jpg"
                                                    />
                                                </a>
                                            </li>
                                            <li className="col-md-2 col-sm-2 col-lg-2 col-xs-4">
                                                <a
                                                    href="https://www.instagram.com/p/BO4GnvhBqNt/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        alt
                                                        src="https://transvelo.github.io/pizzaro-html/assets/images/footer/3.jpg"
                                                    />
                                                </a>
                                            </li>
                                            <li className="col-md-2 col-sm-2 col-lg-2 col-xs-4">
                                                <a
                                                    href="https://www.instagram.com/p/BO4GhsuhQE4/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        alt
                                                        src="https://transvelo.github.io/pizzaro-html/assets/images/footer/4.jpg"
                                                    />
                                                </a>
                                            </li>
                                            <li className="col-md-2 col-sm-2 col-lg-2 col-xs-4">
                                                <a
                                                    href="https://www.instagram.com/p/BO4F_ZbBuxI/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        alt
                                                        src="https://transvelo.github.io/pizzaro-html/assets/images/footer/5.jpg"
                                                    />
                                                </a>
                                            </li>
                                            <li className="col-md-2 col-sm-2 col-lg-2 col-xs-4">
                                                <a
                                                    href="https://www.instagram.com/p/BO4F8fLhgkp/"
                                                    target="_blank"
                                                >
                                                    <img
                                                        alt
                                                        src="https://transvelo.github.io/pizzaro-html/assets/images/footer/6.jpg"
                                                    />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
