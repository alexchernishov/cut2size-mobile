import React from 'react';
import { StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {REACT_APP_SHIPPING_PRICE,RECEIPT_PAGE} from 'react-native-dotenv';
import { postForm} from '../../api/main';
import {getAccountInfo, setCurrentCustomer, setToken} from '../../actions/authentication';
import jwt_decode from 'jwt-decode';
import {store} from '../../store/store';
import {clearCart} from '../../actions/cart';
import SignInScreen from '../auth/SignIn';
import { TabView ,TabBar} from 'react-native-tab-view';
import {AccountInputs} from '../../../staticVars';
import {NewCustomer} from '../account/NewCustomer';

class Checkout extends React.Component{

    constructor(props){


        super(props);


        this.state = {
            errors:{
                ...Object.keys(AccountInputs)
            },
            inputs:AccountInputs,
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


    getAccountInfo(id){

        let customerId = id ? id : this.props.customer.id;

        if(customerId){
            getAccountInfo(this.props.customer.id, this.props, this.state.inputs).then(res=>{
                if(res.errors){
                    this.setState({errors:res.errors})
                }else{
                    if(res.account){
                        this.setState({account:res.account, inputs:res.inputs});
                    }
                }
            }).catch(error=>{
                return this.setState({error:error});
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
                            submit={this.checkout}
                            submitText={'Proceed to payment'}
                        />;
            case 'login':
                return <SignInScreen navigation = {this.props.navigation}/>;
            default:
                return null;
        }
    };

}





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
