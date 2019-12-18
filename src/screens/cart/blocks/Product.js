import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,Animated} from 'react-native';
import {Icon} from 'react-native-elements';
import {deleteProduct, setQuantity} from '../../../actions/cart';
import {store} from '../../../store/store';
import QuantityInput from '../../../components/cart/quantityInput';
import PriceItem from '../../../components/cart/PriceItem';
import TotalPriceItem from '../../../components/cart/TotalPriceItem';
import {formatName} from '../../../functions/main';

class Product extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            showOptions:false,
            collapseHeight: new Animated.Value(0),
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

    toogleCollapse(e){
        e.preventDefault();

        const {height, duration} = {
            height: this.state.showOptions ? 0 : 400,
            duration:200,

        };

        return Animated.timing(
            this.state.collapseHeight,
            {
                toValue: height,
                duration: duration
            }
        ).start(() => {
            this.setState({showOptions : !this.state.showOptions})
        });
    }

    render() {
        const item = { ...this.props.item};
        item.fields = ((item.fields  instanceof Array))
            ? item.fields
            : Object.keys(item.fields).map(function(key) {
            return {name:key, value:item.fields[key]};
        })
        ;
        return  (typeof item !=='undefined') ? <View
                        style={styles.container}>
                        <View style={styles.rowContainer}>
                            <TouchableOpacity
                                style={[styles.rowItem,{justifyContent:'center', flexDirection:'row'}]}
                                onPress={e=>this.deleteItem(e,item.id)}>
                                <Icon   onPress={e=>this.deleteItem(e,item.id)}  style={{textAlign:'center'}} name='close' size={30} color={'red'} />
                            </TouchableOpacity>
                            <Image style={[{
                                height:100,
                                width:null
                            },styles.rowItem]} resizeMode='contain' source={{ uri: item.image ? item.image : item.system_files[0].disk_name}}/>
                            <Text style={[styles.rowItem,{textAlign:'center'}]} >{item.name}</Text>
                                <Icon   onPress={e=>this.toogleCollapse(e)}
                                        style={[styles.rowItem,{justifyContent:'center', flexDirection:'row'}]}
                                        name='menu' size={30} color={'black'} />
                        </View>

                        <View style={styles.rowContainer}>
                            <PriceItem
                                price={item.price}
                                style={[styles.mainInputContainer,styles.rowItem]}
                            />
                            <QuantityInput
                                changeQuantity = {this.props.changeQuantity}
                                item = {this.props.item}
                                style={[styles.mainInputContainer,styles.rowItem]}
                                setProductQuantity = {this.setProductQuantity}
                            />
                            <TotalPriceItem
                                price={item.price*item.quantity}
                                style={[styles.mainInputContainer,styles.rowItem]}
                            />
                        </View>
                            <Animated.View
                                style={{
                                    height:this.state.collapseHeight,
                                    backgroundColor: '#e1e1e1',
                                    flexDirection:'column',
                                    flexWrap: 'wrap',
                                }}>
                                {item.fields.map((field,index)=>{
                                    let value  =field.value;
                                    let nameFormated  = formatName(field.name);
                                    return (
                                        (value && typeof value == 'object')?
                                            Object.keys(value).map((nameVal,indexVal)=>{
                                                let valueObj  =value[nameVal];
                                                let nameFormated  = formatName(nameVal);
                                                return (
                                                    <CartOptionItem
                                                        key={indexVal}
                                                        name={nameFormated}
                                                        value={valueObj.name ? valueObj.name : valueObj}
                                                    />
                                                )
                                            })
                                            :
                                            <CartOptionItem
                                                key={index}
                                                name={nameFormated}
                                                value={value}
                                            />
                                    )
                                })
                                }
                            </Animated.View>

                    </View>
            : null
    }



}

export class CartOptionItem extends React.Component{
    render(){
        return  (this.props.value&& this.props.value!=='') ? <View style={styles.optionItem}>
                    <Text style={{fontWeight:'bold'}}>{this.props.name.trim()}: </Text>
                    <Text>{this.props.value.toString().trim()}</Text>
                </View> : null;
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
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
        flexWrap:'wrap',
    },
    optionItem:{
        flexDirection:'row',
        flex:1
    }
});

// Exports
export default Product;
