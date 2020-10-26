import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';

import s from '../css/styles';
import { createDatabase, populateCardsTable } from '../api/local/sqlite';
import { CacheDir, DocumentDir } from 'redux-persist-fs-storage';
import { getSystemName } from 'react-native-device-info';

import {connect} from 'react-redux';
import { signin, clearErrorMessage, authError } from '../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../api/remote/heroku';
import { navigate } from '../navigationRef';

const RNFS = require('react-native-fs');


const SignInScreen = (props) => {
  const systemName = getSystemName().toLowerCase();
  const base = `SayItOut2.db`;
  const destIos = CacheDir.replace('Caches', 'NoCloud');
  const destAndroid = DocumentDir.replace('Caches', 'NoCloud');

  if(systemName.includes('android')){
    RNFS.exists(`${destAndroid}/${base}`).then(res => {
      if(!res){
        createDatabase();
        populateCardsTable();
        }
    });
  }else if(systemName.includes('ios')){
    RNFS.exists(`${destIos}/${base}`).then(res => {
      if(!res){
        createDatabase();
        populateCardsTable();
        }
    });
  } 
  const onSignIn = props.sign_in;
  return (
    <>
      <KeyboardAvoidingView style={s.container} behavior='height'>
        <NavigationEvents onWillFocus={props.clear_error_message} />
        <AuthForm
          headerText="signin"
          errorMessage={props.auths.errorMessage}
          submitButtonText="Sign in"
          onSubmit={onSignIn}
        />
      </KeyboardAvoidingView>
    </>
  );
};


const mapStateToProps = (state) => {

  return {
   auths:state.authReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    sign_in: async ({email, password}) => {
      try {
        const response = await api.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('email', email);
        if (response ){
          dispatch(signin(response.data.token, email));
          navigate('Home');
        }
      } catch (err) {
        dispatch(authError());
        console.log(err)
      } 
    },
    clear_error_message: () => dispatch(clearErrorMessage()),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignInScreen);
