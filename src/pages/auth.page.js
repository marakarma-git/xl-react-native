import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import lod from 'lodash';
import reduxString from '../redux/reduxString';
const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const checkToken = useSelector((state) => state.auth_reducer);
  useEffect(() => {
    SplashScreen.hide();
    if (lod.isEmpty(checkToken.data)) {
      dispatch(reduxString.AUTH_LOGOUT);
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
