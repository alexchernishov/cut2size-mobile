
const initialState = {
    products: false,
    total: false,
    quantityTotal: false,
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case 'SET_CART_PRODUCTS':
            return {
                ...state,
                products: action.payload.products,
                total: action.payload.total,
                quantityTotal: action.payload.quantityTotal
            };

        default:
            return state;
    }
}
