import React from 'react';
import {ScrollView, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {InputContainer} from '../../components/views/InputContainer';
import {formatPrice, ucfirst} from '../../functions/main';
import MainButton from '../../components/MainButton';
import {Icon} from 'react-native-elements';
import CartTotal from '../../components/cart/CartTotal';
import {REACT_APP_SHIPPING_PRICE,RECEIPT_PAGE} from 'react-native-dotenv';
import {get, postForm} from '../../api/main';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import jwt_decode from 'jwt-decode';
import {store} from '../../store/store';
import {clearCart} from '../../actions/cart';
import SignInScreen from '../auth/SignIn';
import { TabView ,TabBar} from 'react-native-tab-view';

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
            index: 0,
            routes: [
                { key: 'new', title: 'New customer' },
                { key: 'login', title: 'Existing customer' },
            ],
        };

        this.validateInput= this.validateInput.bind(this);
        this.shippingShow= this.shippingShow.bind(this);
        this.getAccountInfo= this.getAccountInfo.bind(this);
        this.renderScene= this.renderScene.bind(this);
        this.checkout= this.checkout.bind(this);
    }





    componentDidMount() {


        this.getAccountInfo();

        if(!this.props.products || this.props.products.length<1){
            this.props.navigation.navigate('Cart');
        }
    }

    //
    // componentWillReceiveProps(nextProps, nextContext) {
    //
    //     if(this.props.customer.id !== nextProps.customer.id){
    //         // this.getAccountInfo(nextProps.customer.id);
    //     }
    // }


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
        self.setState({proceedPaymentButtonDisable: true});
        let initialData = {};
        for(let i in Object.keys(self.state.inputs)){
            let key = Object.keys(self.state.inputs)[i];
            initialData[key] = self.state.inputs[key].value;
        }

        initialData.customer = this.props.customer;
        initialData.products = this.props.products;
        initialData.subtotal_price = this.props.total;
        initialData.shipping_price = REACT_APP_SHIPPING_PRICE;
        initialData.total_price = parseFloat(this.props.total)+parseFloat(REACT_APP_SHIPPING_PRICE);
        //Send shipping same checkbox
        initialData.ship_pay = self.state.shipping;
        initialData.receipt_page = RECEIPT_PAGE;

        console.log('initialData',initialData);
        postForm('API','api/v1/orders/customer',initialData, this.props.authToken,this.props, 'PUT').then(res=>{
            if(!res){
                return;
            }

            if(res && res.errors){
                self.setState({
                    errors:res.errors,
                    submitButtonDisable: false,
                    proceedPaymentButtonDisable: false
                });
            }else{
                let success = [];
                if(res && res.result &&  res.result.length>0){
                    res.result.forEach(function (item) {
                        if(item.login){
                            if(item.login.token){
                                const { token } = item.login;
                                const decoded = jwt_decode(token);
                                store.dispatch(setCurrentCustomer(decoded));
                                self.props.setToken(token);
                            }
                        }else{
                            success.push(item);
                        }
                    })
                }

                self.setState({
                    success:success,
                    errors:false,
                    proceedPaymentButtonDisable: false
                });

                if(res.order && res.payment){
                    let order  =res.order;
                    order.hash = res.payment.hash;
                    order.date = res.payment.date;

                    // setTimeout(function () {
                        self.props.navigation.navigate('Payment',{
                            order: order,
                        })
                    // },1500);
                }


            }

        }).catch(error=>{
            console.log('err',error);
            let errors = (error.response ? (error.response.data ? error.response.data : error.response ) : error);
            self.setState({proceedPaymentButtonDisable: false,errors:(errors.errors ? errors.errors : errors)})
        });

    }





    render() {
        return <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={props =>{

                return !this.props.customer &&  <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: 'white' }}
                    style={{ backgroundColor: 'pink' }}
                />
                }
            }
            onIndexChange={index => this.setState({ index })}
            // initialLayout={{ width: Dimensions.get('window').width }}
        />
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'new':
                return <NewCustomer
                            state={this.state}
                            total={this.props.total}
                            validateInput={this.validateInput}
                            shippingShow={this.shippingShow}
                            checkout={this.checkout}
                        />;
            case 'login':
                return <SignInScreen navigation = {this.props.navigation}/>;
            default:
                return null;
        }
    };

}

export class NewCustomer extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <ScrollView
            style={styles.container}
        >
            <View style={{marginBottom:20}}>

                <CustomerFields
                    label={'Payment Information'}
                    type={'payment'}
                    state={this.props.state}
                    validateInput={this.props.validateInput}
                />
                <CustomerFields
                    label={'Shipping Information'}
                    type={'shipping'}
                    state={this.props.state}
                    validateInput={(name,value)=>this.props.validateInput(name,value)}
                    shipping={this.props.state.shipping}
                    shippingShow={this.props.shippingShow}
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
                {this.props.state.proceedPaymentButtonDisable ?                 <ActivityIndicator animating size="large" />
                    :  <MainButton
                    onPress={e=>this.props.checkout(e)}
                    // disable={this.props.state.proceedPaymentButtonDisable}
                >Proceed to payment</MainButton>}

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
