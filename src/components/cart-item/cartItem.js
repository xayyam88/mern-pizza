/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({
    id,
    name,
    type,
    size,
    price,
    totalPrice,
    totalCount,
    couponProccentAdd,
    onRemove,
    onMinus,
    onPlus,
    img,
    productsAdditiveName
}) => {
    const handleRemoveClick = () => {
        onRemove(id);
    };

    const handlePluseItem = () => {
        onPlus(id);
    };

    const handleMinusItem = () => {
        onMinus(id);
    };

    return (
        <>
            <tr className="woocommerce-cart-form__cart-item cart_item">
                <td className="product-remove">
                    <Link onClick={handleRemoveClick}>
                        <i
                            className="fa fa-remove"
                            style={{
                                fontSize: 16,
                                fontWeight: 400
                            }}
                        />
                    </Link>
                </td>
                <td className="product-thumbnail">
                    <a href="https://demo2.chethemes.com/pizzaro/product/apricot-chicken/">
                        <img
                            src={img}
                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                            sizes="(max-width: 300px) 100vw, 300px"
                            width={300}
                            height={300}
                        />
                    </a>{' '}
                </td>
                <td className="product-name" data-title="Product">
                    <a href="https://demo2.chethemes.com/pizzaro/product/apricot-chicken/">
                        {name}
                    </a>
                    <dl className="variation">
                        <dt className="variation-PickSizespanclasswoocommerce-Price-amountamountspanclasswoocommerce-Price-currencySymbolpoundspan1990span">
                            {`${
                                type === 0 ? 'Tрадиционное' : 'Тонкое '
                            } тесто: + ${productsAdditiveName}`}
                            <span className="woocommerce-Price-amount amount"></span>
                        </dt>
                        <dd className="variation-PickSizespanclasswoocommerce-Price-amountamountspanclasswoocommerce-Price-currencySymbolpoundspan1990span">
                            <p>{size} cm</p>
                        </dd>
                    </dl>
                </td>
                <td className="product-price" data-title="Price">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                            {`${price} `}
                        </span>
                        ₼
                    </span>
                </td>
                <td className="product-quantity" data-title="Quantity">
                    <div className="quantity buttons_added">
                        <input
                            type="button"
                            defaultValue="-"
                            className="minus"
                            onClick={handleMinusItem}
                            disabled={couponProccentAdd !== 0 ? true : false}
                        />
                        <label htmlFor="quantity_600865e2baacb">Quantity</label>
                        <input
                            type="number"
                            className="input-text qty text"
                            value={totalCount}
                            disabled={couponProccentAdd !== 0 ? true : false}
                        />
                        <input
                            type="button"
                            defaultValue="+"
                            className="plus"
                            onClick={handlePluseItem}
                            disabled={couponProccentAdd !== 0 ? true : false}
                        />
                    </div>
                </td>
                <td className="product-subtotal" data-title="Subtotal">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                            {`${totalPrice.toFixed(2)} `}
                        </span>
                        ₼
                    </span>
                </td>
            </tr>
        </>
    );
};

export default CartItem;
