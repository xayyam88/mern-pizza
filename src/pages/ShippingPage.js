/* eslint-disable no-octal-escape */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/checkout-steps/checkoutSteps';
import { saveShippingAddress } from '../redux/actions/cartActions';
import InputMask from 'react-input-mask';
import AutoComplete from 'react-google-autocomplete';

import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyCDu2VjGH-8M1nd01xUPNedqIo8xFSmpio');
Geocode.enableDebug();

function ShippingPage(props) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    let shippingAddress2 = JSON.parse(localStorage.getItem('shippingAddress'));

    const [city, setCity] = useState(
        shippingAddress !== undefined
            ? shippingAddress.city
            : shippingAddress2.city
    );
    const [address, setAddress] = useState(
        shippingAddress !== undefined
            ? shippingAddress.address
            : shippingAddress2.address
    );
    const [phone, setPhone] = useState(
        shippingAddress !== undefined
            ? shippingAddress.phone
            : shippingAddress2.phone
    );
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [currentPosition, setCurrentPosition] = useState(
        shippingAddress !== undefined
            ? shippingAddress.currentPosition
            : shippingAddress2.currentPosition
    );
    const userSignin = useSelector((state) => state.userSignin);
    const { totalPrice, totalCount, items, couponProccentAdd } = useSelector(
        ({ cart }) => cart
    );

    const addedPizzas = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const { userInfo } = userSignin;

    if (!userInfo) {
        props.history.push('/signin');
    }

    const placeOrderHandler = (e) => {
        e.preventDefault();

        dispatch(
            saveShippingAddress({
                city,
                address,
                phone,
                currentPosition,
                paymentMethod
            })
        );

        props.history.push('/placeorder');
    };

    function onMarkerDragEnd(e) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        Geocode.fromLatLng(lat, lng).then((response) => {
            if (response.results[0].address_components[3] === undefined) {
                setCity(response.results[0].address_components[1].long_name);
            } else {
                setCity(response.results[0].address_components[3].long_name);
            }

            setCity(
                response.results[0].address_components[3].long_name ===
                    undefined
                    ? response.results[0].address_components[1].long_name
                    : response.results[0].address_components[3].long_name
            );
            setAddress(
                `${response.results[0].address_components[2].long_name}, ${response.results[0].address_components[0].long_name} ${response.results[0].address_components[1].long_name}`
            );
        });

        // console.log(lat, lng);

        setCurrentPosition({ lat, lng });
    }

    function onPlaceSelected(place) {
        setCity(place.address_components[3].long_name);
        setAddress(
            `${place.address_components[2].long_name}, ${place.address_components[0].long_name} ${place.address_components[1].long_name}`
        );

        let lat = place.geometry.location.lat();
        let lng = place.geometry.location.lng();

        setCurrentPosition({ lat, lng });
    }

    const MapWithAMarker = withScriptjs(
        withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={13}
                defaultCenter={currentPosition}
                panControl={false}
                mapTypeControl={false}
                scrollwheel={false}
            >
                <Marker
                    draggable={true}
                    onDragEnd={(e) => onMarkerDragEnd(e)}
                    position={currentPosition}
                >
                    <InfoWindow>
                        <div>{address ? address : 'Pizzaro'}</div>
                    </InfoWindow>
                </Marker>

                <p className="form-row form-row-wide address-field update_totals_on_change validate-google-search">
                    <span className="woocommerce-input-wrapper">
                        <br />
                        <AutoComplete
                            className="input-text"
                            onPlaceSelected={(place) => onPlaceSelected(place)}
                            types={[currentPosition]}
                            componentRestrictions={{ country: 'az' }}
                        />
                    </span>
                </p>
            </GoogleMap>
        ))
    );

    React.useEffect(() => {
        // componentWillUnmount
        window.scroll({
            top: 200,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="col-full">
            <div className="pizzaro-breadcrumb">
                <nav className="woocommerce-breadcrumb">
                    <a href="https://demo2.chethemes.com/pizzaro">Home</a>
                    <span className="delimiter">
                        <i className="po po-arrow-right-slider" />
                    </span>
                    Checkout
                </nav>
            </div>
            <div id="primary" className="content-area">
                <main id="main" className="site-main" role="main">
                    <CheckoutSteps step step1 step></CheckoutSteps>
                    <div
                        id="post-577"
                        className="post-577 page type-page status-publish hentry"
                    >
                        <div className="entry-content">
                            <div className="woocommerce">
                                <div />
                                <form className="checkout woocommerce-checkout">
                                    <div
                                        className="col2-set"
                                        id="customer_details"
                                    >
                                        <div className="col-1">
                                            <div className="woocommerce-billing-fields">
                                                <h3>Billing details</h3>
                                                <div className="woocommerce-billing-fields__field-wrapper">
                                                    <p className="form-row form-row-wide validate-required validate-phone">
                                                        <label
                                                            htmlFor="billing_phone"
                                                            className
                                                        >
                                                            Whatsapp number
                                                            &nbsp;
                                                            <abbr
                                                                className="required"
                                                                title="required"
                                                            >
                                                                *
                                                            </abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <InputMask
                                                                mask="+\9\9\4(99) 999-99-99"
                                                                placeholder="+994(__) ___-__-__"
                                                                maskChar={null}
                                                                value={phone}
                                                                type="tel"
                                                                className="input-text "
                                                                onChange={(e) =>
                                                                    setPhone(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            ></InputMask>

                                                            {/* 
                                                            <input
                                                                type="tel"
                                                                className="input-text "
                                                                placeholder="Phone"
                                                                value={phone}
                                                                onChange={(e) =>
                                                                    setPhone(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            /> */}
                                                        </span>
                                                    </p>

                                                    <label
                                                        htmlFor="billing_phone"
                                                        className
                                                    >
                                                        Unvani xeritede axtar
                                                        &nbsp;
                                                        <abbr
                                                            className="required"
                                                            title="required"
                                                        >
                                                            *
                                                        </abbr>
                                                    </label>

                                                    <MapWithAMarker
                                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDu2VjGH-8M1nd01xUPNedqIo8xFSmpio&v=3.exp&libraries=geometry,drawing,places"
                                                        loadingElement={
                                                            <div
                                                                style={{
                                                                    height:
                                                                        '400px'
                                                                }}
                                                            />
                                                        }
                                                        containerElement={
                                                            <div
                                                                style={{
                                                                    height:
                                                                        '400px'
                                                                }}
                                                            />
                                                        }
                                                        mapElement={
                                                            <div
                                                                style={{
                                                                    height:
                                                                        '100%'
                                                                }}
                                                            />
                                                        }
                                                    />

                                                    <p className="form-row form-row-wide address-field update_totals_on_change validate-required1">
                                                        <label
                                                            htmlFor="billing_country"
                                                            className
                                                        >
                                                            Sity&nbsp;
                                                            <abbr
                                                                className="required"
                                                                title="required"
                                                            >
                                                                *
                                                            </abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input
                                                                type="text"
                                                                className="input-text "
                                                                placeholder="City"
                                                                value={city}
                                                                onChange={(e) =>
                                                                    setCity(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </span>
                                                    </p>
                                                    <p className="form-row form-row-wide address-field validate-required">
                                                        <label
                                                            htmlFor="billing_address_1"
                                                            className
                                                        >
                                                            Street address&nbsp;
                                                            <abbr
                                                                className="required"
                                                                title="required"
                                                            >
                                                                *
                                                            </abbr>
                                                        </label>
                                                        <span className="woocommerce-input-wrapper">
                                                            <input
                                                                type="text"
                                                                className="input-text "
                                                                placeholder="House number and street name"
                                                                value={address}
                                                                onChange={(e) =>
                                                                    setAddress(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 id="order_review_heading">
                                        Your order
                                    </h3>
                                    <div
                                        id="order_review"
                                        className="woocommerce-checkout-review-order"
                                    >
                                        <table className="shop_table woocommerce-checkout-review-order-table">
                                            <thead>
                                                <tr>
                                                    <th className="product-name">
                                                        Product
                                                    </th>
                                                    <th className="product-total">
                                                        Subtotal
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {addedPizzas.map((obj) => (
                                                    <tr className="cart_item">
                                                        <td className="product-name">
                                                            {obj.name}&nbsp;
                                                            <strong className="product-quantity">
                                                                ×&nbsp;
                                                                {`${
                                                                    items[
                                                                        obj.id
                                                                    ].items
                                                                        .length
                                                                } (1ed ${
                                                                    obj.price
                                                                } ₼)`}
                                                            </strong>
                                                            <dl className="variation">
                                                                <dt className="variation-PickSizespanclasswoocommerce-Price-amountamountspanclasswoocommerce-Price-currencySymbolpoundspan1990span">
                                                                    <span className="woocommerce-Price-amount amount">
                                                                        <span
                                                                            className="woocommerce-Price-currencySymbol"
                                                                            style={{
                                                                                width:
                                                                                    '50px'
                                                                            }}
                                                                        >
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
                                                                        </span>
                                                                    </span>
                                                                </dt>
                                                                <dd className="variation-PickSizespanclasswoocommerce-Price-amountamountspanclasswoocommerce-Price-currencySymbolpoundspan1990span">
                                                                    <p>
                                                                        {`${obj.size} sm`}
                                                                    </p>
                                                                </dd>
                                                            </dl>
                                                        </td>
                                                        <td
                                                            className="product-total"
                                                            style={{
                                                                width: '140px',
                                                                textAlign:
                                                                    'right'
                                                            }}
                                                        >
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
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="cart-subtotal">
                                                    <th>Quantity</th>
                                                    <td>
                                                        <span className="woocommerce-Price-amount amount">
                                                            <span className="woocommerce-Price-currencySymbol">
                                                                {totalCount}
                                                            </span>
                                                        </span>
                                                    </td>
                                                </tr>

                                                {couponProccentAdd > 0 && (
                                                    <>
                                                        <tr className="cart-subtotal">
                                                            <th>Coupon</th>
                                                            <td>
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        -{' '}
                                                                        {
                                                                            couponProccentAdd
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
                                                                            totalPrice +
                                                                            +couponProccentAdd
                                                                        ).toFixed(
                                                                            2
                                                                        )} `}
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )}

                                                <tr className="order-total">
                                                    <th>
                                                        {couponProccentAdd === 0
                                                            ? 'Total'
                                                            : 'New Total'}
                                                    </th>
                                                    <td>
                                                        <strong>
                                                            <span className="woocommerce-Price-amount amount">
                                                                <span className="woocommerce-Price-currencySymbol">
                                                                    {`${totalPrice.toFixed(
                                                                        2
                                                                    )} `}
                                                                </span>
                                                                ₼
                                                            </span>
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <div
                                            id="payment"
                                            className="woocommerce-checkout-payment"
                                        >
                                            <form className="form">
                                                <ul className="wc_payment_methods payment_methods methods">
                                                    <li className="wc_payment_method payment_method_bacs">
                                                        <input
                                                            type="radio"
                                                            id="paypal"
                                                            value="PayPal"
                                                            className="input-radio"
                                                            name="paymentMethod"
                                                            required
                                                            checked
                                                            onChange={(e) =>
                                                                setPaymentMethod(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        ></input>
                                                        <label htmlFor="paypal">
                                                            Direct Bank Transfer
                                                        </label>

                                                        <div className="payment_box payment_method_bacs">
                                                            <p>
                                                                Make your
                                                                payment directly
                                                                into our bank
                                                                account. Please
                                                                use your Order
                                                                ID as the
                                                                payment
                                                                reference. Your
                                                                order won’t be
                                                                shipped until
                                                                the funds have
                                                                cleared in our
                                                                account.
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li className="wc_payment_method payment_method_bacs">
                                                        <input
                                                            type="radio"
                                                            id="stripe"
                                                            className="input-radio"
                                                            value="Stripe"
                                                            name="paymentMethod"
                                                            required
                                                            onChange={(e) =>
                                                                setPaymentMethod(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        ></input>
                                                        <label htmlFor="stripe">
                                                            Cash on Delivery
                                                        </label>
                                                    </li>
                                                </ul>
                                            </form>
                                            <div className="form-row place-order">
                                                <button
                                                    type="submit"
                                                    className="button alt"
                                                    onClick={placeOrderHandler}
                                                    disabled={!phone}
                                                >
                                                    Place order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* .entry-content */}
                    </div>
                    {/* #post-## */}
                </main>
                {/* #main */}
            </div>
            {/* #primary */}
        </div>
    );
}
export default ShippingPage;
