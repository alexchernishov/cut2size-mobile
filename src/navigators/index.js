import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from '../screens/main/Main';
import Calculator from '../screens/calculator/Main';
import Room from '../screens/calculator/Room';
import Cabinet from '../screens/calculator/Cabinet';



const MainNavigator = createStackNavigator({
    Main: {screen: Main},
    Calculator: {screen: Calculator},
    Room: {screen: Room},
    Cabinet: {screen: Cabinet},
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

