import React,{Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import commonStyles from '../../screens/calculator/styles';


export class InputContainer extends Component{

    state={
      focus:false
    };

    render(): React.ReactNode {
        return <View style={[styles.rowContainer]}>
                    <View style={{flexDirection: 'row'}}>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:1, backgroundColor:'#fff',padding:10}}>
                            {(this.state.focus||this.props.value )&&
                            <Text style={commonStyles.selectTitle}>{this.props.label}</Text>
                            }
                            <TextInput
                                name={this.props.name}
                                placeholder = {!this.state.focus ? (this.props.state.errors[this.props.name] ?this.props.state.errors[this.props.name] :this.props.label) :''}
                                placeholderTextColor = {this.props.state.errors[this.props.name] ? "#ff7584" :"#3492f4"}
                                autoCapitalize = "none"
                                value={this.props.value}
                                multiline={false}
                                onChangeText={value=>this.props.onChangeText(value)}
                                blurOnSubmit={true}
                                keyboardType={this.props.type==='number' ? 'numeric' :'default'}
                                style={[commonStyles.input]}
                                onFocus={e=>this.setState({focus:true})}
                                onBlur={ e=>this.props.onBlur || this.setState({focus:false})}
                                secureTextEntry={this.props.type==='password'}

                            />
                        </View>
                    </View>
                </View>;
    }


}

const styles = StyleSheet.create({

    inputContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    rowContainer:{
        flexDirection: 'column',
        alignItems: 'center'
    },
});

