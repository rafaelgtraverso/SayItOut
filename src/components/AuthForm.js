import React, {useState} from 'react';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from './Spacer';
import s from '../css/styles';


const AuthForm = (payload) => {
  const {headerText, errorMessage, onSubmit, submitButtonText} = payload;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Text h2> {headerText} </Text>
      <Spacer />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? <Text style={s.error}>{errorMessage}</Text> : null}
      <Spacer />
      <Button
        title={submitButtonText}
        onPress={() => onSubmit({email, password})}
      />
      <Spacer />
    </>
  );
};


export default AuthForm;
