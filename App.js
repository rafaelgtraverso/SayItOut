import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from './src/screens/AccountScreen';
import CreateCardScreen from './src/screens/CreateCardScreen';
import PhraseListScreen from './src/screens/PhraseListScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import IsLoadingScreen from './src/screens/IsLoadingScreen';

import {Context as AuthContext, Provider as AuthProvider } from './src/context/AuthContext';

import useAuth from './src/hooks/useAuth';



const AuthStack = createStackNavigator();

const RootStack = createStackNavigator();

const MainStack = createBottomTabNavigator();

const RootStackScreen = () => {
  return(
    <RootStack.Navigator initialRouteName='Home'>
      <RootStack.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
      <RootStack.Screen name='Create Card' component={CreateCardScreen} />
    </RootStack.Navigator>
  );
};



const App = () => {
  const {auth, loginState} = useAuth();
  // console.log(auth);
  console.log(loginState.token);
  // if (loginState.isLoading){
  //   return <RootStack.Screen name={'Loading'} component={IsLoadingScreen} />;
  // }
  
  return (
    <AuthProvider value={auth}>
      <NavigationContainer>
        {loginState.token 
          ? (
            <MainStack.Navigator>
              <MainStack.Screen name='Lets talk' component={RootStackScreen} />
              <MainStack.Screen name='My Phrases' component={PhraseListScreen}  />
              <MainStack.Screen name='Account' component={AccountScreen} />
            </MainStack.Navigator>
          ):(
            <AuthStack.Navigator initialRouteName='Sign In'>
              <AuthStack.Screen name='Sign Up' component={SignUpScreen} />
              <AuthStack.Screen name='Sign In' component={SignInScreen} />
            </AuthStack.Navigator>
           )} 
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
