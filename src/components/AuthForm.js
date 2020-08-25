import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
// import { AuthContext } from '../context/AuthContext';


const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // console.log('inside AuthForm');
    // console.log(onSubmit);
    // console.log();
    return (
        <>
        <Text h2> {headerText} </Text>
            <Spacer />
            <Input 
                label='Email' 
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Spacer />
            <Input 
                secureTextEntry
                label='Password'
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false}

            />
            { errorMessage 
                ? (<Text style={s.error}>{errorMessage}</Text> )
                : null }
            <Spacer />
            <Button 
                title={submitButtonText}
                onPress={()=>onSubmit('test', password)}
            />
            <Spacer />
        </>
    );
};

const s=StyleSheet.create({
    error:{
        fontSize:16,
        color:'red'
    }
});

export default AuthForm;