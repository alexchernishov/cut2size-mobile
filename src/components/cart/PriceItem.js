import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {CURRENCY_SYMBOL} from 'react-native-dotenv';

class PriceItem extends React.Component{



    render() {
        return   <View style={this.props.style}>
                        <Text>Price/PC: </Text>
                        <Text style={{fontWeight:'bold'}}>{CURRENCY_SYMBOL} </Text>
                        <Text>{this.props.price}</Text>
                    </View>
    }

}



// Exports
export default PriceItem;
