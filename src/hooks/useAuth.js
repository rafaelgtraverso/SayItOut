import { useReducer, useMemo, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../api/sayItOut';
// import { AuthContext } from '../context/AuthContext';

const  useAuth= () =>{
    const [loginState,dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'add_error':
                    return { 
                        ...state,
                        errorMessage: action.payload,
                        isLoading: false
                    };
                case 'signin':
                    return { 
                        ...state,
                        errorMessage:'', 
                        token: action.payload,
                        isLoading: false
                    };
              case 'signout':
                    return { 
                        ...state,
                        errorMessage:'', 
                        token: null, 
                        isLoading: false
                    };
              case 'clear_error_message':
                    return { 
                        ...state, 
                        errorMessage: '', 
                        isLoading:false
                    };
                default:
                    return state;
            }
        },
        {
            isLoading:true,
            token:null,
            errorMessage:''
        }
    );
    const auth = useMemo(
        () => ({
            signin: async (email, password) =>{
                try {
                    console.log(email +'  '+ password);
                    const response =  await api.post('/signin', { email, password });
                    await AsyncStorage.setItem('token', response.data.token);
                    dispatch({ type: 'signin', payload: response.data.token});
                    console.log(response.data.token);
                } catch (err) {
                    dispatch({ type: 'add_error', payload: 'Please check your credentials'})
                    
                }
            },
            signout: async () => {
                await AsyncStorage.removeItem('token');
                dispatch({ type: 'signout'});
            }
        }),[]        
    );
    useEffect(()=>{
        setTimeout(async() => {
            // setIsLoading(false);
            let userToken;
            userToken = null;
            try {
              userToken = await AsyncStorage.getItem('token');
            } catch(e) {
              console.log(e);
            }
            // console.log('user token: ', userToken);
            dispatch({ type: 'signin', payload: userToken });
          }, 1000);
    },[]);
    return {auth, loginState};
};

export default useAuth;