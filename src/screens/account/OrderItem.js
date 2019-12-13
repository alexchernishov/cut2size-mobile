import React from 'react';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';
import {get} from '../../api/main';
import Product from '../cart/blocks/Product';
import {formatPrice} from '../../functions/main';
import {CURRENCY_SYMBOL} from 'react-native-dotenv';
import {Icon} from 'react-native-elements';

class OrderItem extends React.Component{

    state={
        collapseHeight: new Animated.Value(0),
    };




    toogleCollapse(e, length){
        e.preventDefault();

        const {height, duration} = {
            height: this.state.showOptions ? 0 : 200*length,
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
        let order = this.props.order;
        return <View style={styles.container}>
            <View  style={styles.rowContainer}>
                <Text style={[styles.rowItem,{fontWeight:'bold'}]}>№ {order.id}</Text>
                <Text style={styles.rowItem}>Date: {order.id}</Text>
                <Text style={styles.rowItem}>Order Total: {CURRENCY_SYMBOL} {formatPrice(parseFloat(order.total_price))}</Text>
                <Text style={[styles.rowItem,{color:'#61a670'}]}>{order.status}</Text>
                <Icon   onPress={e=>this.toogleCollapse(e,order.order_products.length )}
                        style={[styles.rowItem,{justifyContent:'center', flexDirection:'row'}]}
                        name='menu' size={30} color={'black'} />

            </View>
            <Animated.View
                style={{
                    height:this.state.collapseHeight,
                    backgroundColor: '#e1e1e1',
                    flexDirection:'column',
                    flex:1
                }}>
                {order.order_products.map((item,index) => {
                    let product = {
                        price:item.price,
                        quantity:item.quantity,
                        id:item.product_id ?? item.kit_id ,
                        name:item.order_kit ? item.order_kit.name: '' ,
                        image:item.order_kit ? item.order_kit.image: null ,
                        fields:item.order_kit ? item.order_kit.order_kit_fields: false ,
                    };
                    console.log('product',product);
                    return <Product
                        key={index}
                        item={product}/>
                })}
            </Animated.View>

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
        paddingBottom:20,
        backgroundColor:'#f5f5f5'

    },
    rowContainer: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
    },
    rowItem:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexWrap:'wrap',
    },
});


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        customer: state.authReducer.customer,
        authToken: state.authReducer.authToken,
        isCustomerAuthenticated: state.authReducer.isCustomerAuthenticated,
    };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        setToken: (token) => dispatch(setToken(token)),
        setCurrentCustomer: (token) => dispatch(setCurrentCustomer(token)),
        clearCart: (token) => dispatch(clearCart({})),

    };
};

// Exports
export default connect(mapStateToProps,mapDispatchToProps)(OrderItem);
