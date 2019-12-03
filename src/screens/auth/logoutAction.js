const logoutAction =(props) =>{
    props.setToken(false);
    props.setCurrentCustomer({});
    props.clearCart({});
    props.navigation.goBack(null);
};

export default logoutAction;
