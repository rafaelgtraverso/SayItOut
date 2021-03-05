import React from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Text,
  Button,
  Right,
  Content
} from 'native-base';
import s from '../css/styles'
import { connect } from 'react-redux';
import { signout } from '../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../navigationRef';
import PropTypes from 'prop-types';

const AccountScreen = props => {
  const { sign_out } = props;
  return (
    <Container>
      <Header>
        <Left/>
        <Body>
          <Title><Text style={s.headerContent}>Settings</Text></Title>
        </Body>
        <Right/>
      </Header>
      <Content>
        <Button transparent block large onPress={sign_out}>
          <Text>Log Out</Text>
        </Button>
      </Content>
    </Container>
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
      await AsyncStorage.removeItem('email');
      dispatch(signout);
      navigate('Signin');
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AccountScreen);
