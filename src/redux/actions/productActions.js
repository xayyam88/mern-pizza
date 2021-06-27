import Axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL
} from '../../constants/productConstants';
import axios from 'axios';

export const listProducts = (category) => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST, payload: false });

    try {
        const { data } = await Axios.get(`/api/products?category=${category}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

export const deleteProdcut = (_id) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo }
        } = getState();
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: _id });
        const { data } = await axios.delete('/api/products/delete/' + _id, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
            success: true
        });
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
};

export const createdProduct = (
    _id,
    name,
    imageUrl,
    types,
    sizes,
    descPizz,
    energyValue,
    protein,
    fats,
    carbohydrates,
    weight,
    price,
    category,
    description,
    productsAdditiveSave,
    productsListSave,
    halveedCheckout,
    rating,
    imageSize
) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_CREATE_REQUEST,
        payload: {
            name,
            imageUrl,
            types,
            sizes,
            descPizz,
            energyValue,
            protein,
            fats,
            carbohydrates,
            weight,
            price,
            category,
            description,
            productsAdditiveSave,
            productsListSave,
            halveedCheckout,
            rating,
            imageSize
        }
    });

    try {
        const {
            userSignin: { userInfo }
        } = getState();
        if (!_id) {
            const { data } = await Axios.post(
                '/api/products',
                {
                    name,
                    imageUrl,
                    types,
                    sizes,
                    descPizz,
                    energyValue,
                    protein,
                    fats,
                    carbohydrates,
                    weight,
                    price,
                    category,
                    description,
                    productsAdditiveSave,
                    productsListSave,
                    halveedCheckout,
                    rating,
                    imageSize
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token
                    }
                }
            );

            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
            localStorage.setItem('success', JSON.stringify(data));
        } else {
            const { data } = await Axios.put(
                '/api/products/create/' + _id,
                {
                    _id,
                    name,
                    imageUrl,
                    types,
                    sizes,
                    descPizz,
                    energyValue,
                    protein,
                    fats,
                    carbohydrates,
                    weight,
                    price,
                    category,
                    description,
                    productsAdditiveSave,
                    productsListSave,
                    halveedCheckout,
                    rating,
                    imageSize
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token
                    }
                }
            );

            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
            localStorage.setItem('success', JSON.stringify(data));
        }
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};
