import React from 'react';
import {Text, Button} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';
import s from '../css/styles'
import {connect} from 'react-redux';
import { signout } from '../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../navigationRef';
import PropTypes from 'prop-types';

const AccountScreen = (props) => {
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={s.text}> My Account</Text>
      <Spacer />
      <Button title="Log out" onPress={props.sign_out} />
    </SafeAreaView>
  );
};

AccountScreen.propTypes = {
  sign_out: PropTypes.func,
  auths: PropTypes.object
};

const mapStateToProps = (state) => {

  return {
   auths:state.authReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    sign_out: async () => {
      await AsyncStorage.removeItem('token');
      dispatch(signout);
      navigate('Signin');
    }  
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AccountScreen);
