import React from 'react';
import { Image } from 'react-native';
import logo from '../assets/logo.png';
import logoTitle from '../assets/LogoTitle.png';
import logoSubtitle from '../assets/LogoSubtitle.png';
import s from '../css/styles';

const LogoAndTitle = () => {
    return ( <>
        <Image source={logoTitle} style={s.formLogo} resizeMode='contain' />
        <Image source={logo} style={s.logo} resizeMode='contain' />
        <Image source={logoSubtitle} style={s.formLogo} resizeMode='contain'/>
    </>)
};

export default LogoAndTitle;