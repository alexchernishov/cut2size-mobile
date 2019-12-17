import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import CartTotal from '../../components/cart/CartTotal';
import {formatPrice, ucfirst} from '../../functions/main';
import {REACT_APP_SHIPPING_PRICE} from 'react-native-dotenv';
import MainButton from '../../components/MainButton';
import {CustomerFields} from './CustomerFields';
import {InputContainer} from '../../components/views/InputContainer';

export class NewCustomer extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return <ScrollView
            style={styles.container}
        >
            <View style={{marginBottom:20}}>
                {this.props.password&&
                 <React.Fragment>
                    <InputContainer
                        state={this.props.state}
                        onChangeText={value => this.props.validateInput('email', value)}
                        name={'email'}
                        type={'text'}
                        label={ucfirst(this.props.state.inputs.email.label)}
                        value={this.props.state.inputs.email.value}

                    />
                    <InputContainer
                        state={this.props.state}
                        onChangeText={value => this.props.validateInput('password', value)}
                        name={'password'}
                        type={'password'}
                        label={ucfirst(this.props.state.inputs.password.label)}
                        value={this.props.state.inputs.password.value}

                    />
                 </React.Fragment>
                }
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
                        onPress={e=>this.props.submit(e)}
                        // disable={this.props.state.proceedPaymentButtonDisable}
                    >{this.props.submitText}</MainButton>}

            </View>
        </ScrollView>
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
