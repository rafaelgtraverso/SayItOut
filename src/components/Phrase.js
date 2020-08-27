import React from 'react';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity } from 'react-native';
import s from '../css/styles';

const Phrase = () => {
    return (
        // <View style={s.phraseInput}>
            <Input 
                inputContainerStyle={s.phraseInput}
                rightIcon={
                    <TouchableOpacity>
                        <Icon
                            name='arrow-left'
                            size={40}
                            color='gray'
                        />
                    </TouchableOpacity>
                }
            />
        // </View>
    )
};

export default Phrase;