import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';

import s from '../css/styles';

import { connect } from 'react-redux';
import { signin, clearErrorMessage, authError } from '../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

import { navigate } from '../navigationRef';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth'

const SignInScreen = props => {
  const { sign_in,clear_error_message, auths:{ errorMessage } } = props;

  return (
    <>
      <KeyboardAvoidingView style={s.container} behavior='height'>
        <NavigationEvents onWillFocus={clear_error_message} />
        <AuthForm
          headerText="signin"
          errorMessage={errorMessage}
          submitButtonText="Sign in"
          onSubmit={sign_in}
        />
      </KeyboardAvoidingView>
    </>
  );
};

SignInScreen.propTypes = {
  sign_in: PropTypes.func,
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
    sign_in: async ({ email, password }) => {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password
        );
        if (response && response.user){
          await AsyncStorage.setItem('token', (await response.user.getIdTokenResult()).token);
          await AsyncStorage.setItem('email', email);
          dispatch(signin((await response.user.getIdTokenResult()).token, email));
          navigate('Home');
        }
      } catch (err) {
        dispatch(authError('Please check your credentials'));
        console.log(err)
      }
    },
    clear_error_message: () => dispatch(clearErrorMessage()),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignInScreen);
