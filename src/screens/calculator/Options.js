import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image, Text,Dimensions,
    FlatList
} from 'react-native';

import { connect } from 'react-redux';
import { get } from '../../api/main';
import {setKitItem} from '../../actions/kit';
const window = Dimensions.get('window');

// Screen: Counter
class Options extends React.Component {


    state = {
        kitCategory: [],
    };

    componentDidMount(){

        this.getKits();

    }


    getKits(){
        let roomFilter  = (this.props.calcRooms && this.props.calcRooms[0]) ? '&filter[room_id]='+this.props.calcRooms[0].id  : '';
        let url = '/kit/api/kit?expand=kits&filter[alias]='+this.props.itemType+roomFilter;
        get('calc',url )
            .then(res => {
                let kitCategory = res;
                this.setState({ kitCategory });
            })
            .catch(err => {
                console.log(err);
                let kitCategory = [];
                this.setState({ kitCategory });
                if (err.response) {
                    if(err.response.status === 401){
                        // window.location.href = '/login'
                    }
                }
            });
    }

    setKit(e,kit){
        setKitItem(kit);
        this.props.navigation.navigate('Specifications')
    }

    render() {
        return (
            <FlatList
                contentContainerStyle={styles.container}
                keyExtractor={(_, index) => index}
                numColumns={2}
                data={this.state.kitCategory}
                renderItem={this.renderKit}
                ListEmptyComponent={<Text style={{alignSelf:'center'}}>Nothing found</Text>}
            />
        )
    }

    renderKit=(item)=>{
        item = item.item;
        return <TouchableOpacity  onPress={e => this.setKit(e, item)}>
            <Image   style={{
                width:window.width/2,
                height:window.width/2,
            }}
                    resizeMode="contain"
                    source={{uri:item.small_image}} />
        </TouchableOpacity>
    }


}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        // height: '100%',
        // width: '100%'
    },
    item:{
        width: '50%'
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
        room:state.kitReducer.room,
        kit:state.kitReducer.kit,
        calcRooms:state.kitReducer.calcRooms,
        itemType:state.kitReducer.itemType,
    };
};

export default connect(mapStateToProps)(Options);

