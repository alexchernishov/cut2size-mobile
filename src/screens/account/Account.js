import React from 'react';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import { TabView} from 'react-native-tab-view';
import {StyleSheet} from 'react-native';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';
import CustomerOrders from './CustomerOrders';

class Account extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: 'orders', title: 'Orders' },
            ],
        };

        this.renderScene= this.renderScene.bind(this);
    }

    componentDidMount(): void {

    }



    render() {
        return <TabView
            navigationState={this.state}
            renderScene={this.renderScene}

            onIndexChange={index => this.setState({ index })}
            // initialLayout={{ width: Dimensions.get('window').width }}
        />
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'orders':
                return <CustomerOrders
                    navigation = {this.props.navigation}
                />;
            default:
                return null;
        }
    };

}



const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        customer: state.authReducer.customer,
        authToken: state.authReducer.authToken,
        isCustomerAuthenticated: state.authReducer.isCustomerAuthenticated,
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
export default connect(mapStateToProps,mapDispatchToProps)(Account);
