import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList, Image, Dimensions,
} from 'react-native';
import commonStyles from '../styles';

const window = Dimensions.get('window');


class ProductKitSelect extends React.Component {


    render(){
       let type = this.props.type;
       console.log(this.props.modalProducts);
        return (
            <React.Fragment>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}><Text style={commonStyles.selectTitle}>{type.name}</Text></View>
                <View  style={{flexDirection:'row', alignItems:'center'}} ><TouchableOpacity onPress={e=>this.props.onOpenModal(type,e)} style={commonStyles.selectItem} disabled={type.disabled}>{this.props.calcOptions.materials[type.slug] ? this.props.calcOptions.materials[type.slug].name  : <Text>Default</Text>}</TouchableOpacity></View>
            </View>
                <Modal
                    style={{backgroundColor: '#fff'}}
                    transparent={true}
                     visible={this.props.modalOpen}
                     onRequestClose={this.props.onCloseModal}
                    center>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: '#00000077'
                        }}
                        onPress={this.props.onCloseModal}>
                        <FlatList
                            contentContainerStyle={styles.container}
                            keyExtractor={(_, index) => index}
                            numColumns={2}
                            data={this.props.modalProducts}
                            renderItem={this.renderItem}
                            ListEmptyComponent={<Text style={{alignSelf:'center'}}>Nothing found</Text>}
                        />
                    </TouchableOpacity>
                </Modal>
            </React.Fragment>
        );
    };

    renderItem=(item)=>{
        item = item.item;
        return <TouchableOpacity  >
            <Image   style={{
                width:window.width/2,
                height:window.width/2,
            }}
                     resizeMode="contain"
                     source={{uri:item.image}} />
        </TouchableOpacity>
    }
}


class ProductModal extends React.Component {

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

export default ProductKitSelect
