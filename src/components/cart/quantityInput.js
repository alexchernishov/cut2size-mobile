import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View,Text} from 'react-native';
import {Icon} from 'react-native-elements';

class QuantityInput extends React.Component{



    render() {
        return  this.props.changeQuantity ?
                <View style={this.props.style}>
                    <TouchableOpacity
                        onPress={e=>this.props.setProductQuantity(e,this.props.item.id,(parseInt(this.props.item.quantity)-1))}
                        style={styles.quantityIconsTouch}
                    >
                        <Icon  iconStyle={styles.quantityIcons}  name={'minus-square'} type={'font-awesome'}/>
                    </TouchableOpacity>
                    <View style={[styles.inputContainer,styles.quantityContainer]}>
                        <TextInput style={[styles.bigInput]}
                                   placeholder={'Quantity'}
                                   keyboardType={'numeric'}
                                   underlineColorAndroid='transparent'
                                   value={this.props.item.quantity.toString()}
                                   onChangeText={(cartQuantity) => this.props.setProductQuantity(false,this.props.item.id,cartQuantity)}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={e=>this.props.setProductQuantity(e,this.props.item.id,(parseInt(this.props.item.quantity)+1))}
                        style={styles.quantityIconsTouch}
                    >
                        <Icon  iconStyle={styles.quantityIcons}  name={'plus-square'} type={'font-awesome'}/>
                    </TouchableOpacity>
                </View>
            :
                <View style={this.props.style}>
                    <Text>Qty: </Text>
                    <TextInput style={[styles.bigInput]}
                               placeholder={'Quantity'}
                               keyboardType={'numeric'}
                               underlineColorAndroid='transparent'
                               value={this.props.item.quantity.toString()}
                               onChangeText={(cartQuantity) => this.props.setProductQuantity(false,this.props.item.id,cartQuantity)}/>
                </View>

    }

}


const styles = StyleSheet.create({


    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
    },
    quantityContainer:{
        // justifyContent:'center',
        // alignItems:'center',
    },
    quantityIconsTouch:{
        marginLeft:10,
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',

    },
    quantityIcons:{
        // fontSize:Math.min(win.width*0.2,win.height*0.2),

    },

});

// Exports
export default QuantityInput;
