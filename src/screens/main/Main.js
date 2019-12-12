import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text, Linking,
} from 'react-native';



// Screen: Counter
class Main extends React.Component {

    componentDidMount(): void {

        // const url = 'cut2size-app://';
        // Linking.canOpenURL(url).then(supported => {
        //     if (!supported) {
        //         console.warn('Can\'t handle url: ' + url);
        //     } else {
        //         console.warn('YEs handle url: ' + url);
        //         // return Linking.openURL(url);
        //     }
        // }).catch(err => console.error('An error occurred', err));
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
