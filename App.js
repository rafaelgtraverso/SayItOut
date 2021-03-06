import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CreateCardScreen from './src/screens/CreateCardScreen';
import PhraseListScreen from './src/screens/PhraseListScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

import { Provider } from 'react-redux';

import { setNavigator } from './src/navigationRef';
import configureStore from './src/store';
import PasswordRecoveryScreen from './src/screens/PasswordRecoveryScreen';
import CardsScreen from './src/screens/CardsScreen';
import SignInOptionScreen from './src/screens/SignInOptionScreen';
import SettingsScreen from './src/screens/SettingsScreen';


const switchNavigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    SigninOptions: SignInOptionScreen,
    Signin: SignInScreen,
    Signup: SignUpScreen,
    RecoveryPassword: PasswordRecoveryScreen,
  },
  {
    headerMode: 'none',
  }),
  mainFlow: createBottomTabNavigator({
    Cards: createStackNavigator({
      Home: HomeScreen,
      Cards: CardsScreen,
      CreateCard: CreateCardScreen,
    },{
      headerMode: 'none',
    }),
    Phrases: createStackNavigator({ Phrases:PhraseListScreen },{ headerMode:'none' }),
    Settings: createStackNavigator({ Settings:SettingsScreen }, { headerMode:'none' }),
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgba(69,160,0,1)',
      labelStyle: {
        fontSize: 24,
      },
      style: {
        paddingVertical:10

      },
    }
  })
});

const App = createAppContainer(switchNavigator);

const store = configureStore();

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <Provider store={store}>
      <App
        ref={(navigator) => {
          setNavigator(navigator)
        }}
      />
    </Provider>
  );
};
