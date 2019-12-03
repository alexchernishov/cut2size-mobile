// Imports: Dependencies
import React from 'react';
import {TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {Icon} from 'react-native-elements';

// Screen Dimensions

// Screen: Counter
class CartIcon extends React.Component {



    render() {
        return (
            ( this.props.quantityTotal && this.props.quantityTotal>0) ?
            <TouchableOpacity style={{marginRight:10}} onPress={() => this.props.navigation.navigate('Cart')}>
                <Icon name='shopping-cart' type={'font-awesome'} size={30} style={{paddingHorizontal: 10}}/>
            </TouchableOpacity>:false
        )
    }
}



// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        products: state.cartReducer.products,
        quantityTotal: state.cartReducer.quantityTotal,
        total: state.cartReducer.total,
    };
};

// Exports
export default connect(mapStateToProps)(CartIcon);
