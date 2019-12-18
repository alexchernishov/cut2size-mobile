import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, TouchableHighlight, Image, TextInput, Alert} from 'react-native';
import styles from './style';
import {postForm} from '../../api/main';
import {setCurrentCustomer, setToken} from '../../actions/authentication';
import {connect} from 'react-redux';
import {MyText} from '../../components/views/Base';
import {store} from '../../store/store';
import jwt_decode from "jwt-decode";
import { MOBILE_URL} from 'react-native-dotenv'

class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign up',
    };

    state = {
        email   : '',
        password: '',
        repassword: '',
        errors:{
            email:false,
            password:false,
            repassword:false,
        }
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (e) => {

        this.setState({
            errors:{
                email:false,
                password:false,
                repassword:false,
            }
        });
        e.preventDefault();
        postForm('API','customers/signup',{
            email:this.state.email,
            password:this.state.password,
            repassword:this.state.repassword,
            mobile:MOBILE_URL
        },false,this.props,"PUT").then(result=>{
            console.log(result);
            if(result.errors){
                this.setState({
                    errors:result.errors,
                    email:'',
                    password:'',
                    repassword:''
                })
            }else{
                Alert.alert('',result,[{text: 'OK', onPress: () => this.props.navigateToLogin()}],)

            }
            if(result.token){
                const decoded = jwt_decode(result.token);
                store.dispatch(setCurrentCustomer(decoded));
                this.props.setToken(result.token);
                this.props.navigation.goBack(null);
            }
        });

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'data:image/png;base64,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\n'}}/>
                    <TextInput style={styles.inputs}
                               placeholder={this.state.errors.email ? this.state.errors.email :  'Email'}
                               { ...((this.state.errors.email) ? {placeholderTextColor:'red'} : '') }
                               { ...((this.state.errors.email) ? {placeholderTextColor:'red'} : '') }
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               value={this.state.email}
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'data:image/png;base64,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\n'}}/>
                    <TextInput style={styles.inputs}
                               placeholder={this.state.errors.password ? this.state.errors.password :  'Password'}
                               { ...((this.state.errors.password) ? {placeholderTextColor:'red'} : '') }
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               value={this.state.password}
                               onChangeText={(password) => this.setState({password})}/>
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'data:image/png;base64,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\n'}}/>
                    <TextInput style={styles.inputs}
                               placeholder={this.state.errors.repassword ? this.state.errors.repassword :  'Retype password'}
                               { ...((this.state.errors.repassword) ? {placeholderTextColor:'red'} : '') }
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               value={this.state.repassword}
                               onChangeText={(repassword) => this.setState({repassword})}/>
                </View>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={(e) => this.onSubmit(e)}>
                    <MyText style={styles.loginText}>Sign Up</MyText>
                </TouchableHighlight>
            </View>
        );
    }


}





// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        setToken: (token) => dispatch(setToken(token)),
    };
};

// Exports
export default connect(null, mapDispatchToProps)(SignUpScreen);

