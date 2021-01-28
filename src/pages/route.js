import React from 'react';
import Auth from './auth.page';
import Login from './login.page';
import Home from './home.route';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ChangePasswordPage} from './Home/index';

const Stack = createStackNavigator();
const RootStack = () => {
  const isLoggedIn = useSelector((state) => state.auth_reducer.isLoggedIn);

  const routeLogic = () => {
    if (isLoggedIn) {
      return (
        <>
          <Stack.Screen name={'Auth'} component={Auth} />
          <Stack.Screen name={'Home'} component={Home} />
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
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
export default Route;
