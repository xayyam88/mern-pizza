import {
    CART_EMPTY,
    CART_SAVE_SHIPPING_ADDRESS,
    MINUS_CART_ITEM,
    REMOVE_CART_ITEM
} from '../../constants/cartConstants';
import {
    ADD_PIZZA_CART,
    PLUS_CART_ITEM
} from './../../constants/cartConstants';

const initialState = {
    items: localStorage.getItem('items')
        ? JSON.parse(localStorage.getItem('items'))
        : [],
    couponProccentAdd: JSON.parse(localStorage.getItem('couponProccentAdd')),
    totalPrice: localStorage.getItem('totalPrice')
        ? JSON.parse(localStorage.getItem('totalPrice'))
        : 0,
    totalCount: localStorage.getItem('totalCount')
        ? JSON.parse(localStorage.getItem('totalCount'))
        : 0,
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {}
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value;
    }, 0);
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PIZZA_CART: {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            localStorage.setItem('items', JSON.stringify(newItems));
            localStorage.setItem('totalCount', JSON.stringify(totalCount));
            localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            };
        }

        case REMOVE_CART_ITEM: {
            const newItems = {
                ...state.items
            };
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload];

            const totalPrice = state.totalPrice - currentTotalPrice;
            const totalCount = state.totalCount - currentTotalCount;

            localStorage.setItem('items', JSON.stringify(newItems));

            localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

            localStorage.setItem('totalCount', JSON.stringify(totalCount));

            if (totalCount === 0) {
                localStorage.removeItem('items');
                localStorage.removeItem('totalCount');
                localStorage.removeItem('totalPrice');
                localStorage.removeItem('couponProccentAdd');
            }

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount
            };
        }

        case PLUS_CART_ITEM: {
            const newObjItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ];
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems)
                }
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            localStorage.setItem('items', JSON.stringify(newItems));
            localStorage.setItem('totalCount', JSON.stringify(totalCount));
            localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            };
        }

        case MINUS_CART_ITEM: {
            const oldItems = state.items[action.payload].items;
            const newObjItems =
                oldItems.length > 1
                    ? state.items[action.payload].items.slice(1)
                    : oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems)
                }
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            localStorage.setItem('items', JSON.stringify(newItems));
            localStorage.setItem('totalCount', JSON.stringify(totalCount));
            localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            };
        }

        case CART_EMPTY:
            return { totalPrice: 0, totalCount: 0, items: {} };
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        default:
            return state;
    }
};

export default cartReducer;
