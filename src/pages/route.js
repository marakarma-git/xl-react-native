import React, {useState} from 'react';
import Auth from './auth.page';
import Login from './login.page';
import Home from './home.route';
import ForgetPassword from './forget.password';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ChangePasswordPage} from './Home';
import GlobalUpdate from '../components/modal/GlobalUpdate';
import RootedBlocker from '../components/modal/RootedBlocker';

const Stack = createStackNavigator();
const RootStack = () => {
  const isLoggedIn = useSelector((state) => state.auth_reducer.isLoggedIn);

  const routeLogic = () => {
    if (isLoggedIn) {
      return (
        <>
          <Stack.Screen name={'Auth'} component={Auth} />
          <Stack.Screen name={'Home'} component={Home} />
          <Stack.Screen
            name={'Change Password'}
            component={ChangePasswordPage}
          />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen name={'Auth'} component={Auth} />
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen
            name={'Change Password'}
            component={ChangePasswordPage}
          />
          <Stack.Screen name={'Reset Password'} component={ForgetPassword} />
        </>
      );
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routeLogic()}
    </Stack.Navigator>
  );
};
const Route = () => {
  const [dummy] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth_reducer.isLoggedIn);
  return (
    <NavigationContainer linking={{prefixes: ['dcp4.adlsandbox.com://app']}}>
      {dummy && isLoggedIn && <GlobalUpdate />}
      <RootedBlocker />
      <RootStack />
    </NavigationContainer>
  );
};
export default Route;
