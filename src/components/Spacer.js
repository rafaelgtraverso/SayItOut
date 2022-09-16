import React from 'react';
import { View } from 'react-native';
import s from '../css/styles';

const Spacer = params => {
  const { children }  = params;
  return <View style={s.spacer}>{children}</View>;
};

export default Spacer;
