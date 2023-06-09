import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import Text from '../components/global/text';
import lod from 'lodash';
import styles from '../style/login.style';
import {checkLogin, setIsErricson} from '../redux/action/auth_action';
import {useDispatch, useSelector} from 'react-redux';
import {loginBrand} from '../assets/images/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import Orientation from '../helpers/orientation';
import {ModalMultiSession} from '../components';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../constant/color';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png');

const config = {
  dropDownPicker: {
    width: 230,
    height: 30,
    fontSize: 12,
  },
  formPassword: {
    height: 40,
    marginVertical: 10,
    fontSize: 14,
  },
  butonLogin: {
    height: 40,
  },
  cardTitle: {
    marginVertical: '3%',
  },
  busolLogo: {
    height: 100,
  },
  errorText: {
    fontSize: 14,
  },
  contentWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
};

const Login = ({navigation}) => {
  const year = new Date().getFullYear();
  const [rememberMe, setRememberMe] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(null);
  const [orientation, setOrientation] = useState('potrait');
  const [isSubmit, setIsSubmit] = useState(false);
  const [screenConfig, setScreenConfig] = useState({...config});
  const dispatch = useDispatch();
  const {
    data,
    error,
    isLoggedIn,
    alreadyRequest,
    multiSessionMsg,
    isMultiSessionDetected,
    isErricson,
  } = useSelector((state) => state.auth_reducer);
  const [open, setOpen] = useState(false);
  const [loginDropDownValue, setLoginDropDownValue] = useState(0);
  const [items, setItems] = useState([
    {label: 'DCP Connect (default)', value: 0},
    {label: 'IoT Connectivity +', value: 1},
  ]);

  const adjustScreen = useCallback(() => {
    const screenWidth = Orientation.getWidth();
    let customConfig = {...screenConfig};
    let isChange = false;
    // Width
    if (screenWidth <= 320) {
      isChange = true;
      customConfig.dropDownPicker.width = 170;
      customConfig.dropDownPicker.height = 25;
      customConfig.dropDownPicker.fontSize = 11;
      customConfig.formPassword.height = 32;
      customConfig.formPassword.marginVertical = 0;
      customConfig.formPassword.fontSize = 10;
      customConfig.butonLogin.height = 30;
      customConfig.cardTitle.marginVertical = '1%';
      customConfig.busolLogo.height = 50;
      customConfig.errorText.fontSize = 11;
      customConfig.contentWrapper.flexDirection = 'column';
      screenConfig.contentWrapper.marginTop = 5;
    }

    if (isChange) {
      setScreenConfig(customConfig);
    }
  }, [Dimensions]);

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  useEffect(() => {
    dispatch(setIsErricson(loginDropDownValue === 0 ? true : false));
  }, [loginDropDownValue]);

  useEffect(() => {
    if (isLoggedIn) {
      if (!lod.isEmpty(data)) {
        if (!isErricson) {
          if (data.principal.mustChangePass) {
            navigation.replace('Change Password', {
              pageBefore: 'login',
            });
          } else {
            navigation.replace('Home');
          }
        }
      }
    }

    if (error) {
      setLocalLoading(false);
      if (alreadyRequest) {
        errorHandler(error);
      }
    }
    dispatch(setIsErricson(loginDropDownValue === 0 ? true : false));
    detectOrientation();
    adjustScreen();
  }, [data, error, isLoggedIn]);

  const onSubmit = () => {
    setIsSubmit(true);
    if (username.length > 0 && password.length > 0) {
      dispatch(checkLogin(username, password, loginDropDownValue));
      setLocalLoading(true);
    } else {
      if (username.length <= 0) {
        setErrorText('Please fill your username');
      } else {
        setErrorText('Please fill your password');
      }
    }
  };

  const errorHandler = (errorParams) => {
    const {error, error_description} = errorParams;
    switch (error) {
      case 'invalid_grant':
        if (error_description === 'User is disabled') {
          setErrorText("Your account hasn't been verified.");
        }
        if (error_description === 'Bad credentials') {
          setErrorText('The username or password is incorrect');
        }
        if (error_description === 'User account is locked') {
          setErrorText(error_description);
        }
        break;
      case 'unauthorized':
        setErrorText(
          `Sorry for security reasons, after 3 more failed login\nattempts you'll have to wait ${
            error_description.split(': ')[1]
          } before trying again`,
        );
        break;
      default:
        setErrorText('The username or password is incorrect');
        break;
    }
  };

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      setErrorText(null);
      setIsSubmit(false);
    });

    return pageLoad;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        style={
          orientation === 'landscape'
            ? {
                height: errorText
                  ? Orientation.getHeight() + 120
                  : Orientation.getHeight() + 90,
                backgroundColor: 'transparent',
              }
            : {
                height: Orientation.getHeight() - 70,
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
            <View
              style={[
                styles.imageContainer,
                {
                  height: screenConfig?.busolLogo?.height,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Image
                resizeMode="contain"
                style={{
                  width:
                    Orientation.getWidth() *
                    (orientation === 'potrait' ? 0.5 : 0.4),
                  height:
                    Orientation.getHeight() *
                    (orientation === 'potrait' ? 0.2 : 0.15),
                }}
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
                    marginVertical:
                      orientation === 'landscape'
                        ? 2
                        : screenConfig?.cardTitle?.marginVertical,
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
                      fontSize:
                        orientation === 'landscape'
                          ? 12
                          : screenConfig?.errorText?.fontSize,
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
                      ? [
                          styles.textInputContainerLandscape,
                          {height: screenConfig?.formPassword?.height - 5},
                        ]
                      : [
                          styles.textInputContainer,
                          {
                            height: screenConfig?.formPassword?.height,
                            marginVertical:
                              screenConfig?.formPassword?.marginVertical,
                            fontSize: screenConfig?.formPassword?.fontSize,
                          },
                        ]
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
                      ? [
                          styles.textInputContainerLandscape,
                          {height: screenConfig?.formPassword?.height - 5},
                        ]
                      : [
                          styles.textInputContainer,
                          {
                            height: screenConfig?.formPassword?.height,
                            marginVertical:
                              screenConfig?.formPassword?.marginVertical,
                            fontSize: screenConfig?.formPassword?.fontSize,
                          },
                        ]
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
                    onCheckColor={colors.main_color}
                    onValueChange={(value) => setRememberMe(value)}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#747474',
                      fontWeight: '200',
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
              <View
                style={[
                  styles.loginSettingWrapper,
                  open && {marginBottom: 80},
                ]}>
                <View style={styles.loginSetting}>
                  <Text style={[styles.label, {paddingRight: 10}]}>
                    Login with:{' '}
                  </Text>
                  <DropDownPicker
                    dropDownDirection="BOTTOM"
                    style={[
                      styles.dropDownStyle,
                      {
                        width: '55%',
                        height: screenConfig?.dropDownPicker?.height,
                      },
                    ]}
                    dropDownContainerStyle={styles.containerDropDown}
                    customItemContainerStyle={{
                      height: screenConfig?.dropDownPicker?.height,
                    }}
                    textStyle={{
                      fontSize: screenConfig?.dropDownPicker?.fontSize,
                    }}
                    open={open}
                    value={loginDropDownValue}
                    items={items}
                    setOpen={setOpen}
                    setValue={setLoginDropDownValue}
                    setItems={setItems}
                    badgeColors="#707070"
                  />
                </View>
              </View>
              {/* <View style={styles.loginSettingWrapper}>
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
                    Delete soon
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('TC')}>
                  <Text
                    style={(styles.linkText, {color: '#3552C6', fontSize: 11})}>
                    Mockup T&C
                  </Text>
                </TouchableWithoutFeedback>
              </View> */}
              {localLoading ? (
                <Text style={styles.labelLoading}>Loading ...</Text>
              ) : (
                <TouchableOpacity
                  onPress={onSubmit}
                  style={
                    orientation === 'landscape'
                      ? [
                          styles.buttonBlockLandscape,
                          {height: screenConfig?.butonLogin?.height - 5},
                        ]
                      : [
                          styles.buttonBlockLandscape,
                          {height: screenConfig?.butonLogin?.height},
                        ]
                  }>
                  <Text style={styles.buttonText}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                  </Text>
                </TouchableOpacity>
              )}
              <View
                style={[
                  styles.loginSettingWrapper,
                  {flexDirection: screenConfig?.contentWrapper?.flexDirection},
                  {marginTop: screenConfig?.contentWrapper?.marginTop},
                ]}>
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
        <View
          style={{alignItems: 'center', marginTop: 5, flexDirection: 'row'}}>
          <Text
            onPress={() =>
              Linking.openURL('https://www.xl.co.id/en/terms-and-conditions ')
            }
            style={{
              fontSize: 12,
              color: '#20A8D8',
            }}>
            Term of use{'  '}
          </Text>
          <Text style={{fontSize: 5, color: 'black'}}>{'\u2B24'}</Text>
          <Text
            onPress={() =>
              Linking.openURL('https://www.xl.co.id/en/privacy-policy')
            }
            style={{
              fontSize: 12,
              color: '#20A8D8',
            }}>
            {'  '}Privacy Policy
          </Text>
        </View>
      </View>
      {isSubmit && (
        <ModalMultiSession
          setLocalLoading={setLocalLoading}
          data={{username, password, loginDropDownValue}}
          showModal={isMultiSessionDetected}
          title="Multi Session Detected"
          text={multiSessionMsg}
        />
      )}
    </ScrollView>
  );
};
export default Login;
