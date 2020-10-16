import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';
import s from '../css/styles';

const SignUpScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default SignUpScreen;
