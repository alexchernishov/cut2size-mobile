import React from 'react';
import {ScrollView, StyleSheet, View,Text} from 'react-native';
import {connect} from 'react-redux';
import {InputContainer} from '../../components/views/InputContainer';
import {formatPrice, ucfirst} from '../../functions/main';
import MainButton from '../../components/MainButton';
import {Icon} from 'react-native-elements';
import CartTotal from '../../components/cart/CartTotal';
import {REACT_APP_SHIPPING_PRICE} from 'react-native-dotenv';

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
            shipping:true
        };

        this.validateInput= this.validateInput.bind(this);
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
                    <MainButton>Procced to payment</MainButton>
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
                           let value = this.props.state.inputs[input].value;

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
    };
};

// Exports
export default connect(mapStateToProps)(Checkout);
