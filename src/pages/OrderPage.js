/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder } from '../redux/actions/orderActions';
import { PayPalButton } from 'react-paypal-button-v2';
import LoadingBox from '../components/loading-box/loadingBox';
import MessageBox from '../components/message-box/messageBox';
import Moment from 'react-moment';
import Axios from 'axios';
import { payOrder } from './../redux/actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { Link } from 'react-router-dom';

export default function OrderPage(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);

    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay
    } = orderPay;

    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <div id="content" className="site-content" tabIndex={-1}>
                <div className="col-full">
                    <div className="pizzaro-breadcrumb">
                        <nav className="woocommerce-breadcrumb">
                            <a href="index.html">Home</a>
                            <span className="delimiter">
                                <i className="po po-arrow-right-slider" />
                            </span>
                            Checkout
                            <span className="delimiter">
                                <i className="po po-arrow-right-slider" />
                            </span>
                            <Link to={'#'}>Order Received</Link>
                        </nav>
                    </div>
                    <div id="primary" className="content-area">
                        <main id="main" className="site-main">
                            <div
                                id="post-9"
                                className="post-9 page type-page status-publish hentry"
                            >
                                <header className="entry-header">
                                    <div
                                        className={`entry-title-before-img ${
                                            order.paymentMethod === 'Stripe' ||
                                            order.isPaid
                                                ? 'entry-title-before-active'
                                                : ''
                                        }`}
                                    >
                                        <svg
                                            height="252pt"
                                            viewBox="0 -21 512.016 512"
                                            width="252pt"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="m234.667969 469.339844c-129.386719 0-234.667969-105.277344-234.667969-234.664063s105.28125-234.6679685 234.667969-234.6679685c44.992187 0 88.765625 12.8203125 126.589843 37.0976565 7.425782 4.78125 9.601563 14.679687 4.820313 22.125-4.796875 7.445312-14.675781 9.597656-22.121094 4.820312-32.640625-20.972656-70.441406-32.042969-109.289062-32.042969-111.746094 0-202.667969 90.921876-202.667969 202.667969 0 111.742188 90.921875 202.664063 202.667969 202.664063 111.742187 0 202.664062-90.921875 202.664062-202.664063 0-6.679687-.320312-13.292969-.9375-19.796875-.851562-8.8125 5.589844-16.621094 14.378907-17.472656 8.832031-.8125 16.617187 5.589844 17.472656 14.378906.722656 7.53125 1.085937 15.167969 1.085937 22.890625 0 129.386719-105.277343 234.664063-234.664062 234.664063zm0 0" />
                                            <path d="m261.332031 288.007812c-4.09375 0-8.191406-1.558593-11.304687-4.691406l-96-96c-6.25-6.253906-6.25-16.386718 0-22.636718s16.382812-6.25 22.632812 0l84.695313 84.695312 223.335937-223.339844c6.253906-6.25 16.386719-6.25 22.636719 0s6.25 16.382813 0 22.632813l-234.667969 234.667969c-3.136718 3.113281-7.230468 4.671874-11.328125 4.671874zm0 0" />
                                        </svg>
                                    </div>

                                    <h1 className="entry-title">
                                        Order Received
                                        {!order.isPaid &&
                                            order.paymentMethod !==
                                                'Stripe' && (
                                                <li>
                                                    <>
                                                        {errorPay && (
                                                            <MessageBox variant="danger">
                                                                {errorPay}
                                                            </MessageBox>
                                                        )}
                                                        {loadingPay && (
                                                            <LoadingBox></LoadingBox>
                                                        )}

                                                        <PayPalButton
                                                            amount={order.totalPrice.toFixed(
                                                                2
                                                            )}
                                                            onSuccess={
                                                                successPaymentHandler
                                                            }
                                                        ></PayPalButton>
                                                    </>
                                                </li>
                                            )}
                                    </h1>
                                </header>

                                <div
                                    classname="form-row place-order"
                                    style={{ textAlign: 'center' }}
                                ></div>
                                {/* .entry-header */}
                                <div className="entry-content">
                                    <div className="woocommerce">
                                        <p className="woocommerce-thankyou-order-received">
                                            Thank you. Your order has been
                                            received.
                                        </p>
                                        <ul className="woocommerce-thankyou-order-details order_details">
                                            <li className="order">
                                                Order Number:
                                                <strong>{order._id}</strong>
                                            </li>
                                            <li className="date">
                                                Date:TIME
                                                <strong>
                                                    <Moment
                                                        interval={0}
                                                        format="DD-MM-YYYY / HH:mm"
                                                    >
                                                        {order.createdAt}
                                                    </Moment>
                                                </strong>
                                            </li>
                                            <li className="total">
                                                Total:
                                                <strong>
                                                    <span className="woocommerce-Price-amount amount">
                                                        <span className="woocommerce-Price-currencySymbol">
                                                            {`${order.totalPrice.toFixed(
                                                                2
                                                            )} `}
                                                        </span>
                                                        ₼
                                                    </span>
                                                </strong>
                                            </li>
                                            <li className="method">
                                                Payment Method:
                                                <div className="paymentMethod-class_wrap">
                                                    <strong>
                                                        {order.paymentMethod}
                                                    </strong>

                                                    {order.isPaid ? (
                                                        <span>
                                                            <strong>
                                                                Paid at
                                                                {order.paidAt}
                                                            </strong>
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <strong>
                                                                Not Paid
                                                            </strong>
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
                                        {order.paymentMethod !== 'Stripe' ? (
                                            <div>
                                                <div className="clear" />
                                                <p>
                                                    Make your payment directly
                                                    into our bank account.
                                                    Please use your Order ID as
                                                    the payment reference. Your
                                                    order won’t be shipped until
                                                    the funds have cleared in
                                                    our account.
                                                    {order.isDelivered ? (
                                                        <MessageBox variant="success">
                                                            Delivered at
                                                            {order.deliveredAt}
                                                        </MessageBox>
                                                    ) : (
                                                        <MessageBox variant="danger">
                                                            Not Delivered
                                                        </MessageBox>
                                                    )}
                                                </p>
                                            </div>
                                        ) : (
                                            <p>
                                                Ваш заказ скоро будеть
                                                доставлен. Наш курьер с Вами
                                                свяжется в кратчайшие сроки.
                                                Благодарим за выбор - мы ценим
                                                ваше доверие! приятного вам
                                                аппетита.
                                            </p>
                                        )}

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
                                            {order.orderItems.map(
                                                (obj, index) => (
                                                    <tbody>
                                                        <tr className="order_item">
                                                            <td
                                                                className="product-name"
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center'
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        obj.img
                                                                    }
                                                                    width={90}
                                                                    height={90}
                                                                    style={{
                                                                        marginRight:
                                                                            '10px'
                                                                    }}
                                                                />
                                                                <div>
                                                                    <a href="single-product-v1.html">
                                                                        {
                                                                            obj.name
                                                                        }
                                                                    </a>
                                                                    <strong className="product-quantity">
                                                                        ×
                                                                        {`${order.countOneProduct[index]} (1ed ${obj.price} ₼)`}
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
                                                                                {`${obj.size} sm`}
                                                                            </p>
                                                                        </dd>
                                                                    </dl>
                                                                </div>
                                                            </td>
                                                            <td className="product-total">
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        {`${(
                                                                            obj.price *
                                                                            order
                                                                                .countOneProduct[
                                                                                index
                                                                            ]
                                                                        ).toFixed(
                                                                            2
                                                                        )} `}
                                                                    </span>
                                                                    ₼
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            )}

                                            <tfoot>
                                                <tr>
                                                    <th scope="row">
                                                        Payment Method:
                                                    </th>
                                                    <td>
                                                        {order.paymentMethod}
                                                    </td>
                                                </tr>

                                                {order.couponProccentAdd >
                                                    0 && (
                                                    <>
                                                        <tr scope="row">
                                                            <th>Coupon</th>
                                                            <td>
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        -{' '}
                                                                        {
                                                                            order.couponProccentAdd
                                                                        }{' '}
                                                                        ₼
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr scope="row">
                                                            <th>Old Price</th>
                                                            <td>
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        {`${(
                                                                            order.totalPrice +
                                                                            +order.couponProccentAdd
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
                                                        {order.couponProccentAdd ===
                                                        0
                                                            ? 'Total'
                                                            : 'New Total'}
                                                        :
                                                    </th>
                                                    <td>
                                                        <span className="woocommerce-Price-amount amount">
                                                            <span className="woocommerce-Price-currencySymbol">
                                                                {`${order.totalPrice.toFixed(
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
                                                    <td>{order.userName}</td>
                                                </tr>
                                                <tr>
                                                    <th>Telephone:</th>
                                                    <td>
                                                        {
                                                            order
                                                                .shippingAddress
                                                                .phone
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <header className="title">
                                            <h3>Billing Address</h3>
                                        </header>
                                        <address>
                                            {order.shippingAddress.address}
                                        </address>
                                    </div>
                                </div>
                                {/* .entry-content */}
                            </div>
                            {/* #post-## */}
                        </main>
                        {/* #main */}
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
}
