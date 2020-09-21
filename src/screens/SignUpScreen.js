import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';
import s from '../css/styles';

const SignUpScreen = ({navigation}) => {
  const {state, signup, clearErrorMessage} = useContext(AuthContext);
  return (
    <View style={s.container}>
      <NavigationEvents focus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead"
      />
    </View>
  );
};

export default SignUpScreen;
