import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {InputContainer} from '../../components/views/InputContainer';
import {formatPrice, ucfirst} from '../../functions/main';
import MainButton from '../../components/MainButton';
import {Icon} from 'react-native-elements';
import CartTotal from '../../components/cart/CartTotal';
import {REACT_APP_SHIPPING_PRICE} from 'react-native-dotenv';
import {get, postForm} from '../../api/main';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import jwt_decode from 'jwt-decode';
import {store} from '../../store/store';
import {clearCart} from '../../actions/cart';

class Checkout extends React.Component{

    constructor(props){


        super(props);

        let inputs={
            payment_firstname:{
                value:null,
                label:'Firstname',
            },
            payment_lastname:{
                value:null,
                label:'Lastname',
            },
            payment_company:{
                value:null,
                label:'Company',
            },
            payment_address: {
                value:null,
                label:'Address',
            },
            payment_city: {
                value:null,
                label:'City',
            },
            payment_province: {
                value:null,
                label:'Province',
            },
            payment_postal_code: {
                value:null,
                label:'Postal code',
            },
            payment_country: {
                value:null,
                label:'Country',
            },
            payment_cell_phone: {
                value:null,
                label:'Cell phone',
            },
            shipping_firstname:{
                value:null,
                label:'Firstname',
            },
            shipping_lastname:{
                value:null,
                label:'Lastname',
            },
            shipping_company:{
                value:null,
                label:'Company',
            },
            shipping_address: {
                value:null,
                label:'Address',
            },
            shipping_city: {
                value:null,
                label:'City',
            },
            shipping_province: {
                value:null,
                label:'Province',
            },
            shipping_postal_code: {
                value:null,
                label:'Postal code',
            },
            shipping_country: {
                value:null,
                label:'Country',
            },
            shipping_cell_phone: {
                value:null,
                label:'Cell phone',
            },
        };

        this.state = {
            errors:{
                ...Object.keys(inputs)
            },
            inputs:inputs,
            shipping:true,
            account:false,
            edit: {
                info:false,
                payment:false,
                shipping:false,
            },
            passwordType:'password',
            submitButtonDisable:false,
            proceedPaymentButtonDisable:false,
        };

        this.validateInput= this.validateInput.bind(this);
    }





