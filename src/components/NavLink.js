import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spacer from './Spacer';
import s from '../css/styles';

const NavLink = params => {
  const { navigation, text, routeName } = params;
  return (
    <TouchableOpacity onPress={() => navigation.navigate({ routeName })}>
      <Spacer />
      <Text style={s.link}>{text}</Text>
      <Spacer />
    </TouchableOpacity>
  );
};


export default withNavigation(NavLink);
