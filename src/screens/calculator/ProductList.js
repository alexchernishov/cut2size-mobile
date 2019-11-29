import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList, Image, Dimensions, View, ImageBackground,
} from 'react-native';
const window = Dimensions.get('window');

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }


    chooseItem=(e,type,item)=>{

        this.props.navigation.state.params.onPress(e,type,item);
        this.props.navigation.navigate('Specifications');
    };

    render() {

        let products = (this.props.navigation.state.params.modalProducts && this.props.navigation.state.params.modalProducts[0]) ? this.props.navigation.state.params.modalProducts[0].products : [];


        return (
            <FlatList
                contentContainerStyle={styles.container}
                keyExtractor={(_, index) => index}
                numColumns={2}
                data={products}
                renderItem={this.renderItem}
                ListEmptyComponent={<Text style={{alignSelf:'center'}}>Nothing found</Text>}
            />
        );
    };

    renderItem=(item)=>{

        let type = (this.props.navigation.state.params.modalProducts && this.props.navigation.state.params.modalProducts[0]) ? this.props.navigation.state.params.modalProducts[0].slug : false;
        item = item.item;
        return <TouchableOpacity
                onPress={e=>this.chooseItem(e,type,item)}
                style={{
                    flex:1/2,
                    aspectRatio:1
                }}>
                    <ImageBackground style={{
                        flex: 1,
                        justifyContent:'center',
                        alignItems:'flex-end',
                        flexDirection: 'row',

                    }} resizeMode='cover' source={{ uri:  item.image}}>
                        <View style={{
                            borderWidth:1,
                            borderColor:'#000',
                            backgroundColor:'#fff',
                            flex:1,

                        }}>
                            <Text style={{textAlign:'center'}}>{item.name}</Text>
                        </View>
                    </ImageBackground>
    </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item:{
        width: '50%'
    },
    textItem:{
        fontSize:15,
        color:'#fff'
    }
});

export default ProductList
