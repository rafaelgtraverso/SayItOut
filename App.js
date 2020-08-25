import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import CreateCardScreen from './src/screens/CreateCardScreen';
import PhraseListScreen from './src/screens/PhraseListScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';

 

const switchNavigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SignInScreen,
    Signup: SignUpScreen    
  }),
  mainFlow: createBottomTabNavigator({
    Cards: createStackNavigator({
      Home: HomeScreen,
      CreateCard: CreateCardScreen
    }),
    "My Phrases": PhraseListScreen,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () =>{
  return (
    <AuthProvider>
      <App 
        ref={(navigator) => { 
          setNavigator(navigator) 
        }}
      />
    </AuthProvider>   
  )
};
