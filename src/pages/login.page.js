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
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native';
import lod from 'lodash';
import styles from '../style/login.style';
import { authLogin } from '../redux/action/auth_action';
import { useDispatch, useSelector } from 'react-redux';
import { loginBrand } from '../assets/images/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import callEnterpriseLogo from '../redux/action/enterprise_action';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png');
const Login = ({ navigation }) => {
  const year = new Date().getFullYear();
  const [rememberMe, setRememberMe] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(null);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.auth_reducer);
  const alreadyRequest = useSelector(
    (state) => state.auth_reducer.alreadyRequest,
  );
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
      if (data.principal.mustChangePass) {
        navigation.replace('Change Password');
      } else {
        navigation.replace('Home');
      }
    }
  }, [data, dispatch, navigation, statusCode]);
  useEffect(() => {
    if (error !== '') {
      setLocalLoading(false);

      if (alreadyRequest) {
        errorHandler(error);
      }
    }
    if (errorCheck !== '') {
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
    if (error.error === 'invalid_grant') {
      setErrorText('The username or password is incorrect');
    }
    if (error.error === 'unauthorized') {
      setErrorText(
        `Sorry for security reasons, after 3 more failed login\nattempts you'll have to wait ${error.error_description.split(': ')[1]
        } before trying again`,
      );
    }
    if (error.error_description === 'User is disabled') {
      setErrorText(
        "Your account hasn't been verified. Please verify your\naccount on the email to enable you to log in",
      );
    }
  };

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
            <View style={styles.loginContainer}>
              <View style={styles.loginContainerHeader}>
                <Image source={loginBrand} style={styles.iotImage}/>
              </View>
                {errorText && <Text style={[styles.errorText, { paddingBottom: 10 }]}>{errorText}</Text>}
              <View style={styles.formGroup}>
                <Text style={styles.label}>{'Username'}</Text>
                <TextInput
                      editable={!localLoading}
                      placeholder="Username"
                      placeholderColor="#c4c3cb"
                      style={styles.textInputContainer}
                      onChangeText={(e) => setUsername(e)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{'Password'}</Text>
                <TextInput
                  editable={!localLoading}
                  placeholder="Password"
                  placeholderColor="#c4c3cb"
                  secureTextEntry
                  style={styles.textInputContainer}
                  onChangeText={(e) => setPassword(e)}
                  onSubmitEditing={() => onSubmit()}
                />
              </View>
              {/* To-do Remember me & terms of use */}
                <View style={styles.loginSettingWrapper}>
                    <View style={styles.loginSetting}>
                      <CheckBox 
                        disabled={false} 
                        value={rememberMe} 
                        onCheckColor="#002DBB"
                        onValueChange={(value) => setRememberMe(value)}/>
                      <Text style={{ fontSize: 11}}>Remember Me</Text>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate('Reset Password')}>
                      <Text style={styles.linkText}>Forgot Password ?</Text>
                    </TouchableWithoutFeedback>
                </View>
                {/* To-do */}
                {/* <View style={styles.loginSettingWrapper}>
                    <View style={styles.loginSetting}>
                      <CheckBox disabled={false} onCheckColor="#002DBB"/>
                      <Text style={{ fontSize: 11 }}>I aggree to the&nbsp;
                      <TouchableWithoutFeedback
                        onPress={() => Linking.openURL('https://www.xl.co.id/en/terms-and-conditions')}>
                        <Text style={styles.linkText}>Terms of use </Text>
                      </TouchableWithoutFeedback>
                       and the&nbsp; 
                       <TouchableWithoutFeedback
                        onPress={() => Linking.openURL('https://www.xl.co.id/en/privacy-policy')}>
                        <Text style={styles.linkText}>Privacy Policy </Text>
                      </TouchableWithoutFeedback>
                       </Text>
                    </View>
                </View> */}
                <TouchableOpacity
                  disabled={localLoading}
                  onPress={onSubmit}
                  style={[styles.buttonBlock, { backgroundColor: localLoading ? '#949494' : '#002DBB' }]}>
                  <Text style={styles.buttonText}>
                    {localLoading ? (
                      <ActivityIndicator color={'#fff'} style={styles.buttonText} />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                      )}
                  </Text>
                </TouchableOpacity>
                <View style={[styles.loginSettingWrapper,{ marginTop: 10 }]}>
                      <Text style={[styles.label, { fontSize: 11 }]}>Need Support ?</Text>
                      <Text>
                        <FontAwesome name="phone" size={11} color="grey" />
                        <TouchableWithoutFeedback
                          onPress={() => Linking.openURL('tel://+622157959556')}>
                          <Text style={[styles.linkText, { fontSize: 11 }]}>&nbsp;+62 21 57959556 </Text>
                        </TouchableWithoutFeedback>
                      </Text>
                      <Text>
                        <FontAwesome name="envelope" size={11} color="grey" />
                        <TouchableWithoutFeedback
                          onPress={() => Linking.openURL('mailto://+622157959556')}>
                          <Text style={[styles.linkText, { fontSize: 11 }]}>&nbsp;cs-busol@xl.co.id </Text>
                        </TouchableWithoutFeedback>
                      </Text>
                </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Text style={{ color: '#707070', fontSize: 12 }}>
          &copy; {`${year} PT. XL Axiata Tbk. All Right Reserved `}
        </Text>
      </View>
    </ScrollView>
  );
};
export default Login;
