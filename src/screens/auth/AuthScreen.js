import React from 'react';
import {get, postForm} from '../../api/main';
import {REACT_APP_SHIPPING_PRICE, RECEIPT_PAGE} from 'react-native-dotenv';
import jwt_decode from 'jwt-decode';
import {store} from '../../store/store';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {TabBar, TabView} from 'react-native-tab-view';
import SignInScreen from './SignIn';
import {NewCustomer} from '../checkout/Checkout';
import {StyleSheet} from 'react-native';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';
import SignUpScreen from './SignUp';

class AuthScreen extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: 'signin', title: 'Sign In' },
                { key: 'signup', title: 'Sign Up' },
            ],
        };

        this.renderScene= this.renderScene.bind(this);
        this.navigateToLogin= this.navigateToLogin.bind(this);
    }

    componentDidMount(): void {
        if(this.props.customer && this.props.authToken){
            this.props.navigation.navigate('Calculator');
        }
    }

    navigateToLogin(): void {
        this.setState({index:0})
    }



    render() {
        return <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={props =>{

                return !this.props.isCustomerAuthenticated &&  <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: 'white' }}
                // style={{ backgroundColor: 'pink' }}
                />
            }
            }
            onIndexChange={index => this.setState({ index })}
            // initialLayout={{ width: Dimensions.get('window').width }}
        />
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'signin':
                return <SignInScreen
                    navigation = {this.props.navigation}
                    navigateToLogin = {this.navigateToLogin}
                />;
            case 'signup':
                return <SignUpScreen
                    navigation = {this.props.navigation}
                    navigateToLogin = {this.navigateToLogin}
                />;
            default:
                return null;
        }
    };

}



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
export default connect(mapStateToProps,mapDispatchToProps)(AuthScreen);
