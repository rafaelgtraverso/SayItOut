import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spacer from './Spacer';
import s from '../css/styles';
import logo from '../assets/logo.png';
import logoTitle from '../assets/LogoTitle.png';
import logoSubtitle from '../assets/LogoSubtitle.png';
import NavLink from '../components/NavLink';

const AuthForm = params => {
  const { headerText, errorMessage, onSubmit, submitButtonText } = params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={s.containerForm}>

      <View style={s.logoContainer} >
        <Image source={logoTitle} style={s.logosTitle} resizeMode='contain' />
        <Image source={logo} style={s.logo} resizeMode='contain' />
        <Image source={logoSubtitle} style={s.logosSubtitle} resizeMode='contain' />
        <Spacer/>
      </View>
      <View style={s.containerInput}>
      {headerText=='signup' ? <Text style={s.textForm}>Registration Form</Text> : null}
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
        <Input
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
        />
        {errorMessage ? <Text style={s.error}>{errorMessage}</Text> : null}
        <Spacer />
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
          buttonStyle={s.button}
        />
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
    </View>
  );
};

export default AuthForm;
