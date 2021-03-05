import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import s from '../css/styles';

const NavLink = params => {
  const { navigation, text, routeName } = params;
  return (
    <TouchableOpacity onPress={() => navigation.navigate({ routeName })}>
      {
      routeName=='Signup' || routeName=='Signin'
      ? <Text style={[s.link, s.signup]}>{text}</Text>
      : <Text style={s.link}>{text}</Text>
      }
    </TouchableOpacity>
  );
};


export default withNavigation(NavLink);
