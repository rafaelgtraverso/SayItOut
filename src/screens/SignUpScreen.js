import React, { useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { NavigationEvents } from 'react-navigation';
import s from '../css/styles';
import {connect} from 'react-redux';
import { signup, clearErrorMessage } from '../actions/auth';

const SignUpScreen = (props) => {
  // const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const onSignUp = props.sign_up;
  console.log(onSignUp.toString());
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
    // sign_in: ({email, password}) => dispatch(signin({email, password})),
    sign_up: ({email, password}) => dispatch(signup({email, password})),
    clear_error_message: () => dispatch(clearErrorMessage()),
    //signout: () => dispatch(signout())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
