import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = ({ children }) => {
    return <View style={s.spacer}>{children}</View>
};

const s = StyleSheet.create({
    spacer: {
        margin: 10
    }
});

export default Spacer;