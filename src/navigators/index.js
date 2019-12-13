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
import AuthScreen from '../screens/auth/AuthScreen';
import Logout from '../screens/auth/Logout';
import Cart from '../screens/cart/Cart';
import Checkout from '../screens/checkout/Checkout';
import Payment from '../screens/checkout/Payment';
import Success from '../screens/checkout/Success';
import Account from '../screens/account/Account';
import CartIcon from '../components/cart/CartIcon';
import {Icon} from 'react-native-elements';

const AuthStack = createStackNavigator(
    { AuthScreen: AuthScreen },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: true
        }
    }
    );
const SuccessStack = createStackNavigator({ Success: Success });


const MainNavigator = createStackNavigator({
    Main: {screen: Main},
    Calculator: {screen: Calculator},
    Room: {screen: Room},
    Cabinet: {screen: Cabinet},
    Options: {screen: Options},
    Specifications: {screen: Specifications},
    ProductList: {screen: ProductList},
    AuthScreen: AuthStack,
    Cart: Cart,
    Checkout: Checkout,
    Payment: Payment,
    SuccessStack: SuccessStack,
    Account: Account,
},{
    defaultNavigationOptions:  ({navigation}) => ({
         // headerLeft:  (
         //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
         //         <Icon name={'home'}  size={30} style={{marginLeft:10,paddingHorizontal: 10}}/>
         //     </View>
         // ),
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

