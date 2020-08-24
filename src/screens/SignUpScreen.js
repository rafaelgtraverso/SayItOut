import React, {  useContext } from 'react';
import { View, Text } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from '@react-navigation/native';
import s from '../css/styles';

const SignUpScreen = ({navigation}) => {
    console.log(2);
    const { loginState, signup, clearErrorMessage } = useContext(AuthContext);
    console.log(loginState);
    return (
        <View style={s.container}>
            {/* <NavigationEvents 
                focus={clearErrorMessage} 
            /> */}
            <AuthForm 
                headerText='Sign Up'
                errorMessage={'loginState.errorMessage'}
                submitButtonText='Sign Up'
                onSubmit = {signup}
            />
            <Text>{'loginState.token'}</Text>
            <NavLink 
                navigation={navigation}
                routeName='Sign In'
                text='Already have an account? Sign in instead'
            />
        </View>
    );
};

export default SignUpScreen;