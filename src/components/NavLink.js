import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
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
