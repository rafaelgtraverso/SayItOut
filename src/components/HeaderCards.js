import React from 'react';
import {
    Button,
    Icon
} from 'native-base';
import { Header } from 'react-native-elements';
import s, { colors } from '../css/styles';
import { navigate } from '../navigationRef';

const HeaderCards = params => {
    const { title, goBack, prevScreen } = params;
    return (
        <Header
        leftComponent = { goBack
            ? (
                <Button large transparent onPress={()=>navigate(prevScreen)}>
                    <Icon style={s.headerContent} name='arrow-back' />
                </Button>
            ) : null}
        backgroundColor={colors.white}
        centerComponent={{
            text: title,
            style: s.headerContent
        }}
    />
    )
};

export default HeaderCards;