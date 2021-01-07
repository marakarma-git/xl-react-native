import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import lod from 'lodash';
import styles from '../style/login.style';
import {useDispatch, useSelector} from 'react-redux';
import {authLogin, authLogout} from '../redux/action/auth_action';
import callEnterpriseLogo from '../redux/action/enterprise_action';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png');
const Login = ({navigation}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {data, error} = useSelector((state) => state.auth_reducer);
  const {statusCode, error: errorCheck} = useSelector(
    (state) => state.enterprise_reducer,
  );
  useEffect(() => {
    if (!lod.isEmpty(data)) {
      const {principal, access_token} = data || {};
      const {enterpriseId} = principal || {};
      dispatch(callEnterpriseLogo(enterpriseId, access_token));
    } else if (error) {
      dispatch(authLogout());
      setLocalLoading(false);
      Alert.alert('Something went wrong 1', JSON.stringify(error, null, 2));
    }
  }, [data, dispatch, error, navigation]);
  useEffect(() => {
    if (statusCode === 0) {
      navigation.replace('Home');
    } else if (errorCheck) {
      dispatch(authLogout());
      setLocalLoading(false);
      Alert.alert(
        'Something went wrong 2',
        JSON.stringify(errorCheck, null, 2),
      );
    }
  }, [dispatch, errorCheck, navigation, statusCode]);
  const onSubmit = () => {
    if (username.length > 0 && password.length > 0) {
      dispatch(authLogin(username, password));
      setLocalLoading(true);
    } else {
      if (username.length <= 0) {
        Alert.alert('Username required', 'Please fill your username');
      } else {
        Alert.alert('Password required', 'Please fill your password');
      }
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.imageSize} source={busolLogo} />
            </View>
            <TextInput
              editable={!localLoading}
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.textInputContainer}
              onChangeText={(e) => setUsername(e)}
            />
            <TextInput
              editable={!localLoading}
              placeholder="Password"
              placeholderColor="#c4c3cb"
              secureTextEntry
              style={styles.textInputContainer}
              onChangeText={(e) => setPassword(e)}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => onSubmit()}
              disabled={localLoading}
              loading={localLoading}
              title="Login"
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default Login;
