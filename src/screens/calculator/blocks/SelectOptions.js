import React from 'react';
import {
    StyleSheet,
    View, TextInput,
    Text
} from 'react-native';
import commonStyles from '../styles';
import MultiPlatformPicker from '../../../components/MultiplatformPicker';



class SelectOptions extends React.Component {


    render(){

        return (
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <View style={{flexDirection:'row'}}><Text style={commonStyles.selectTitle}>{this.props.description}</Text></View>
                <View style={{flexDirection:'row'}}>
                {(this.props.values && this.props.values.length>1)?
                    <MultiPlatformPicker
                        style={commonStyles.selectItem}
                        onChange = {this.props.onChange}
                        values={this.props.values}
                        value={this.props.value}
                        name={this.props.name}

                    />
                    :
                    <TextInput
                        name={this.props.name}
                        value={this.props.values}
                        disabled={true}
                    />

                }</View>
            </View>

        );
    };
}



const styles = StyleSheet.create({
    input: {
        flex:0.9,
        // flexDirection:'row',
        // height:'auto'
        textAlign:'center',
        backgroundColor:'#fff',
        marginBottom:5,
        marginTop:5,
        padding:10,
        color:'#000'

    },
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

});

export default SelectOptions
