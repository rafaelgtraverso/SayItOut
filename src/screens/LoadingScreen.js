import React, { useEffect } from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { navigate } from '../navigationRef';
import s from '../css/styles';
import { populateCardsTable } from '../api/local/sqlite';

const LoadingScreen = () => {
    useEffect(()=>{
        populateCardsTable();
    },[]);
    navigate('Home');

    return (
        <SafeAreaView>
            <View style={s.loading}>
                <ActivityIndicator size='large' color='green' />
            </View>
        </SafeAreaView>
    );
};

export default LoadingScreen;