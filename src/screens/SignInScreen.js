import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';

import s from '../css/styles';
import { createDatabase, populateCardsTable } from '../api/local/sqlite';
import { CacheDir, DocumentDir } from 'redux-persist-fs-storage';
import { getSystemName } from 'react-native-device-info';

const RNFS = require('react-native-fs');


const SignInScreen = (payload) => {
  const {navigation} = payload;
  const systemName = getSystemName().toLowerCase();
  const {state, signin, clearErrorMessage} = useContext(AuthContext);
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

  return (
    <>
      <View style={s.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm
          headerText="Sign In"
          errorMessage={state.errorMessage}
          submitButtonText="Sign in"
          onSubmit={signin}
        />
        <NavLink
          navigation={navigation}
          routeName="Signup"
          text="Don't have an account? Sign up instead"
        />
      </View>
    </>
  );
};

export default SignInScreen;
