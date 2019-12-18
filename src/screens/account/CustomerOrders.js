import React from 'react';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {StyleSheet, View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';
import {get} from '../../api/main';
import Product from '../cart/blocks/Product';
import OrderItem from './OrderItem';

class CustomerOrders extends React.Component{

    state={
        orders:false,
        errors:false,
        success:false,
        loading:false,
    };

    componentDidMount() {
        // if(!this.state.orders && !this.state.orders.count){
            this.getOrders()
        // }
    }

    getOrders(){

        this.setState({loading:true},()=>{
            get('API','api/v1/orders/customer',this.props.authToken,this.props)
                .then(res=>{
                    if(res.errors){
                        this.setState({errors:res.errors,loading:false})
                    }else{
                        this.setState({orders:res,loading:false});
                    }
                })
                .catch(error=>{
                    this.setState({errors:error,loading:false})

                });
        });


    }





    render() {
        return (this.state.orders.count>0) ?
                <ScrollView style={styles.container}>
                    {this.state.orders.rows.map((item,index) => <OrderItem key={index} order={item}/>)
                    }
                </ScrollView>
                :
                <View style={styles.container}>
                    {this.renderFooter()}
                    <Text style={{textAlign:'center'}}>No orders found</Text>
                </View>

    }
    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

}



const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor:'#f5f5f5'
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
export default connect(mapStateToProps,mapDispatchToProps)(CustomerOrders);
