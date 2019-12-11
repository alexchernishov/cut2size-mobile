const logoutAction =(props) =>{
    props.setToken(false);
    props.setCurrentCustomer({});
    props.clearCart({});
    props.navigation.navigate('SignIn');
};

export default logoutAction;
