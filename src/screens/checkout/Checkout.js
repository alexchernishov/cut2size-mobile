import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';

class Checkout extends React.Component{



    render() {
        return <ScrollView
            style={styles.container}
            contentContainerStyle={{

            }}
        ><Text>Checkout</Text>
                </ScrollView>
    }

}


const styles = StyleSheet.create({

});

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
export default connect(mapStateToProps)(Checkout);
