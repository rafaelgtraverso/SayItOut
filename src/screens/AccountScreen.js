import React, {useContext} from 'react';
import {Text, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';
import s from '../css/styles'

const AccountScreen = () => {
  const {signout} = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={s.text}> My Account</Text>
      <Spacer />
      <Button title="Log out" onPress={signout} />
    </SafeAreaView>
  );
};

export default AccountScreen;
