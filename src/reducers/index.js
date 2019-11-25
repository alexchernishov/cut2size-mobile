
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import kitReducer from './kitReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer,
    kitReducer: kitReducer,
});

// Exports
export default rootReducer;
