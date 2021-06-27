const initialState = {
    category: null
    // sortBy: {
    //     type: 'popular',
    //     order: 'desc'
    // }
};

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;
    }
};

export default filtersReducer;
