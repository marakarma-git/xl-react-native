import React, {useState, useEffect} from 'react';
import {BackHandler} from 'react-native';
import Auth from './auth.page';
import Login from './login.page';
import Home from './home.route';
import ForgetPassword from './forget.password';
import Helper from '../helpers/helper';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ChangePasswordPage} from './Home';
import GlobalUpdate from '../components/modal/GlobalUpdate';
import RootedBlocker from '../components/modal/RootedBlocker';
import {getTitleVersion} from '../redux/action/auth_action';
import packageJson from '../../package.json';

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
  const [isSetTitle, setIsSetTitle] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth_reducer.isLoggedIn);
  const {titleVersion} = useSelector((state) => state.auth_reducer);
  const version = titleVersion?.versionNumber.replace('v', '') ?? 0;
  const isForceUpdate =
    Helper.semVerCheck(version, packageJson.version) || packageJson.forceUpdate;
  const onCloseModal = () => {
    BackHandler.exitApp();
  };
  useEffect(() => {
    if (!isSetTitle) {
      dispatch(getTitleVersion());
      setIsSetTitle(true);
    }
  }, [titleVersion]);
  return (
    <NavigationContainer linking={{prefixes: ['dcp4.adlsandbox.com://app']}}>
      <GlobalUpdate isShow={isForceUpdate} closeModal={onCloseModal} />
      <RootedBlocker />
      <RootStack />
    </NavigationContainer>
  );
};
export default Route;
