import React from 'react';
import {
    View,
    Picker, Text,
    Platform,
    Modal, Animated, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';

const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];

export default class MultiPlatformPicker extends React.Component {

    state={
        modalVisible:false,
        animatedHeight: new Animated.Value(0),
        value:false
    };
    constructor(props){
        super(props);

        this.setModalVisible=this.setModalVisible.bind(this);
        this.onPressMask=this.onPressMask.bind(this);
        this.onPressCancel=this.onPressCancel.bind(this);
    }


    setModalVisible(visible) {

        const {height, duration} = {
            height:200,
            duration:200,

        };


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
        this.props.onChange(this.props.name,this.state.value);
        this.setModalVisible(false);
    }
    onPressCancel() {
        this.setModalVisible(false);
    }
    componentDidMount(): void {
        this.setState({
            value:this.props.value
        })
    }

    render(){

        return (
            Platform.OS==='ios' ?
                <TouchableOpacity style={this.props.style}  onPress={e=>{this.setModalVisible(true)}}><Text>{this.props.value}</Text>
                    <Modal
                        transparent={true}
                        animationType="none"
                        visible={this.state.modalVisible}
                        supportedOrientations={SUPPORTED_ORIENTATIONS}
                        onRequestClose={() => {this.setModalVisible(false);}}
                    ><TouchableOpacity
                        activeOpacity={1}
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                            backgroundColor: '#00000077'
                        }}
                        onPress={this.onPressMask}
                    ><Animated.View
                        style={[{height: this.state.animatedHeight, backgroundColor:'#ffffff',flex:1}]}
                    ><View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:10,marginRight:10}}>
                        <Icon name={'cancel'} onPress={this.onPressCancel}/>
                        <Icon name={'check'} onPress={this.onPressMask}/>
                    </View>
                        <Picker
                            selectedValue={this.state.value}
                            style={{flex:1}}
                            onValueChange={(itemValue, itemIndex) =>
                               this.setState({value:itemValue})
                            }>
                            {this.props.values.map((value,index)=>(<Picker.Item key={index} label={value} value={value} />)
                            )}
                        </Picker></Animated.View></TouchableOpacity>
                    </Modal>
                </TouchableOpacity>
                    :
                    <View style={this.props.style}>
                        <Picker
                            // selectedValue={this.state.language}
                            style={{
                                width:'100%',
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.props.onChange(this.props.name,itemValue)
                            }
                            selectedValue={this.props.value}
                        >
                            {this.props.values.map((value,index)=>(<Picker.Item key={index} label={value} value={value} />)
                            )}
                        </Picker>
                    </View>




        );
    };

}
