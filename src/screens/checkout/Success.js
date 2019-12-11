import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';



class Success extends React.Component{


    _onLoad(state) {
        console.log(state.url);
        // if (state.url.indexOf(BASEURL + '/auth/success') != -1) {
        //     let token = state.url.split("token=")[1];
        //     token = token.substring(0, token.length - 4);
        //     NavigationsActions.back();
        //     SessionActions.setSession(token);
        // }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        console.log('this.props.navigation.state.params',this.props.navigation.state.params);
        return <View
            style={styles.container}

        ><Text>Success</Text>
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
export default connect(mapStateToProps,mapDispatchToProps)(Success);
