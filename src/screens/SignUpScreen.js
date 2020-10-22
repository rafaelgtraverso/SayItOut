import React, { useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { NavigationEvents } from 'react-navigation';
import s from '../css/styles';

const SignUpScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  return (
    <KeyboardAvoidingView style={s.container} behavior='height'>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="signup"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