    componentDidMount() {


        this.getAccountInfo();

        if(!this.props.products || this.props.products.length<1){
            this.props.navigation.navigate('Cart');
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if(this.props.customer.id !== nextProps.customer.id){
            this.getAccountInfo(nextProps.customer.id);
        }
    }


    getAccountInfo(id){

        let customerId = id ? id : this.props.customer.id;
        if(customerId){
            get('API','customers/'+customerId,this.props.authToken, this.props)
                .then(res=>{

                    if(res.errors){
                            this.setState({errors:res.errors})
                        }else{

                            let customerFields = this.state.inputs;
                            for(let i in Object.keys(customerFields)){
                                let key = Object.keys(customerFields)[i];
                                    if(res[key]){
                                        customerFields[key].value = res[key]
                                    }
                            }
                            this.setState({account:res, inputs:customerFields});
                        }
                    })
                        .catch(error=>{
                            this.setState({errors:error})

                        });
        }

    }




    validateInput=(name,value)=>{
        let input = this.state.inputs[name];
        input['value'] = value;
        this.setState({[name]:input});
    };
    shippingShow=(e)=>{
        e.preventDefault();
        this.setState({shipping:!this.state.shipping})
    };

    checkout(e){
        e.preventDefault();
        let self = this;
        this.setState({proceedPaymentButtonDisable: true});
        let initialData = {};
        for(let i in Object.keys(this.state.inputs)){
            let key = Object.keys(this.state.inputs)[i];
            initialData[key] = this.state.inputs[key].value;
        }

        initialData.customer = this.props.customer;
        initialData.products = this.props.products;


        //Send shipping same checkbox
        initialData.ship_pay = this.state.shipping;

        postForm('API','orders/customer',initialData, this.props.authToken,this.props).then(res=>{
            if(res.errors){
                this.setState({errors:res.errors});
                this.setState({submitButtonDisable: false});
                this.setState({proceedPaymentButtonDisable: false});
            }else{
                let success = [];
                if(res && res.result &&  res.result.length>0){
                    res.result.forEach(function (item) {
                        if(item.login){
                            if(item.login.token){
                                const { token } = item.login;

                                const decoded = jwt_decode(token);
                                store.dispatch(setCurrentCustomer(decoded));
                                this.props.setToken(token);
                                this.props.navigation.goBack(null);
                            }

                        }else{
                            success.push(item);
                        }
                    })
                }

                this.setState({success:success});
                this.setState({errors:false});
                this.setState({proceedPaymentButtonDisable: false});

                if(res.order && res.payment){
                    let order  =res.order;
                    order.hash = res.payment.hash;
                    order.date = res.payment.date;
                    setTimeout(function () {
                        self.setState({submitButtonDisable: false});
                        // self.props.history.push({
                        //     pathname: "/cart/checkout/payment",
                        //     state: {
                        //         order: order,
                        //     }
                        // })
                        self.props.navigation.navigate('payment')
                    },1500);
                }


            }

        }).catch(error=>{
            console.log(error);

            this.setState({submitButtonDisable: false});
            this.setState({proceedPaymentButtonDisable: false});
            let errors = (error.response ? (error.response.data ? error.response.data : error.response ) : error);
            this.setState({errors:(errors.errors ? errors.errors : errors)})
        });

    }





    render() {
            return <ScrollView
                        style={styles.container}
                    >
                <View style={{marginBottom:20}}>
                    <CustomerFields
                        label={'Payment Information'}
                        type={'payment'}
                        state={this.state}
                        validateInput={this.validateInput}
                    />
                    <CustomerFields
                        label={'Shipping Information'}
                        type={'shipping'}
                        state={this.state}
                        validateInput={(name,value)=>this.validateInput(name,value)}
                        shipping={this.state.shipping}
                        shippingShow={this.shippingShow}
                    />
                    {this.props.total>0 &&
                        <View
                            style={styles.cartItem}
                        ><CartTotal
                            subtotal={formatPrice(parseFloat(this.props.total)+parseFloat(REACT_APP_SHIPPING_PRICE))}
                            total={formatPrice(parseFloat(this.props.total)+parseFloat(REACT_APP_SHIPPING_PRICE))}
                        />
                        </View>
                    }
                    <MainButton onPress={e=>this.checkout(e)}>Procced to payment</MainButton>
                </View>
            </ScrollView>
    }

}

export class CustomerFields extends React.Component{


    render() {

        return (
           <View style={{
               marginBottom:10,
               marginTop:10,
               flex:1
           }}>

                   <View style={{
                       flexDirection:'row',
                       justifyContent:'space-between',
                       alignItems:'center',
                   }}>
                       <Text style={{marginLeft:5}}>{this.props.label}</Text>
                       {this.props.type==='shipping'&&
                           <View style={{
                               flexDirection:'row',
                               justifyContent:'space-between',
                               alignItems:'center',
                               margin:10
                           }}><Text>Same as payment</Text>
                               <Icon
                                   onPress={e=>this.props.shippingShow(e)}
                                   size={30}
                                   type={'materialicons'}
                                   name={this.props.shipping ? 'radio-button-checked':'radio-button-unchecked'

                           }/></View>
                       }
                   </View>
               {!this.props.shipping&&
                   <View>
                       {Object.keys(this.props.state.inputs).map((input,index)=> {
                           let name = input;
                           let label = this.props.state.inputs[input].label;
                           let value =  this.props.state.inputs[input].value;

                           return (name.indexOf(this.props.type)!==-1)&&<InputContainer
                               key={index}
                               state={this.props.state}
                               onChangeText={value => this.props.validateInput(name, value)}
                               name={name}
                               type={'text'}
                               label={ucfirst(label)}
                               value={value}

                           />
                       })}
                   </View>
               }


           </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    cartItem:{
        flex:1,
        backgroundColor:'#fff',
        marginTop:20,
        marginBottom:20,
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
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
