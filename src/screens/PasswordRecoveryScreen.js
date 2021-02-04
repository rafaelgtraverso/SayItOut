import React, { useState } from 'react';
import s from '../css/styles';
import { SafeAreaView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { clearErrorMessage, authError } from '../actions/auth';

import { navigate } from '../navigationRef';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth'
import { View } from 'react-native';

const RecoveryPasswordScreen = props => {
  const { reset_password, auths:{ errorMessage } } = props;
  const [email, setEmail] = useState('');

  return (
    <>
      <SafeAreaView style={s.containerForm}>
        <View style={s.containerInput}>
            <Text style={s.logosTitle}> Please enter you email address to reset your password:</Text>
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
      try {
        await auth().sendPasswordResetEmail(email).then(navigate('Signin'));
      } catch (err) {
        dispatch(authError('Something went wrong! Please make sure you have enter the same email you use when you register. If you are sure is the correct email, please contact support@cloudingsystems.co.uk'));
        console.log(err)
      }
    },
    clear_error_message: () => dispatch(clearErrorMessage()),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(RecoveryPasswordScreen);
