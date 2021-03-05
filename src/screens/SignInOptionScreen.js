import React from 'react';
import {
    Container,
    Content,
    Button,
    Text
} from 'native-base';
import { View } from 'react-native';
import LogoAndTitle from '../components/LogoAndTitle';
import s from '../css/styles';
import Spacer from '../components/Spacer';
import { navigate } from '../navigationRef';


const SignInOptionScreen = () => {
    return (
        <Container>
            <Content contentContainerStyle={s.containerForm}>
                <LogoAndTitle />
                <Spacer/>
                <View style={s.authForm}>
                    <Button rounded block light onPress={()=>navigate('Signin')}>
                        <Text style={s.button}>sign in with credentials</Text>
                    </Button>
                    <Spacer/>
                    <Button rounded block primary>
                        <Text style={s.button}>Facebook</Text>
                    </Button>
                    <Spacer/>
                    <Button rounded block danger>
                        <Text style={s.button}>Google</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
};

export default SignInOptionScreen;