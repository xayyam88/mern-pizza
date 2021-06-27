import {
    ADD_PIZZA_CART,
    REMOVE_CART_ITEM,
    PLUS_CART_ITEM,
    MINUS_CART_ITEM,
    CART_EMPTY,
    CART_SAVE_SHIPPING_ADDRESS
} from '../../constants/cartConstants';

export const addPizzaToCart = (pizzaObj, getState) => ({
    type: ADD_PIZZA_CART,
    payload: pizzaObj
});

export const clearCart = () => ({
    type: CART_EMPTY
});

export const removeCartItem = (id) => ({
    type: REMOVE_CART_ITEM,
    payload: id
});

export const plusCartItem = (id) => ({
    type: PLUS_CART_ITEM,
    payload: id
});

export const minusCartItem = (id) => ({
    type: MINUS_CART_ITEM,
    payload: id
});

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};
