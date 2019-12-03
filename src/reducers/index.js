
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import kitReducer from './kitReducer';
import cartReducer from './cartReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer,
    kitReducer: kitReducer,
    cartReducer: cartReducer,
});

// Exports
export default rootReducer;
