import isEmpty from '../validation/is-empty'


const initialState = {
    authToken: false,
    isAuthenticated: false,
    isCustomerAuthenticated: false,
    user: {},
    customer: {},
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'AUTH_TOKEN': {
            return {
                // State
                ...state,
                // Redux Store
                authToken: action.payload,
            }
        }
        case 'SET_CURRENT_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case 'SET_CURRENT_CUSTOMER':
            return {
                ...state,
                isCustomerAuthenticated: !isEmpty(action.payload),
                customer: action.payload
            };
        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default authReducer;
