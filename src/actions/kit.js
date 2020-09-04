
import {get} from "../api/main";
import {store} from '../store/store';

export const getCalcRooms = (filterroom) => dispatch => {
    filterroom = (filterroom!== undefined && (typeof filterroom !=='object')) ? filterroom : '';

    return get('calc','/kit/api/room?fields=id,name,big_image&extraFields=id,name,alias,link,path,big_image,small_image&expand=kitCategories'+filterroom )

        .then(res => {
            const rooms = res;

            store.dispatch(setCalcRooms(rooms));
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: 'GET_ERRORS',
                payload: err.response ? err.response.data : err
            });
        });
};
export const setKitType = (itemType) => {
   return store.dispatch(setType({itemType: itemType}));

};
export const setKitItem = (kitItem) => {
    kitItem.calcCategory  = kitItem.calcCategories[0];
    return store.dispatch(setKit({kitItem: kitItem}));
};
export const getCalcCategories = () => dispatch => {

    return get('calc','/kit/api/calc-category?fields=id,name,slug,image,base' )

        .then(res => {
            const categories = res;
            store.dispatch(setCalcCategories(categories));
        })
        .catch(err => {
            console.log(err);
            store.dispatch({
                type: 'GET_ERRORS',
                payload: err.response ? err.response.data : err
            });
        });
};


export const setRoom = kit => ({ type: 'SET_ROOM', payload: kit.room });
export const setType = kit => ({ type: 'SET_TYPE', payload: kit.itemType });
export const setKit =  kit => ({ type: 'SET_KIT',  payload: kit.kitItem });
export const setPrice =  kit => ({ type: 'SET_PRICE',  payload: kit.price });
export const setCabinet =  kit => ({ type: 'SET_CABINET',  payload: kit.cabinet });

export const setCalcRooms = room => {
    return {
        type: 'SET_CALC_ROOMS',
        payload: room
    }
};

export const setCalcCategories = categories => {
    return {
        type: 'SET_CALC_CATEGORIES',
        payload: categories
    }
};
export const showPriceButton = state => {
    return {
        type: 'SHOW_PRICE_BUTTON',
        payload: state
    }
};
export const setCalcOptions = state => {
    return {
        type: 'SET_CALC_OPTIONS',
        payload: state
    }
}
;

