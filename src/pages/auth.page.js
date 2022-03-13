import lod from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  authLogout,
  resetMultiSessionDetected,
  setFalseAfterLogin,
} from '../redux/action/auth_action';
import {resetNotificationLimit} from '../redux/action/notification_action';
import {checkUserMenuPermission} from '../redux/action/user_menu_permission_action';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, error, isLoggedIn, afterLogin} = useSelector(
    (state) => state.auth_reducer,
  );

  useEffect(() => {
    dispatch(resetMultiSessionDetected());
    dispatch(resetNotificationLimit());
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    if (isLoggedIn) {
      if (!lod.isEmpty(data)) {
        if (data.principal.mustChangePass) {
          if (!afterLogin) {
            dispatch(authLogout());
          } else {
            dispatch(setFalseAfterLogin());
          }
        } else {
          dispatch(checkUserMenuPermission(data?.authority));
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
