import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';
import {postForm} from '../../api/main';
import {store} from '../../store/store';
import commonStyles from '../calculator/styles';
import MainButton from '../../components/MainButton';



class Success extends React.Component{
    state={
        payment: true
    };

    componentDidMount() {
        this.validatePayment();
    }
    validatePayment(){
        let params = this.props.navigation.state.params;
        if(params && params.ORDERID && params.ORDERID.length>0){
            store.dispatch(clearCart());
            postForm('API','api/v1/orders/paymentValidate',
                params,
                this.props.authToken,this.props,'PUT').then(res=>{
                console.log(res);

                if(res.errors && res.errors.length>0){
                    this.setState({errors:res.errors});
                }else{
                    this.setState({success:res.success,errors:false,payment:params});
                }
            }).catch(error=>{
                let errors = error.response ? (error.response.data ? error.response.data : error.response.statusText ) : error;
                this.setState({errors:(errors.errors ? errors.errors : (errors.name ? errors.name : errors))})
            })
        }

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <View
            style={styles.container}
        >{this.state.payment?<View style={{
            alignItems:'center'
        }}>
            <Text>Thank you for your order.</Text>
            <Text>We’re processing it now. You will receive an email confirmation shortly.</Text>
            <MainButton  onPress={e=>this.props.navigation.navigate('Calculator')}>Continue Shopping</MainButton>
        </View>:<View><Text>{this.state.errors}</Text></View>}
        </View>;
    }

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
    });
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        products: state.cartReducer.products,
        quantityTotal: state.cartReducer.quantityTotal,
        total: state.cartReducer.total,
        customer: state.authReducer.customer,
        authToken: state.authReducer.authToken,
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
export default connect(mapStateToProps,mapDispatchToProps)(Success);
