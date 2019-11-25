


const initialState = {
    room: false,
    calcRooms:false,
    calcCategories:false,
    itemType: false,
    kitItem: false,
    price:false,
    showPriceButton:false,
    calcOptions : false,
    cabinet : true,
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case 'SET_ROOM':
            return {
                ...state,
                room: action.payload
            };
        case 'SET_TYPE':
            return {
                ...state,
                itemType: action.payload
            };
        case 'SET_KIT':
            return {
                ...state,
                kitItem: action.payload
            };
        case 'SET_PRICE':
            return {
                ...state,
                price: action.payload
            };
        case 'SET_CALC_ROOMS':
            return {
                ...state,
                calcRooms: action.payload
            };
        case 'SET_CALC_CATEGORIES':
            return {
                ...state,
                calcCategories: action.payload
            };
        case 'SHOW_PRICE_BUTTON':
            return {
                ...state,
                showPriceButton: action.payload
            };
        case 'SET_CALC_OPTIONS':
            return {
                ...state,
                calcOptions: action.payload
            };
        case 'SET_CABINET':
            return {
                ...state,
                cabinet: action.payload
            };
        default:
            return state;
    }
}
