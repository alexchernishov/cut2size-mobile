import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import commonStyles from '../screens/calculator/styles';

class MainButton extends React.Component{



    render() {
        return      <TouchableOpacity
            onPress={this.props.onPress}
            disable={this.props.disable}
            style={[commonStyles.button,commonStyles.columnMargin,this.props.styles]}><Text style={[commonStyles.colorWhite,{textAlign:'center'}]}>{this.props.children}</Text>
        </TouchableOpacity>

    }

}



// Exports
export default MainButton;
