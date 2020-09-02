import React, {useContext} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';

const AccountScreen = () => {
  const {signout} = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={{fontSize: 48}}> My Account</Text>
      <Spacer />
      <Button title="Log out" onPress={signout} />
    </SafeAreaView>
  );
};

export default AccountScreen;
