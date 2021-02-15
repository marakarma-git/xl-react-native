import React, {useState, useEffect, useCallback} from 'react';
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
  Linking,
  Dimensions,
} from 'react-native';
import lod from 'lodash';
import styles from '../style/login.style';
import {authLogin} from '../redux/action/auth_action';
import {useDispatch, useSelector} from 'react-redux';
import {loginBrand} from '../assets/images/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import Orientation from '../helpers/orientation';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png');

const Login = ({navigation}) => {
  const year = new Date().getFullYear();
  const [rememberMe, setRememberMe] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(null);
  const [orientation, setOrientation] = useState('potrait');
  const dispatch = useDispatch();
  const {data, error, isLoggedIn, alreadyRequest} = useSelector(
    (state) => state.auth_reducer,
  );

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  useEffect(() => {
    if (isLoggedIn) {
      if (!lod.isEmpty(data)) {
        if (data.principal.mustChangePass) {
          navigation.replace('Change Password');
        } else {
          navigation.replace('Home');
        }
      }
    }

    if (error) {
      setLocalLoading(false);
      if (alreadyRequest) {
        errorHandler(error);
      }
    }

    detectOrientation();
  }, [data, error, isLoggedIn]);

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
        `Sorry for security reasons, after 3 more failed login\nattempts you'll have to wait ${
          error.error_description.split(': ')[1]
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
        style={
          orientation === 'landscape'
            ? {
                height: errorText
                  ? Orientation.getHeight() + 70
                  : Orientation.getHeight() + 30,
                backgroundColor: 'transparent',
              }
            : {
                height: Orientation.getHeight() - 100,
                backgroundColor: 'transparent',
              }
        }
        behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              {flex: 1},
              orientation === 'potrait'
                ? {justifyContent: 'center'}
                : {marginTop: 10},
            ]}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                style={
                  orientation === 'landscape'
                    ? styles.imageSizeLandscape
                    : styles.imageSize
                }
                source={busolLogo}
              />
            </View>
            <View
              style={[
                styles.loginContainer,
                orientation === 'landscape'
                  ? {width: '48%', marginHorizontal: '26%'}
                  : {width: '85%', marginHorizontal: '7.5%'},
              ]}>
              <View style={styles.loginContainerHeader}>
                <Image
                  source={loginBrand}
                  resizeMode="contain"
                  style={
                    orientation === 'landscape'
                      ? {width: '80%'}
                      : {width: '100%'}
                  }
                />
              </View>
              <Text
                style={{
                  ...styles.loginDesc,
                  ...{
                    fontSize: orientation === 'landscape' ? 14 : 16,
                    marginVertical: orientation === 'landscape' ? 2 : '3%',
                  },
                }}>
                Sign in to your account:
              </Text>
              {errorText && (
                <Text
                  style={[
                    styles.errorText,
                    {
                      paddingBottom: 5,
                      fontSize: orientation === 'landscape' ? 12 : 14,
                    },
                  ]}>
                  {errorText}
                </Text>
              )}
              <View style={styles.formGroup}>
                <Text style={styles.label}>{'Username'}</Text>
                <TextInput
                  editable={!localLoading}
                  placeholder="Username"
                  placeholderColor="#c4c3cb"
                  style={
                    orientation === 'landscape'
                      ? styles.textInputContainerLandscape
                      : styles.textInputContainer
                  }
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
                  style={
                    orientation === 'landscape'
                      ? styles.textInputContainerLandscape
                      : styles.textInputContainer
                  }
                  onChangeText={(e) => setPassword(e)}
                  onSubmitEditing={() => onSubmit()}
                />
              </View>
              <View style={styles.loginSettingWrapper}>
                <View style={styles.loginSetting}>
                  <CheckBox
                    lineWidth={0.1}
                    disabled={false}
                    value={rememberMe}
                    onCheckColor="#002DBB"
                    onValueChange={(value) => setRememberMe(value)}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#747474',
                      fontWeight: '200',
                      letterSpacing: 0.5,
                    }}>
                    Remember me
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Reset Password')}>
                  <Text
                    style={(styles.linkText, {color: '#3552C6', fontSize: 11})}>
                    Forgot password?
                  </Text>
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
              {localLoading ? (
                <Text style={styles.labelLoading}>Loading ...</Text>
              ) : (
                <TouchableOpacity
                  onPress={onSubmit}
                  style={[
                    orientation === 'landscape'
                      ? styles.buttonBlockLandscape
                      : styles.buttonBlock,
                  ]}>
                  <Text style={styles.buttonText}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                  </Text>
                </TouchableOpacity>
              )}
              <View style={[styles.loginSettingWrapper, {marginTop: 10}]}>
                <Text style={[styles.label, {fontSize: 11, color: '#23282C'}]}>
                  Need support?
                </Text>
                <Text>
                  <FontAwesome name="phone" size={11} color="grey" />
                  <TouchableWithoutFeedback
                    onPress={() => Linking.openURL('tel://+622157959556')}>
                    <Text style={[styles.linkText, {fontSize: 11}]}>
                      &nbsp;+62 21 57959556{' '}
                    </Text>
                  </TouchableWithoutFeedback>
                </Text>
                <Text>
                  <FontAwesome name="envelope" size={11} color="grey" />
                  <TouchableWithoutFeedback
                    onPress={() => Linking.openURL('mailto:cs-busol@xl.co.id')}>
                    <Text style={[styles.linkText, {fontSize: 11}]}>
                      &nbsp;cs-busol@xl.co.id{' '}
                    </Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={(styles.footer, {alignItems: 'center'})}>
        <Text
          style={{
            color: '#707070',
            fontSize: 12,
            bottom: orientation === 'potrait' ? 0 : 5,
          }}>
          &copy; {`${year} PT. XL Axiata Tbk. All Right Reserved `}
        </Text>
      </View>
    </ScrollView>
  );
};
export default Login;
