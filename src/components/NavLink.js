import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import Spacer from './Spacer';

const NavLink = ({navigation, text, routeName}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate({routeName})}>
      <Spacer />
      <Text style={s.link}>{text}</Text>
      <Spacer />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

export default withNavigation(NavLink);
