import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//productReducers
import {
    productDetailsReducer,
    productListReducer,
    productCreatedReducer,
    productDeleteReducer
} from './reducers/productReducers';
//userReducers
import {
    userSigninReducer,
    userRegisterReducer
} from './reducers/userReducers';
//filtersReducer
import filtersReducer from './reducers/filtersReducers';
//cartReducers
import cartReducers from './reducers/cartReducers';
//orderReducers
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderMineListReducer
} from './reducers/orderReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productCreated: productCreatedReducer,
    deleteProdcut: productDeleteReducer,
    filters: filtersReducer,
    cart: cartReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
