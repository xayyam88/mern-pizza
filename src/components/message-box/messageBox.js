import React from 'react';

const MessageBox = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            <div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout">
                <ul class="woocommerce-error" role="alert">
                    <li data-id="billing_email">
                        <strong>{props.children}</strong>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MessageBox;
