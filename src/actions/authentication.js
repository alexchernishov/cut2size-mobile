// import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {get, postForm} from '../api/main';


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

export const getAccountInfo=(id,props,inputs)=>{
      return  get('API','customers/'+id,props.authToken, props)
            .then(res=>{

                if(res.errors){
                    return res;
                }else{

                    let customerFields = inputs;
                    for(let i in Object.keys(customerFields)){
                        let key = Object.keys(customerFields)[i];
                        if(res[key]){
                            customerFields[key].value = res[key]
                        }
                    }
                    return {account:res, inputs:customerFields}
                }
            })
            .catch(error=>{
                return error;
            });
};

