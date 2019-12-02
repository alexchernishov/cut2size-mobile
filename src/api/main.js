
import { CALC_API_URL, API_URL } from 'react-native-dotenv'

export const postForm = (type='API',url,params, token=false) => {
    let apiUrl = (type==='API') ? API_URL : CALC_API_URL;

    let config = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    };

    if(token){
        config.headers['Authorization'] = 'Bearer '+token
    }


        console.log(apiUrl+url);
    return fetch(apiUrl+url,config)
        .then((response) => {
            if(response && response.status===404){
                return {error:'Not found'}
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


export const get = (type='API',url, token=false) => {

    let apiUrl = (type==='API') ? API_URL : CALC_API_URL;

    let config = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    if(token){
        config.headers['Authorization'] = 'Bearer '+token
    }

    return fetch(apiUrl+url,config)
        .then((response) => {
            if(response.status ){
                if(response.status===200){
                    return response.json()
                }
                if(response.status===404){
                    return 'Not found'
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






