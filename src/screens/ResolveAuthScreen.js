import {useContext, useEffect} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

import {connect} from 'react-redux';
import { tryLocalSignIn } from '../actions/auth';


const ResolveAuthScreen = (props) => {
  //const {tryLocalSignIn} = useContext(AuthContext);
  // console.log(props);
  // console.log(props.navigation.state);
  useEffect(() => {
    props.localSignIn();
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
    localSignIn: () => dispatch(tryLocalSignIn()),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ResolveAuthScreen);

