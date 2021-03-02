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
import auth from '@react-native-firebase/auth';
import { isValidEmail } from '../helpers/validators/validators';


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
      if ( !isValidEmail(email)){
        dispatch(authError('Invalid email'));
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
        if (err.code=='auth/weak-password') dispatch(authError('The password must be at least 6 characters'));
        if (err.code=='auth/email-already-in-use') dispatch(authError('That email address is already in use! Please click in Forgot your password.'))
      }
    },
    clear_error_message: () => dispatch(clearErrorMessage()),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
