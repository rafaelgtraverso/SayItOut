import React from 'react';
import { Container, Header, Title, Body, Left, Right, Button, Icon } from 'native-base';
import s from '../css/styles';
import { navigate } from '../navigationRef';

const HeaderCards = params => {
    const { title, goBack, prevScreen } = params;
    return (
        <Container >
            <Header style={s.header}>
                <Left>
                { goBack
                ?(<Button large transparent onPress={()=>navigate(prevScreen)}>
                    <Icon style={s.headerContent} name='arrow-back' />
                </Button>)
                : null}
                </Left>
                <Body>
                    <Title style={s.headerContent}>{title}</Title>
                </Body>
                <Right />
            </Header>
        </Container>
    )
};

export default HeaderCards;