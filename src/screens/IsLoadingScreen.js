import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import s from '../css/styles';

const IsLoadingScreen = () => {
    return (
        <View style={s.isLoadingView}>
            <ActivityIndicator size='large' />
        </View>
    );
};

export default IsLoadingScreen;