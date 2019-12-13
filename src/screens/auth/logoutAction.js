const logoutAction =(props) =>{
    props.setToken(false);
    props.setCurrentCustomer({});
    props.clearCart({});
    props.navigation.navigate('AuthScreen');
};

export default logoutAction;
