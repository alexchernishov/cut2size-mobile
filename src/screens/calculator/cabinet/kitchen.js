import React  from 'react';

import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';



class Kitchen extends React.Component {




    componentDidMount(){
        // this.props.svgFunctions( 'kitchen');
    }

    render() {
        let room = this.props.room;

        return <View>
            {(room.length>0 || room.id) ?
                <Text>222</Text>
                 : false}
            </View>

    }
}


export default Kitchen;
