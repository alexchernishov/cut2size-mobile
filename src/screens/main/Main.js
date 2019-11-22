import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
} from 'react-native';



// Screen: Counter
class Main extends React.Component {




    constructor(props) {
        super(props);


    }



    componentDidMount(): void {


    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
    }





    render() {
        return (
                    <SafeAreaView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}
                    ><View>
                            <Text>Main</Text>
                        </View>
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



export default Main;
