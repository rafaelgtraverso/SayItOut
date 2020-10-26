import React, { useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';

import s from '../css/styles';
import { createDatabase, populateCardsTable } from '../api/local/sqlite';
import { CacheDir, DocumentDir } from 'redux-persist-fs-storage';
import { getSystemName } from 'react-native-device-info';

import {connect} from 'react-redux';
import { signin, clearErrorMessage } from '../actions/auth';

const RNFS = require('react-native-fs');


const SignInScreen = (props) => {
  console.log('Im in sign in screenr');
  const systemName = getSystemName().toLowerCase();
  //const {state, signin, clearErrorMessage} = useContext(AuthContext);
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
  console.log(onSignIn.toString());
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
    sign_in: ({email, password}) => dispatch(signin({email, password})),
    //signup: ({email, password}) => dispatch(signup({email, password})),
    clear_error_message: () => dispatch(clearErrorMessage()),
    //signout: () => dispatch(signout())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignInScreen);
