import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {InputContainer} from '../../components/views/InputContainer';
import {ucfirst} from '../../functions/main';

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
