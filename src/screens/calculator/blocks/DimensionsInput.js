import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import commonStyles from '../styles';
import {InputContainer} from '../../../components/views/InputContainer';


class DimensionsInput extends React.Component {


    render(){
        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
                {this.props.showFields ?
                <TextInput
                    name={this.props.type}
                    placeholder = {this.props.errors[this.props.type] ? this.props.errors[this.props.type] :this.props.type}
                    placeholderTextColor = {this.props.errors[this.props.type] ? "#ff7584" :"#3492f4"}
                    autoCapitalize = "none"
                    value={this.props.dim ? this.props.dim : ''}
                    multiline={false}
                    onChangeText={value => this.props.changeInput(this.props.type,value, false,this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                    onBlur={value=>this.props.validateInput(this.props.type,value.nativeEvent.text, false, this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                    blurOnSubmit={true}
                    keyboardType={'numeric'}
                    style={[styles.input,styles.inchInput, (this.props.errors[this.props.type] ?  styles.borderError: false)]}

                />
                :
                    <View style={{ flex:0.8,flexDirection:'row'}}>
                        <TextInput
                            name={this.props.type}
                            placeholder = {this.props.errors[this.props.type] ? this.props.errors[this.props.type] :this.props.type}
                            placeholderTextColor = {this.props.errors[this.props.type] ? "#ff7584" :"#3492f4"}
                            autoCapitalize = "none"
                            value={this.props.in[this.props.type][0]}
                            multiline={false}
                            onChangeText={value => this.props.changeInput(this.props.type,value, 1,this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                            onBlur={value=>this.props.validateInput(this.props.type,value.nativeEvent.text, 1, this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                            blurOnSubmit={true}
                            keyboardType={'numeric'}
                            style={[styles.input,styles.inchInput, (this.props.errors[this.props.type] ?  styles.borderError: false)]}

                        />
                        <TextInput
                            name={this.props.type}
                            placeholder = {this.props.errors[this.props.type] ? this.props.errors[this.props.type] :this.props.type}
                            placeholderTextColor = {this.props.errors[this.props.type] ? "#ff7584" :"#3492f4"}
                            autoCapitalize = "none"
                            value={this.props.in[this.props.type][1]}
                            multiline={false}
                            onChangeText={value => this.props.changeInput(this.props.type,value, 2,this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                            onBlur={value=>this.props.validateInput(this.props.type,value.nativeEvent.text, 2, this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                            blurOnSubmit={true}
                            keyboardType={'numeric'}
                            style={[styles.input,styles.inchInput, (this.props.errors[this.props.type] ?  styles.borderError: false)]}

                        />
                        <TextInput
                            name={this.props.type}
                            placeholder = {this.props.errors[this.props.type] ? this.props.errors[this.props.type] :this.props.type}
                            placeholderTextColor = {this.props.errors[this.props.type] ? "#ff7584" :"#3492f4"}
                            autoCapitalize = "none"
                            value={this.props.in[this.props.type][2]}
                            multiline={false}
                            onChangeText={value => this.props.changeInput(this.props.type,value, 3,this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                            onBlur={value=>this.props.validateInput(this.props.type,value.nativeEvent.text, 3, this.props.kit.kitItem['min_'+this.props.type],this.props.kit.kitItem['max_'+this.props.type], 'number' )}
                            blurOnSubmit={true}
                            keyboardType={'numeric'}
                            style={[styles.input,styles.inchInput, (this.props.errors[this.props.type] ?  styles.borderError: false)]}

                        />
                    </View>
                }
                <Text style={styles.icon}>{this.props.dimension[this.props.type]}</Text>
               <TouchableOpacity onPress={e => this.props.changeDimension(e)}><Icon style={styles.icon} name={'retweet'} /></TouchableOpacity>
            </View>

        );
    };
}


const styles = StyleSheet.create({

    inchInput:{
        flex:0.9,
        marginLeft:2,
        marginRight:2,


    },
    icon:{
        marginLeft:5,
        // flex:0.1,
    },
    borderError:{
        borderWidth:1,
        borderColor:'#ff7584',
    },
    input: {
        flex:1,
        // flexDirection:'row',
        // height:'auto'
        textAlign:'center',
        backgroundColor:'#fff',
        marginBottom:5,
        marginTop:5,
        padding:10,
        color:'#000',

    },
});

export default DimensionsInput
