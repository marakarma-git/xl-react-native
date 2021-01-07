import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import lod from 'lodash';
import {authLogout} from '../redux/action/auth_action';
const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const checkToken = useSelector((state) => state.auth_reducer);
  useEffect(() => {
    SplashScreen.hide();
    if (lod.isEmpty(checkToken.data)) {
      dispatch(authLogout());
      navigation.replace('Login');
    } else {
      navigation.replace('Home');
    }
  }, [checkToken.data, dispatch, navigation]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
};
export default Auth;
