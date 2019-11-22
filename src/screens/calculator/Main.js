import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert,
    ScrollView,
    Image,
    TouchableHighlight
} from 'react-native';

import {get} from '../../api/main'

// Screen: Counter
class Calculator extends React.Component {




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
        get('kit/api/room?fields=id,name,small_image,clickable' )
            .then(res => {
                let rooms = res;
                console.log(res);
                this.setState({ rooms });
            })
            .catch(err => {
                console.log(222);
                console.log(err);
                let rooms = [];
                this.setState({ rooms });
                if (err.response) {
                    if(err.response.status === 401){
                        // window.location.href = '/login'
                    }
                }
            });
    }



    chooseRoom(e, room){
        let type = room.name;
        e.preventDefault();



        if(typeof room.clickable !=='undefined' && room.clickable===0){

            return;
        }

        // store.dispatch( setRoom({ room: type}) );
        return false;
    }


    render() {
        return (
                    <SafeAreaView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}

                    ><ScrollView>
                        {this.state.rooms.map((item,index)=>{
                            return <View style={{
                                flex: 1,
                                // alignSelf: 'stretch',
                            }} key={index}><TouchableHighlight>
                                <Image style={{
                                    flex: 1,
                                    // alignSelf: 'stretch',
                                }}
                                       width={100}
                                       height={100}
                                       resizeMode={'contain'}
                                       source={{uri:item.image}}/>
                            </TouchableHighlight>
                                <Text>{item.name}</Text>
                            </View>
                        })}
                        </ScrollView>
                    </SafeAreaView>
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



export default Calculator;
