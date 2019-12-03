import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {deleteProduct, setQuantity} from '../../../actions/cart';
import {store} from '../../../store/store';
import QuantityInput from '../../../components/cart/quantityInput';
import PriceItem from '../../../components/cart/PriceItem';
import TotalPriceItem from '../../../components/cart/TotalPriceItem';

class Product extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            showOptions:false
        };
        this.setProductQuantity = this.setProductQuantity.bind(this);
    }

    setProductQuantity(e,id,quantity){

        quantity = parseInt(quantity);
        if(quantity>=1){
            store.dispatch(setQuantity(id,quantity));
        }
    }

    deleteItem(e,id){
        e.preventDefault();
        store.dispatch(deleteProduct(id));
    }

    render() {
        let item = this.props.item;
        return  <View
                        style={styles.container}>
                        <View style={styles.rowContainer}>

                            <Image style={[{
                                height:100,
                                width:null
                            },styles.rowItem]} resizeMode='contain' source={{ uri: item.system_files[0].disk_name}}/>
                            <Text style={[styles.rowItem,{textAlign:'center'}]} >{item.name}</Text>
                            <TouchableOpacity
                                style={[styles.rowItem,{justifyContent:'center', flexDirection:'row'}]}
                                onPress={e=>this.deleteItem(e,item.id)}>
                                <Icon   onPress={e=>this.deleteItem(e,item.id)}  style={{textAlign:'center'}} name='close' size={30} color={'red'} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowContainer}>
                            <PriceItem
                                price={item.price}
                                style={[styles.mainInputContainer,styles.rowItem]}
                            />
                            <QuantityInput
                                item = {this.props.item}
                                style={[styles.mainInputContainer,styles.rowItem]}
                                setProductQuantity = {this.setProductQuantity}
                            />
                            <TotalPriceItem
                                price={item.price*item.quantity}
                                style={[styles.mainInputContainer,styles.rowItem]}
                            />
                        </View>
                         {this.state.showOptions &&
                                             <View>
                                                 <Text>111</Text>
                                             </View>
                         }
                    </View>
    }

}


const styles = StyleSheet.create({
    container: {
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        flex:1,
        borderBottomWidth:1,
        borderColor:'#CED0CE',
        paddingBottom:5,
        backgroundColor:'#f5f5f5'

    },
    rowContainer: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
    },
    item:{
        width: '50%'
    },
    textItem:{
        fontSize:15,
        color:'#fff'
    },
    mainInputContainer:{
        flexDirection: 'row',
    },
    rowItem:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexWrap:'wrap'
    }
});

// Exports
export default Product;
