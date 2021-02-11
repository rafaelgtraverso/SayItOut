import React, { useState } from 'react';
import s from '../css/styles';
import { SafeAreaView ,View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { clearErrorMessage, authError } from '../actions/auth';

import { navigate } from '../navigationRef';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth'
import NavLink from '../components/NavLink';
import { isValidEmail } from '../helpers/validators/validators';

const RecoveryPasswordScreen = props => {
  const { reset_password, auths:{ errorMessage } } = props;
  const [email, setEmail] = useState('');

  return (
    <>
      <SafeAreaView style={s.container}>
        <View style={s.containerInput}>
            <Text style={s.text}> Please enter you email address to reset your password:</Text>
            <Input
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Email'
                leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color='black'
                    />
                }
                />
                {errorMessage ? <Text style={s.error}>{errorMessage}</Text> : null}
                <Button
                title='Reset'
                onPress={()=>reset_password(email)}
                buttonStyle={s.button}
                />
                <NavLink
                    routeName="Signin"
                    text="I remember my password take me back to Sign In"
                />
        </View>
      </SafeAreaView>
    </>
  );
};

RecoveryPasswordScreen.propTypes = {
  reset_password: PropTypes.func,
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
    reset_password: async (email) => {
      if ( !isValidEmail(email)){
        dispatch(authError('Invalid email'));
        return
      }
      await auth().sendPasswordResetEmail(email)
        .then(()=>navigate('Signin'))
        .catch(() => {
          dispatch(authError(`Something went wrong! Please make sure you have enter the same email you use when you register.
              If you are sure is the correct email, please contact support@cloudingsystems.co.uk`))
        });
    },
    clear_error_message: () => dispatch(clearErrorMessage()),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(RecoveryPasswordScreen);
