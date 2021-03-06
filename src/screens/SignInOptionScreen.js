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
import { GoogleSignin } from '@react-native-community/google-signin';
import { connect } from 'react-redux';
import { signin } from '../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: "637414120369-r0u9r7ni68v44hqtum63maprt4v802v4.apps.googleusercontent.com",
});

const SignInOptionScreen = props => {
    const { google_sign_in } = props;
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
                    <Button rounded block danger onPress={google_sign_in}>
                        <Text style={s.button}>Google</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
};

SignInOptionScreen.propTypes = {
    google_sign_in: PropTypes.func,
};

const mapStateToProps = (state) => {

    return {
     auths:state.authReducer
   }
  };

  const mapDispatchToProps = (dispatch) => {
    return{
      google_sign_in: async () => {
        try {
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          const response = await auth().signInWithCredential(googleCredential);
          if (response && response.user){
            await AsyncStorage.setItem('token', (await response.user.getIdTokenResult()).token);
            dispatch(signin((await response.user.getIdTokenResult()).token));
            console.log(idToken);
            navigate('Home');
          }
        } catch (err) {
          console.log(err)
        }
      },
    }
  };

export default connect(mapStateToProps,mapDispatchToProps)(SignInOptionScreen);