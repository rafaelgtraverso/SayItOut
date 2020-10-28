import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import AuthForm from '../components/AuthForm';
import { NavigationEvents } from 'react-navigation';
import s from '../css/styles';
import { connect } from 'react-redux';
import { clearErrorMessage, signin, authError } from '../actions/auth';
import api from '../api/remote/heroku';
import { navigate } from '../navigationRef';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

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
      try {
        const response = await api.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('email', email);
        if (response){
          dispatch(signin(response.data.token, email));
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
