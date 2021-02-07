import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import AuthForm from '../components/AuthForm';
import { NavigationEvents } from 'react-navigation';
import s from '../css/styles';
import { connect } from 'react-redux';
import { clearErrorMessage, signin, authError } from '../actions/auth';
import { navigate } from '../navigationRef';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth'

const SignUpScreen = props => {
  const { sign_up,clear_error_message,auths:{ errorMessage } } = props;
  return (
    <KeyboardAvoidingView style={s.container} behavior='height'>
      <NavigationEvents onWillFocus={clear_error_message} />
      <AuthForm
        headerText="signup"
        errorMessage={errorMessage}
        submitButtonText="Sign Up"
        onSubmit={sign_up}
      />
    </KeyboardAvoidingView>
  );
};

SignUpScreen.propTypes = {
  dosign_up: PropTypes.func,
  sign_up: PropTypes.func,
  clear_error_message: PropTypes.func,
  auths: PropTypes.object
};

const mapStateToProps = (state) => {

  return {
   auths:state.authReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    sign_up: async ({ email, password }) => {
      const emailPattern = /^\w+(\.\w+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2}){0,1}$/;
      if ( !email.match(emailPattern)){
        dispatch(authError('Invalid email'));
        return
      }
      if(password.length < 6){
        dispatch(authError('The password must be at least 6 characters'));
        return
      }
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        )
        if (response && response.user){
          response.user.sendEmailVerification();
          await AsyncStorage.setItem('token', response.user.toJSON().refreshToken);
          await AsyncStorage.setItem('email', email);
          dispatch(signin(response.user.toJSON().refreshToken, email));
          navigate('Home');
        }
      } catch (err) {
        dispatch(authError('Something went wrong with the sign up'));
        console.log(err);
      }
    },
    clear_error_message: () => dispatch(clearErrorMessage()),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
