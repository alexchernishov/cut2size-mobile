import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {CURRENCY_SYMBOL} from 'react-native-dotenv';
import {formatPrice} from '../../functions/main';

class TotalPriceItem extends React.Component{



    render() {
        return   <View style={this.props.style}>
                        <Text>Total: </Text>
                        <Text style={{fontWeight:'bold'}}>{CURRENCY_SYMBOL} </Text>
                        <Text>{formatPrice(this.props.price)}</Text>
                    </View>
    }

}



// Exports
export default TotalPriceItem;
