import React from 'react';
import { NavigationContainer, createSwitchNavigator } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from './src/screens/AccountScreen';
import CreateCardScreen from './src/screens/CreateCardScreen';
import PhraseListScreen from './src/screens/PhraseListScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { NavigationEvents } from 'react-navigation';

const LoginStack = createStackNavigator();

const HomeStack = createStackNavigator();

const Home = () => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
      <HomeStack.Screen name='Create Card' component={CreateCardScreen} />
    </HomeStack.Navigator>
  );
};

const MainStack = createBottomTabNavigator();

const App = () => {
  const isLoggedIn = true;
  return (
    <NavigationContainer>
      {isLoggedIn
      ? (
        <MainStack.Navigator>
          <MainStack.Screen name='Home' component={Home} />
          <MainStack.Screen name='PhraseList' component={PhraseListScreen}  />
          <MainStack.Screen name='Account' component={AccountScreen} />
        </MainStack.Navigator>
      ):(
        <LoginStack.Navigator initialRouteName='Sign Up'>
          <LoginStack.Screen name='Sign Up' component={SignUpScreen} />
          <LoginStack.Screen name='Sign In' component={SignInScreen} />
        </LoginStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
