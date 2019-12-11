import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';
import { WebView } from 'react-native-webview';
import { REACT_APP_PAYMENT_URL ,REACT_APP_PAYMENT_TERMINALID,REACT_APP_PAYMENT_CURRENCY,RECEIPT_PAGE} from 'react-native-dotenv'



class Payment extends React.Component{

    constructor() {
        super();
        this._onLoad = this._onLoad.bind(this);
    }

    _onLoad(state) {
        let params  = new URLSearchParams(state.url);
        if (state.url.indexOf(RECEIPT_PAGE) !== -1) {

            this.props.navigation.navigate('Success',{
                params:{
                    ORDERID:params.get('ORDERID'),
                    AMOUNT:params.get('AMOUNT'),
                    UNIQUEREF:params.get('UNIQUEREF'),
                    HASH:params.get('HASH'),
                    TERMINALID:params.get('TERMINALID'),
                    DATETIME:params.get('DATETIME'),
                    RESPONSECODE:params.get('RESPONSECODE'),
                    RESPONSETEXT:params.get('RESPONSETEXT'),
                }
            });

        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let order  = this.props.navigation.state.params.order;

        let body =new URLSearchParams({
            TERMINALID :(REACT_APP_PAYMENT_TERMINALID).toString(),
            ORDERID:order ? (order.id).toString() : false,
            CURRENCY :(REACT_APP_PAYMENT_CURRENCY).toString(),
            AMOUNT :order ? order.total_price : false,
            DATETIME :order ? (order.date).toString(): false,
            HASH :order ? (order.hash).toString(): false,
            // "payment-method" :order ? (order.hash): false,
            RECEIPTPAGEURL :RECEIPT_PAGE,
        });

        console.log({
            TERMINALID :(REACT_APP_PAYMENT_TERMINALID).toString(),
            ORDERID:order ? (order.id).toString() : false,
            CURRENCY :(REACT_APP_PAYMENT_CURRENCY).toString(),
            AMOUNT :order ? order.total_price : false,
            DATETIME :order ? (order.date).toString(): false,
            HASH :order ? (order.hash).toString(): false,
            // "payment-method" :order ? (order.hash): false,
            RECEIPTPAGEURL :'cut2size-app://',
        });
        return <View
            style={styles.container}

        ><WebView
            source={{
                // uri: 'http://caregievers.rebus.digital/test.php',
                uri: REACT_APP_PAYMENT_URL,
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body.toString(),
                method:'POST',
            }}
            onNavigationStateChange={this._onLoad}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
        </View>;
    }

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
    });
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        products: state.cartReducer.products,
        quantityTotal: state.cartReducer.quantityTotal,
        total: state.cartReducer.total,
        customer: state.authReducer.customer,
        authToken: state.authReducer.authToken,
    };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        setToken: (token) => dispatch(setToken(token)),
        setCurrentCustomer: (token) => dispatch(setCurrentCustomer(token)),
        clearCart: (token) => dispatch(clearCart({})),

    };
};

// Exports
export default connect(mapStateToProps,mapDispatchToProps)(Payment);
