import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import AuthForm from '../components/AuthForm';
import { NavigationEvents } from 'react-navigation';
import s from '../css/styles';
import {connect} from 'react-redux';
import { clearErrorMessage } from '../actions/auth';

const SignUpScreen = (props) => {
  const onSignUp = props.sign_up;
  return (
    <KeyboardAvoidingView style={s.container} behavior='height'>
      <NavigationEvents onWillFocus={props.clear_error_message} />
      <AuthForm
        headerText="signup"
        errorMessage={props.auths.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={onSignUp}
      />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  
  return {
   auths:state.authReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    sign_up: async ({email, password}) => {
      try {
        const response = await api.post('/signup', {email, password});
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

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
