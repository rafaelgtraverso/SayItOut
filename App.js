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

import { Provider } from 'react-redux';

import { setNavigator } from './src/navigationRef';
import LoadingScreen from './src/screens/LoadingScreen';
import configureStore from './src/store';
import PasswordRecoveryScreen from './src/screens/PasswordRecoveryScreen';
import CardsScreen from './src/screens/CardsScreen';

const switchNavigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loading: LoadingScreen,
  loginFlow: createStackNavigator({
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
    }),
    Phrases: createStackNavigator({ Phrases:PhraseListScreen }),
    Account: createStackNavigator({ Account:AccountScreen }),
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
