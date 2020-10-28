import React, { useEffect } from 'react';
import { View, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { navigate } from '../navigationRef';
import s from '../css/styles';
import { populateCardsTable } from '../api/local/sqlite';

const LoadingCardsScreen = () => {
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