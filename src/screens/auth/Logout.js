// Imports: Dependencies
import React from 'react';
import { Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import logoutAction from './logoutAction';
import {setCurrentCustomer, setToken} from '../../actions/authentication';

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
            <Button
                onPress={e=>this.logout(e)}
                title="Logout"
                color="#000"
            />

        )
    }
}


// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        setToken: (token) => dispatch(setToken(token)),
        setCurrentCustomer: (token) => dispatch(setCurrentCustomer(token)),

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
