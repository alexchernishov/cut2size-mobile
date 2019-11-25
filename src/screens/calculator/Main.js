import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { store } from '../../store/store';
import {getCalcCategories, setCabinet, setKitType} from '../../actions/kit';

// Screen: Counter
class Calculator extends React.Component {




    state={
        selectedCategory:{
            slug:false
        }
    };


    constructor(props){
        super(props);
        setKitType(false);
        store.dispatch(setCabinet({cabinet: true}));
        if(!this.props || !this.props.calcCategories){
            store.dispatch(getCalcCategories());
        }

    }



    selectCategory(e,category){
        e.preventDefault();
        this.setState({selectedCategory:category},()=>{
            if(this.state.selectedCategory && this.state.selectedCategory.base && this.state.selectedCategory.base===1){
                // this.props.history.push(this.props.parentRoute);
                this.props.navigation.navigate('Room');
            }else{
                // setKitType(this.state.selectedCategory.slug);
                // store.dispatch(setCabinet({cabinet: false}));
                //
                // this.props.history.push({
                //     pathname: this.props.parentRoute+"/options",
                // });
                console.warn('NOBase');

            }
        })
    }




    render() {
        return (
                   <ScrollView
                        contentContainerStyle={styles.scrollView}
                    >
                        {this.props.calcCategories && this.props.calcCategories.length>0 ?
                            this.props.calcCategories.map((category,index) => {

                                return <View style={{
                                    flex: 0.4,
                                    alignSelf: 'stretch',
                                    justifyContent:'center',
                                }} key={index}><TouchableOpacity

                                    style={{
                                        flex: 1,

                                        // alignSelf: 'stretch',

                                    }}
                                    onPress={e=>this.selectCategory(e,  category)}>
                                    <Image style={{
                                        flex: 1,
                                        alignSelf: 'stretch',

                                    }}
                                           // width={200}
                                           // height={100}
                                           resizeMode="cover"
                                           source={{uri:category.image}}/>
                                </TouchableOpacity>
                                    <Text  style={{
                                        // flex: 1,
                                        alignSelf: 'center',

                                    }}>{category.name}</Text>
                                </View>
                            })


                            : false}



                        </ScrollView>
        )
    }



    }

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        calcCategories:state.kitReducer.calcCategories
    };
};


// Exports
export default connect(mapStateToProps)(Calculator);

