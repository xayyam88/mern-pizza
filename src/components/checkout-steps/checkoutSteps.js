import React from 'react';

const propTypes = {};

const defaultProps = {};

const checkoutSteps = (props) => {
    return (
        <div className="pizzaro-order-steps">
            <ul>
                <li className={`cart ${props.step ? 'cart_bold' : ''}`}>
                    <span className={`step ${props.step ? 'active' : ''}`}>
                        1
                    </span>
                    Shopping Cart
                </li>
                <li className={`cart ${props.step1 ? 'cart_bold' : ''}`}>
                    <span className={`step ${props.step1 ? 'active' : ''}`}>
                        2
                    </span>
                    Checkout
                </li>
                <li className={`cart ${props.step2 ? 'cart_bold' : ''}`}>
                    <span className={`step ${props.step2 ? 'active' : ''}`}>
                        3
                    </span>
                    Order Complete
                </li>
            </ul>
        </div>
    );
};

checkoutSteps.propTypes = propTypes;
checkoutSteps.defaultProps = defaultProps;

export default checkoutSteps;
