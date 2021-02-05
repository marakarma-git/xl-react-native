import lod from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {authLogout} from '../redux/action/auth_action';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, error, isLoggedIn} = useSelector((state) => state.auth_reducer);

  useEffect(() => {
    SplashScreen.hide();
    if (isLoggedIn) {
      if (!lod.isEmpty(data)) {
        if (data.principal.mustChangePass) {
          dispatch(authLogout());
          navigation.replace('Login');
        } else {
          navigation.replace('Home');
        }
      }
    } else {
      navigation.replace('Login');
    }

    if (error) {
      dispatch(authLogout());
    }
  }, [data, error, isLoggedIn]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
};
export default Auth;
