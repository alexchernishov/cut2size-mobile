import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {CURRENCY_SYMBOL} from 'react-native-dotenv';
import {formatPrice} from '../../functions/main';

class CartTotal extends React.Component{



    render() {
        return   <View style={this.props.style}>
                        <View style={{
                            flexDirection:'row',justifyContent:'flex-end'
                        }}>
                            <Text>Order Subtotal: </Text>
                            <Text style={{fontWeight:'bold'}}>{CURRENCY_SYMBOL} </Text>
                            <Text>{formatPrice(this.props.subtotal)}</Text>
                        </View>
                        <View style={{
                            flexDirection:'row',justifyContent:'flex-end'
                        }}>
                            <Text>Order Total: </Text>
                            <Text style={{fontWeight:'bold'}}>{CURRENCY_SYMBOL} </Text>
                            <Text>{formatPrice(this.props.total)}</Text>
                        </View>
                    </View>
    }

}



// Exports
export default CartTotal;
