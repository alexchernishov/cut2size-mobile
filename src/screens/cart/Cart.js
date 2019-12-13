import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Product from './blocks/Product';
import CartTotal from '../../components/cart/CartTotal';
import {formatPrice} from '../../functions/main';
import {REACT_APP_SHIPPING_PRICE} from 'react-native-dotenv';
import MainButton from '../../components/MainButton';

class Cart extends React.Component{



    render() {
        return <ScrollView
            style={styles.container}

        >
            {this.props.products && this.props.products.length>0
                            ?
                                 this.props.products.map((item,index) => <Product key={index} item={item}/>)
                            :
                                <View style={{
                                    marginLeft:10,
                                    marginRight:10,
                                    marginTop:10,
                                    flex:1,
                                    backgroundColor:'#f5f5f5'
                                }}><Text style={{textAlign:'center'}}>Cart is empty</Text></View>
                        }
                        {this.props.total>0 &&
                            <View
                                style={styles.cartItem}
                            ><CartTotal
                                subtotal={formatPrice(parseFloat(this.props.total)+parseFloat(REACT_APP_SHIPPING_PRICE))}
                                total={formatPrice(parseFloat(this.props.total)+parseFloat(REACT_APP_SHIPPING_PRICE))}
                            />
                            </View>
                        }
                        {this.props.total>0 &&
                            <View
                                style={styles.cartItem}
                            >
                                <MainButton onPress={e=>this.props.navigation.navigate('Checkout')}>Proceed to checkout</MainButton>
                            </View>
                        }
                </ScrollView>
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item:{
        width: '50%'
    },
    textItem:{
        fontSize:15,
        color:'#fff'
    },
    cartItem:{
        flex:1,
        backgroundColor:'#f5f5f5',
        marginTop:20,
        marginLeft:10,
        marginRight:10,
    }
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        products: state.cartReducer.products,
        quantityTotal: state.cartReducer.quantityTotal,
        total: state.cartReducer.total,
    };
};

// Exports
export default connect(mapStateToProps)(Cart);
