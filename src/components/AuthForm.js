import React, { useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import {
  Item,
  Input,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import s from '../css/styles';
import LogoAndTitle from '../components/LogoAndTitle';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';

const AuthForm = params => {
  const { headerText, errorMessage, onSubmit, submitButtonText } = params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <LogoAndTitle />
      <View style={s.authForm}>
        {headerText=='signup' ? <Text style={s.textForm} h3>Sign Up</Text> : null}
        <Spacer/>
        <Item rounded>
          <Icon
            name='user'
            size={24}
            color='black'
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
        <Item rounded>
          <Icon
            name='lock'
            size={24}
            color='black'
            style={s.inputIcon}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Item>
        <Spacer/>
          {errorMessage ? <Text style={s.error}>{errorMessage}</Text> : null}
        <Spacer/>
        <Button
          primary
          rounded
          block
          onPress={() => onSubmit({ email, password })}
          onPressOut={()=>setPassword('')}
        >
          <Text style={s.button}> {submitButtonText} </Text>
        </Button>
        <Spacer/>
        <NavLink
          routeName="RecoveryPassword"
          text="Forgot your password?"
        />
        <Spacer/>
        {headerText == 'signin'
        ? <NavLink
            routeName="Signup"
            text="Don't have an account? Sign up instead"
          />
        : <NavLink
            routeName="Signin"
            text="Already have an account? Sign in instead"
          />
        }
      </View>
    </>
  );
};

export default AuthForm;
