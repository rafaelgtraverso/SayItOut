import React from 'react';
import { Button, Icon } from 'native-base';
import { Header } from 'react-native-elements';
import s, { white } from '../css/styles';
import { navigate } from '../navigationRef';
import { SafeAreaView } from 'react-native';

const HeaderCards = params => {
    const { title, goBack, prevScreen } = params;
    return (
        <SafeAreaView>
            <Header
            leftComponent = { goBack
                ?(<Button large transparent onPress={()=>navigate(prevScreen)}>
                    <Icon style={s.headerContent} name='arrow-back' />
                </Button>)
                : null}
            backgroundColor={white}
            centerComponent={{
                text: title,
                style: s.headerContent
            }}
        />
        </SafeAreaView>
    )
};

export default HeaderCards;