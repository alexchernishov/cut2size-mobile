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
import {setPrice} from '../../../actions/kit';
import {store} from '../../../store/store';

const window = Dimensions.get('window');


class ProductKitSelect extends React.Component {

    constructor(props) {
        super(props);
        this.getProductList = this.getProductList.bind(this);
    }

    getProductList = (e, slug) => {
        e.preventDefault();
        this.props.getProducts(slug).then(res => {
            let modalProducts = res;
            console.log('modalProducts',modalProducts);
            store.dispatch(setPrice({price: false}));
            this.props.navigation.navigate('ProductList', {
                modalProducts: modalProducts,
                onPress: this.props.chooseMaterial
            });
        })
            .catch(err => {
                console.log(err);
                let modalProducts = [];
                this.setState({ modalProducts });
                if (err.response) {
                    if(err.response.status === 401){
                        // window.location.href = '/login'
                    }
                }
            });

    };


    render() {
        let type = this.props.type;
        return (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}><Text
                    style={commonStyles.selectTitle}>{type.name}</Text></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                    onPress={e => this.getProductList(e, type.slug)} style={commonStyles.selectItem}
                    disabled={type.disabled}>{
                        this.props.calcOptions.materials[type.slug] ? <Text>{this.props.calcOptions.materials[type.slug].name}</Text> :
                    <Text>Default</Text>}
                    </TouchableOpacity>
                </View>
            </View>

        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
