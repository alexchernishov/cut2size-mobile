import React from 'react';
import {getAccountInfo, setCurrentCustomer, setToken} from '../../actions/authentication';
import { TabView} from 'react-native-tab-view';
import {Alert, StyleSheet} from 'react-native';
import {clearCart} from '../../actions/cart';
import {connect} from 'react-redux';
import CustomerOrders from './CustomerOrders';
import {AccountInputs} from '../../../staticVars';
import { postForm} from '../../api/main';
import {NewCustomer} from './NewCustomer';

class Account extends React.Component{

    constructor(props){
        super(props);

        let inputs = {
            email:{
                value:null,
                label:'Email',
            },
            password:{
                value:null,
                label:'Password',
            },
        };
        inputs = {...inputs,...AccountInputs};

        this.state = {
            index: 0,
            routes: [
                { key: 'orders', title: 'Orders' },
                { key: 'information', title: 'Account information' },
            ],

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

        this.renderScene= this.renderScene.bind(this);
        this.validateInput= this.validateInput.bind(this);
        this.shippingShow= this.shippingShow.bind(this);
        this.saveAccountData= this.saveAccountData.bind(this);
    }

    componentDidMount(): void {
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


    validateInput=(name,value)=>{
        let input = this.state.inputs[name];
        input['value'] = value;
        this.setState({[name]:input});
    };
    shippingShow=(e)=>{
        e.preventDefault();
        this.setState({shipping:!this.state.shipping})
    };

    saveAccountData(){
        let initialData = {};
        for(let i in Object.keys(this.state.inputs)){
            let key = Object.keys(this.state.inputs)[i];
            initialData[key] = this.state.inputs[key].value;
        }
        initialData.ship_pay = this.state.shipping;

        if(!initialData.password || initialData.password==''){
            delete initialData.password;
        }

        postForm("API","customers/"+this.props.customer.id, initialData, this.props.authToken, this.props, "PUT")
            .then(res=>{
                Alert.alert("Success", 'Information saved')
            })
            .catch(error=>{
                console.log('err',error);
                if(error.error){
                    Alert.alert("Error", error.error)
                }
            });

    }

    render() {
        return <TabView
            navigationState={this.state}
            renderScene={this.renderScene}

            onIndexChange={index => this.setState({ index })}
            // initialLayout={{ width: Dimensions.get('window').width }}
        />
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'orders':
                return <CustomerOrders
                    navigation = {this.props.navigation}
                />;
            case 'information':
                return <NewCustomer
                    password={true}
                    navigation = {this.props.navigation}
                    state={this.state}
                    validateInput={this.validateInput}
                    shippingShow={this.shippingShow}
                    submit={this.saveAccountData}
                    submitText={'Save'}
                />;
            default:
                return null;
        }
    };

}



const styles = StyleSheet.create({
    container: {
        flex:1,
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
export default connect(mapStateToProps,mapDispatchToProps)(Account);
