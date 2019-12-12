
import { CALC_API_URL, API_URL } from 'react-native-dotenv'
import logoutAction from '../screens/auth/logoutAction';

export const postForm = (type='API',url,params, token=false, props=false, method='POST') => {
    let apiUrl = (type==='API') ? API_URL : CALC_API_URL;

    let config = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    };

    if(token){
        token  = token.indexOf('Bearer')!==-1 ? token :  'Bearer '+token;
        config.headers['Authorization'] = token
    }
    return fetch(apiUrl+url,config)
        .then((response) => {
            if(response && (response.status===404 || response.status===504 )){
                return {error:'Not found'}
            }
            if(response.status===401){
                if(props && props.setToken&&
                    props.setCurrentCustomer&&
                    props.clearCart&&
                    props.navigation){
                    return logoutAction(props);
                }
                return {
                    errors:'Unauthorized',
                    status:401

                }
            }
            return response.json()
        })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
};


export const get = (type='API',url, token=false, props=false) => {

    let apiUrl = (type==='API') ? API_URL : CALC_API_URL;

    let config = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    if(token){
        token  = token.indexOf('Bearer')!==-1 ? token :  'Bearer '+token;
        config.headers['Authorization'] = token
    }
    return fetch(apiUrl+url,config)
        .then((response) => {

            if(response.status ){
                if(response.status===200){
                    return response.json()
                }
                if(response.status===404){
                    return {
                        errors:'Not found',
                        status:404
                    }
                }
                if(response.status===401){
                    if(props && props.setToken&&
                            props.setCurrentCustomer&&
                            props.clearCart&&
                            props.navigation){
                        return logoutAction(props);
                    }

                    return {
                        errors:'Unauthorized',
                        status:401

                    }
                }
            }
        })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
            return {
                error:error
            };
        });
};






