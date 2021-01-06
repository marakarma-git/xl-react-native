import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import lod from 'lodash';
const Auth = ({navigation}) => {
  const checkToken = useSelector((state) => state.auth_reducer);
  useEffect(() => {
    SplashScreen.hide();
    if (lod.isEmpty(checkToken.data)) {
      navigation.replace('Login');
    } else {
      navigation.replace('Home');
    }
  }, [checkToken.data, navigation]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
};
export default Auth;
