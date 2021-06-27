import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const CartButton = (props) => {
    const { totalPrice, totalCount } = useSelector(({ cart }) => cart);
    return (
        <div>
            <ul className="site-header-cart-v2 menu">
                <li className="cart-content ">
                    <a
                        href="https://demo2.chethemes.com/pizzaro/cart/"
                        title="View your shopping cart"
                    >
                        <i className="fas icon-vespa"></i>
                        <span>Səbətə Keçid al</span>
                    </a>
                    <ul className="sub-menu">
                        <li>
                            <Link to="/card">
                                <span className="count">{totalCount} ədəd</span>
                                <span className="amount">
                                    {totalPrice.toFixed(2)}₼
                                </span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default CartButton;
