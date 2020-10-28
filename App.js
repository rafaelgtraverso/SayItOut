import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import CreateCardScreen from './src/screens/CreateCardScreen';
import PhraseListScreen from './src/screens/PhraseListScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

import {Provider} from 'react-redux';

import {setNavigator} from './src/navigationRef';
import LoadingCardsScreen from './src/screens/LoadingCardsScreen';
import configureStore from './src/store';

const switchNavigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loading: LoadingCardsScreen,
  loginFlow: createStackNavigator({
    Signin: SignInScreen,
    Signup: SignUpScreen,
  },
  {
    headerMode: 'none',
  }),
  mainFlow: createBottomTabNavigator({
    Cards: createStackNavigator({
      Home: HomeScreen,
      CreateCard: CreateCardScreen,
    }),
    Phrases: createStackNavigator({Phrases:PhraseListScreen}),
    Account: createStackNavigator({Account:AccountScreen}),
  })
});

const App = createAppContainer(switchNavigator);

const store = configureStore();

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
