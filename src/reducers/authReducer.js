// Initial State
const initialState = {
    authToken: false,
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
        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default authReducer;
