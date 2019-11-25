import React  from 'react';

import {connect} from "react-redux";

import {store} from "../../store/store";
import {getCalcRooms, setKitType} from '../../actions/kit';
import { ScrollView, Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import Kitchen from './cabinet/kitchen';

import Svg, {

    Path,

} from 'react-native-svg';


class Cabinet extends React.Component {

    state = {
        room: [],
    };

    constructor(props){
        super(props);


        let filterroom  = (this.props && this.props.kit&& this.props.kit.room) ? '&filter[name]='+this.props.kit.room : '';
        store.dispatch(getCalcRooms(filterroom));

    }




    svgItems(room,props){

        return room.kitCategories.map((category,index) =>{
            return (category.show && category.show===1) ?
                <Path
                    key={index}
                    style={{
                        backgroundColor:'green'
                    }}
                    // onMouseMove={evt => props.roomShowTooltip(evt, category.name, room.name)}
                    //   onMouseOut={evt => props.roomHideTooltip(evt)}
                    d={category.path}
                /> : false;
        });
    }


    selectItem(e,room){
        e.preventDefault();

        setKitType(room.alias);
        this.props.navigation.navigate('Options');
    };

    render() {

        let roomList = {
            kitchen: '',
            bathroom: '',
            closet: '',
        };

        let self_state = this.props.kit.calcRooms;

        console.log(this.props.kit);
        return (
            <ScrollView

            >{ self_state.map(room => {

                    let Room  = roomList[room.name];
                    return(
                                room.kitCategories.map((category,index) => {
                                    return (category.show && category.show === 1) ?
                                        this.renderCategory(category,index)
                                        : false;
                                })
                        )
                })}
            </ScrollView>
        );

    }

    renderCategory(item,index){

        return  <TouchableOpacity key={index} onPress={e=>this.selectItem(e,item)} style={styles.caregoryItem}><Text>{item.name}</Text></TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    caregoryItem:{
        backgroundColor: '#c2c2c2',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        flex:1,
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
    }
});


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        kit:state.kitReducer
    };
};


export default connect(mapStateToProps)(Cabinet);
