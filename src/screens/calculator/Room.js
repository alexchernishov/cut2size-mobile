import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert,
    ScrollView,
    Image,
    TouchableHighlight, TouchableOpacity,
} from 'react-native';

import {get} from '../../api/main'
import { connect } from 'react-redux';
import { store } from '../../store/store';
import {setRoom} from '../../actions/kit';

// Screen: Counter
class Room extends React.Component {




    constructor(props) {
        super(props);

        this.state={
            rooms:[]
        }
    }


    componentDidMount() {

        this.getRooms();

    }


    getRooms(){
        get('calc','kit/api/room?fields=id,name,small_image,clickable' )
            .then(res => {
                let rooms = res;
                if(res instanceof Array){
                    this.setState({ rooms });
                }else{
                    Alert.alert('Warning',res)
                }
            })
            .catch(err => {
                console.log(222);
                console.log(err);
                let rooms = [];
                this.setState({ rooms });
            });
    }



    chooseRoom(e, room){
        let type = room.name;
        e.preventDefault();



        if(typeof room.clickable !=='undefined' && room.clickable===0){
            return;
        }

        store.dispatch( setRoom({ room: type}));
        this.props.navigation.navigate('Cabinet')

    }


    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                {
                    this.state.rooms.map((item,index) => {
                        return <View style={{
                            flex: 0.4,
                            alignSelf: 'stretch',
                            justifyContent:'center',
                        }} key={index}><TouchableOpacity

                            style={{
                                flex: 0.9,

                                // alignSelf: 'stretch',

                            }}
                            onPress={e=>this.chooseRoom(e,  item)}>
                            <Image style={{
                                flex: 1,
                                alignSelf: 'stretch',

                            }}
                                // width={200}
                                // height={100}
                                   resizeMode="cover"
                                   source={{uri:item.small_image}}/>
                        </TouchableOpacity>
                            {(typeof item.clickable !=='undefined' && item.clickable===0) ?
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text>Centered text</Text>
                            </View> :false}
                            <Text  style={{
                                // flex: 1,
                                alignSelf: 'center',

                            }}>{item.name}</Text>
                        </View>
                    })
                }



            </ScrollView>
        )
    }



    }

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1
    },
    item:{
        backgroundColor: '#2196f3',
        margin:10,
        padding: 10,
        borderRadius : 10,
        flex:1,
    },
    textItem:{
        fontSize:15,
        color:'#fff'
    }

});




// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
    };
};


// Exports
export default connect(mapStateToProps)(Room);

