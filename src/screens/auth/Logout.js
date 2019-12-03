// Imports: Dependencies
import React from 'react';
import {Button, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import logoutAction from './logoutAction';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {Icon} from 'react-native-elements';
import {clearCart} from '../../actions/cart';

// Screen Dimensions

// Screen: Counter
class Logout extends React.Component {

    logout(e){

        e.preventDefault();
        logoutAction(this.props);
    }

    render() {
        return (
            this.props.isCustomerAuthenticated &&
            <TouchableOpacity onPress={e=>this.logout(e)} style={{marginRight:10}} >
                <Icon name='logout' type={'antdesign'} size={20} style={{paddingHorizontal: 10}}/>
            </TouchableOpacity>

        )
    }
}


// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        setToken: (token) => dispatch(setToken(token)),
        setCurrentCustomer: (token) => dispatch(setCurrentCustomer(token)),
        clearCart: (token) => dispatch(clearCart({})),

    };
};


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        isCustomerAuthenticated:state.authReducer.isCustomerAuthenticated,
    };
};


// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
