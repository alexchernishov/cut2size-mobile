import React from 'react';
import {
    View,
    Picker, Text,
    Platform,
    Modal, Animated, TouchableOpacity,TouchableHighlight
} from 'react-native';
const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];

export default class MultiPlatformPicker extends React.Component {

    state={
        modalVisible:false,
        animatedHeight: new Animated.Value(0),

    };
    constructor(props){
        super(props);

        this.setModalVisible=this.setModalVisible.bind(this);
        this.onPressMask=this.onPressMask.bind(this);
    }


    setModalVisible(visible) {
        const {height, duration} = {
            height:200,
            duration:200,

        };

        console.log('setModalVisible',visible);

        // slide animation
        if (visible) {
            this.setState({modalVisible: visible});
            let self = this;
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: height,
                    duration: duration
                }
            ).start();
        } else {
            return Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: 0,
                    duration: duration
                }
            ).start(() => {
                this.setState({modalVisible: visible});
            });
        }
    }

    onPressMask() {
        this.setModalVisible(false);
    }

    render(){
        return (
            Platform.OS==='ios' ?
                <View>
                <TouchableOpacity onPress={e=>{e.preventDefault();this.setModalVisible(true)}}><Text>{this.props.value}</Text></TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType="none"
                        visible={this.state.modalVisible}
                        supportedOrientations={SUPPORTED_ORIENTATIONS}
                        onRequestClose={() => {this.setModalVisible(false);}}
                    ><TouchableOpacity
                    style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        backgroundColor: '#00000077'
                    }}
                    onPress={this.onPressMask}
                    ><Animated.View
                        style={[{height: this.state.animatedHeight, backgroundColor:'grey'}]}
                    >
                        <Picker
                            selectedValue={this.props.value}
                            style={this.props.style}
                            onValueChange={(itemValue, itemIndex) =>
                                this.props.onChange(this.props.name,itemValue)
                            }>
                            {this.props.values.map((value,index)=>(<Picker.Item key={index} label={value} value={value} />)
                            )}
                        </Picker></Animated.View></TouchableOpacity>
                    </Modal>
                </View>
                    :

                    <Picker
                        // selectedValue={this.state.language}
                        style={this.props.style}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.onChange(itemValue)
                        }>
                        {this.props.values.map((value,index)=>(<Picker.Item key={index} label={value} value={value} />)
                        )}
                    </Picker>



        );
    };

}
