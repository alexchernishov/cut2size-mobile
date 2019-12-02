const logoutAction =(props) =>{
    props.setToken(false);
    props.setCurrentCustomer({});
    props.navigation.goBack(null);
};

export default logoutAction;
