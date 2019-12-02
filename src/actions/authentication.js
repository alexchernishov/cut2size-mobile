// import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {postForm} from '../api/main';


export const setToken = (payload) =>(
    {
        type: 'AUTH_TOKEN',
        payload: payload,
    }
);

export const loginUser = (user) => dispatch => {
    postForm('site','/users/login', user)
        .then(res => {
            const { token } = res;
            // localStorage.setItem('jwtToken', token);
            // setAuthToken(token);
            const decoded = jwt_decode(token);
            console.warn('TOKEN',decoded)
            // dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERRORS',
                payload: err.response.data
            });
        });
};

export const setCurrentCustomer = decoded => {
    return {
        type: 'SET_CURRENT_CUSTOMER',
        payload: decoded
    }
};


/*

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if(history){
        history.push('/login');
    }else{
        window.location.href = '/login'
    }
};
export const setCurrentCustomer = decoded => {
    return {
        type: 'SET_CURRENT_CUSTOMER',
        payload: decoded
    }
};

export const logoutCustomer = (history) => dispatch => {
    localStorage.removeItem('customerToken');
    dispatch(setCurrentCustomer({}));
    if(history){
        history.push('/');
    }else{
        window.location.href = '/'
    }
};

export const setUserFromLocalStorage = () => dispatch => {
    if(typeof(Storage) !== "undefined"){
        if(localStorage.jwtToken) {
            const decoded = jwt_decode(localStorage.jwtToken);
            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime) {
                dispatch(logoutUser());
            }else{
                dispatch(setCurrentUser(decoded));
                setAuthToken(localStorage.jwtToken);
            }
        }
    }

};
export const setCustomerFromLocalStorage = () => dispatch => {
    if(typeof(Storage) !== "undefined"){
        if(localStorage.customerToken) {
            const decoded = jwt_decode(localStorage.customerToken);
            const currentTime = Date.now() / 1000;
            if(decoded.exp < currentTime) {
                dispatch(logoutCustomer());
            }else{
                dispatch(setCurrentCustomer(decoded));
                setAuthToken(localStorage.customerToken);
            }
        }
    }

};
*/
