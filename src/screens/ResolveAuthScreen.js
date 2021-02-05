import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../navigationRef';

import { connect } from 'react-redux';
import { signin } from '../actions/auth';


const ResolveAuthScreen = props => {
  const { localSignIn } = props;
  useEffect(() => {
    localSignIn();
  }, []);

  return null;
};

const mapStateToProps = (state) => {
  return {
   auths:state.authReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    localSignIn: async () => {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      if (token) {
        dispatch(signin(token, email));
        navigate('Home');
      } else {
        navigate('Signin');
      }
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ResolveAuthScreen);
