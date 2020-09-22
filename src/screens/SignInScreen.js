import React, {useContext} from 'react';
import {View} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';
import {Context as AuthContext} from '../context/AuthContext';

import s from '../css/styles';
import { createDatabase, populateCardsTable } from '../api/local/sqlite';
const RNFS = require('react-native-fs');

const SignInScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage} = useContext(AuthContext);
  // const base = `SayItOut.db`;
  // const dest = RNFS.CachesDirectoryPath.replace('Caches', 'NoCloud');
  
  // RNFS.exists(`${dest}/${base}`).then(res => {
  //   if(!res){
  //     createDatabase();
  //     populateCardsTable();
  //     }
  // });

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
