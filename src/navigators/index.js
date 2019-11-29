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



const MainNavigator = createStackNavigator({
    Main: {screen: Main},
    Calculator: {screen: Calculator},
    Room: {screen: Room},
    Cabinet: {screen: Cabinet},
    Options: {screen: Options},
    Specifications: {screen: Specifications},
    ProductList: {screen: ProductList},
},{
    defaultNavigationOptions:  ({navigation}) => ({
        // headerRight:  (
        //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
        //         <TouchableOpacity onPress={() =>  navigation.navigate('Calculator')}  >
        //             <Text>Calculator</Text>
        //         </TouchableOpacity>
        //     </View>
        // ),
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

