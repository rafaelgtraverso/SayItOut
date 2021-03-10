import React, { useState } from 'react';
import s from '../css/styles';
import {
  Container,
  Header,
  Left,
  Content,
  Input,
  Item,
  Text,
  Button,
  Icon,
  View,
  Body,
  Right
} from 'native-base';
import Spacer from '../components/Spacer';
import { connect } from 'react-redux';
import {
  clearErrorMessage,
  authError
} from '../actions/auth';
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
      <Container>
        <Header transparent>
          <Left>
            <Button transparent onPress={()=>navigate('Signin')}>
              <Icon name='arrow-back-outline' type='Ionicons' style={s.headerContent}/>
            </Button>
          </Left>
          <Body/>
          <Right/>
        </Header>
        <Content contentContainerStyle={s.containerForm}>
          <Text style={s.recoveryTitle}> Please enter you email address to reset your password:</Text>
          <Spacer/>
          <View style={s.authForm}>
            <Item rounded>
              <Icon
                name='user'
                type='FontAwesome'
                fontSize={24}
                style={s.inputIcon}
              />
              <Input
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Email'
              />
            </Item>
            <Spacer/>
            {errorMessage ? <Text style={s.error}>{errorMessage}</Text> : null}
            <Spacer/>
            <Button rounded block light onPress={()=>reset_password(email)}>
              <Text style={s.button}>Reset Password</Text>
            </Button>
            <Spacer/>
            <NavLink
                routeName="Signin"
                text="I remember my password take me back to Sign In"
            />
          </View>
        </Content>
      </Container>
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
