import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div
            className={
                props.onClick
                    ? 'modal_dialog_product modal_dialog_product_active'
                    : 'modal_dialog_product'
            }
        >
            {props.children}
        </div>,
        document.getElementById('modal_root')
    );
};

export default Modal;
