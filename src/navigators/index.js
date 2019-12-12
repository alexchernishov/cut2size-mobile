import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from '../screens/main/Main';
import Calculator from '../screens/calculator/Main';
import Room from '../screens/calculator/Room';
import Cabinet from '../screens/calculator/Cabinet';
import Options from '../screens/calculator/Options';
import Specifications from '../screens/calculator/Specifications';
import ProductList from '../screens/calculator/ProductList';
import SignInScreen from '../screens/auth/SignIn';
import Logout from '../screens/auth/Logout';
import Cart from '../screens/cart/Cart';
import Checkout from '../screens/checkout/Checkout';
import Payment from '../screens/checkout/Payment';
import Success from '../screens/checkout/Success';
import CartIcon from '../components/cart/CartIcon';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const SuccessStack = createStackNavigator({ Success: Success });


const MainNavigator = createStackNavigator({
    Main: {screen: Main},
    Calculator: {screen: Calculator},
    Room: {screen: Room},
    Cabinet: {screen: Cabinet},
    Options: {screen: Options},
    Specifications: {screen: Specifications},
    ProductList: {screen: ProductList},
    Auth: AuthStack,
    Cart: Cart,
    Checkout: Checkout,
    Payment: Payment,
    SuccessStack: SuccessStack,
},{
    defaultNavigationOptions:  ({navigation}) => ({
         headerRight:  (
             <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <CartIcon navigation={navigation}/>
                 <Logout navigation={navigation}/>
             </View>
         ),
    }),
    initialRouteName: 'Calculator',

});

const  SwitchNavigator  = createAppContainer(
    createSwitchNavigator(
        {
            App: MainNavigator,
        },
        {
            initialRouteName: 'App',
        }
    )
);


export default SwitchNavigator;

