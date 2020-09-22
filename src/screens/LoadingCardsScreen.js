import React, {useEffect, useContext} from 'react';
import {View, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { navigate } from '../navigationRef';
import s from '../css/styles';
import { Data } from '../assets/cardsPng/index';
import { populateCardsTable } from '../api/local/sqlite';
import { Context as AuthContext } from '../context/AuthContext';

const LoadingCardsScreen = () => {
    const {state, isLoading} = useContext(AuthContext);
   useEffect(()=>{
    populateCardsTable();
   },[]);
   navigate('Home');
    
   
    
    return (
        <SafeAreaView>
            <View style={s.loading}>
                <ActivityIndicator size='large' color='green' />
                <Text>Creating Database</Text>
            </View>
        </SafeAreaView>
    );
};

export default LoadingCardsScreen;