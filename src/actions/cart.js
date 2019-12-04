
import {store} from "../store/store";
import {filterKeys} from "../functions/main";



export const setCartProducts = (cart_products) => {


    let total = 0;
    let quantityTotal = 0;

    if(cart_products && cart_products.length>0){
        cart_products.map(product=>{
                total+=(product.price_new? product.price_new : product.price)*product.quantity;
                quantityTotal+=parseInt(product.quantity);
                return product;
        }
        );
    }

    return {
        type: 'SET_CART_PRODUCTS',
        payload: {products:cart_products,quantityTotal:quantityTotal,total:total}
    }
};


export const deleteProduct = (id) => {
    let cart_products =store.getState().cartReducer.products;
    for(let i in cart_products){
        if(cart_products[i].id === id){
            cart_products.splice( i, 1 );
            break;
        }
    }

    return store.dispatch(setCartProducts(cart_products));

};

export const clearCart = () => {

    return store.dispatch(setCartProducts());

};

export const setQuantity = (id,quantity) => {
    let cart_products =store.getState().cartReducer.products;

    for(let i in cart_products){
        if(cart_products[i].id === id){

            cart_products[i].quantity = quantity;
            if(quantity<=0 && quantity!==''){
                cart_products.splice( i, 1 );
            }

            break;
        }
    }

    return store.dispatch(setCartProducts(cart_products));

};

export const addProductToCart = (product, quantity) => {


    let cart_products =store.getState().cartReducer.products;
    cart_products = cart_products ? cart_products : [];


    let exist = false;
    for(let i in cart_products){
        if(cart_products[i].id === product.id && (product.kit && cart_products[i].kit)){
            cart_products[i].quantity =parseInt(cart_products[i].quantity) +  parseInt(quantity);
            exist = true;
            break;
        }
    }

    if(!exist){
        product.quantity = quantity;

        product = filterKeys(product, [
            'id', 'name', 'slug', 'system_files', 'code','quantity', 'price', 'price_new', 'kit', 'fields'
        ]);

        cart_products.push(product);
    }

    return store.dispatch(setCartProducts(cart_products));
};
