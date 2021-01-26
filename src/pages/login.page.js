import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements';
import lod from 'lodash';
import styles from '../style/login.style';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, authLogout } from '../redux/action/auth_action';
import callEnterpriseLogo from '../redux/action/enterprise_action';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png');
const Login = ({ navigation }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(null);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.auth_reducer);
  const alreadyRequest = useSelector(
    (state) => state.auth_reducer.alreadyRequest,
  );
  const titleVersion = useSelector((state) => state.auth_reducer.titleVersion);
  const { statusCode, error: errorCheck } = useSelector(
    (state) => state.enterprise_reducer,
  );
  useEffect(() => {
    if (!lod.isEmpty(data)) {
      const { principal, access_token } = data || {};
      const { enterpriseId } = principal || {};
      dispatch(callEnterpriseLogo(enterpriseId, access_token));
    }
    if (statusCode === 0 && !lod.isEmpty(data)) {
      if (data.principal.mustChangePass) navigation.replace("Change Password");
      else navigation.replace('Home');
    }
  }, [data, dispatch, navigation, statusCode]);
  useEffect(() => {
    if (error !== '') {
      dispatch(authLogout());
      setLocalLoading(false);

      if (alreadyRequest) {
        console.log(error, " <<< ")
        errorHandler(error);
      }
    }
    if (errorCheck !== '') {
      dispatch(authLogout());
      setLocalLoading(false);
    }
  }, [error, errorCheck, dispatch, alreadyRequest]);
  const onSubmit = () => {
    if (username.length > 0 && password.length > 0) {
      dispatch(authLogin(username, password));
      setLocalLoading(true);
    } else {
      if (username.length <= 0) {
        setErrorText('Please fill your username');
      } else {
        setErrorText('Please fill your password');
      }
    }
  };

  const errorHandler = (error) => {
    if (error.error === 'invalid_grant') setErrorText('The username or password is incorrect')
    if (error.error === 'unauthorized') setErrorText(`Sorry for security reasons, after 3 more failed login\nattempts you'll have to wait ${error.error_description.split(': ')[1]} before trying again`)
    if (error.error_description === 'User is disabled') setErrorText(`Your account hasn't been verified. Please verify your\naccount on the email to enable you to log in`)
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.imageSize} source={busolLogo} />
            </View>
            <View style={{ justifyContent: 'center', marginVertical: 20 }}>
              <Text style={styles.titleText}>IoT Connectivity+</Text>
              {errorText && <Text style={styles.errorText}>{errorText}</Text>}
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
              onSubmitEditing={() => onSubmit()}
            />
            {/* Forget Password To-do */}
            {/* <Text style={styles.normalText}>
                Forget Password ?&nbsp;
              <TouchableWithoutFeedback
                onPress={() => alert("Todo forget password")}>
                <Text style={styles.linkText}>Click Here</Text>
              </TouchableWithoutFeedback>
            </Text> */}
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
      <View style={styles.footer}>
        <Text style={{ fontWeight: 'bold' }}>
          IoT SIMCare {titleVersion || ''}
        </Text>
      </View>
    </ScrollView>
  );
};
export default Login;
