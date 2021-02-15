import React, {useState, useEffect, useCallback} from 'react';
import {base_url} from '../constant/connection';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Linking,
  Dimensions
} from 'react-native';
import {Header, NavbarTitle} from '../components';

import Axios from 'axios';
import inputloginStyle from '../style/account.style';
import loginStyle from '../style/login.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Orientation from '../helpers/orientation';
const busolLogo = require('../assets/images/logo/xl-busol-inverted.png');

const ChangePasswordPage = ({navigation}) => {
  const year = new Date().getFullYear();
  const [username, setUsername] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [orientation, setOrientation] = useState('potrait');

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  const requestChangePassword = async () => {
    try {
      const {data} = await Axios.post(
        `${base_url}/user/usr/resetPassword?username=${username}`,
      );

      if (data) {
        if (data.statusCode === 0) {
          ToastAndroid.show(data.result, ToastAndroid.LONG);
          navigation.replace('Login');
        }
      }
    } catch (error) {
      setRequestLoading(false);
      ToastAndroid.show(
        error.response.data.error_description || error.message,
        ToastAndroid.LONG,
      );
    }
  };

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      detectOrientation();
    });

    return pageLoad;
  }, [navigation]);

  return (
    <ScrollView style={[inputloginStyle.container, {backgroundColor: 'white'}]}>
      <Header notifications={false} />
      <NavbarTitle title={'Reset Password'} />
      <KeyboardAvoidingView
        style={
          orientation === 'landscape'
            ? {
                height: Orientation.getHeight() + 80,
                backgroundColor: 'transparent',
              }
            : {
                height: Orientation.getHeight() - 150,
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
            <View style={[loginStyle.imageContainer, 
              { height: 100, justifyContent: 'center', alignItems: 'center' }]}>
              <Image
                resizeMode="contain"
                style={
                  { 
                    width: Orientation.getWidth() * (orientation === 'potrait' ? 0.5 : 0.4), 
                    height: Orientation.getHeight() * (orientation === 'potrait' ? 0.2 : 0.15) 
                  }
                }
                source={busolLogo}
              />
            </View>
              <View
                style={[
                  loginStyle.loginContainer,
                  orientation === 'landscape'
                    ? {width: '48%', marginHorizontal: '26%'}
                    : {width: '85%', marginHorizontal: '7.5%'},
                ]}>
              <Text
                style={{color: '#363636', fontSize: 16, fontWeight: 'bold'}}>
                Forgot Your Password?
              </Text>
              <Text
                style={{
                  color: '#707070',
                  fontSize: 10,
                  paddingVertical: 11,
                  width: '90%',
                }}>
                Please provide the username that you used when you signed up for
                your account. We will send you an email that will allow you to
                reset your password.
              </Text>
              <View style={inputloginStyle.formGroup}>
                <Text style={(inputloginStyle.label, {color: '#747474'})}>
                  Username
                </Text>
                <TextInput
                  onChangeText={(text) => setUsername(text)}
                  style={[
                    inputloginStyle.textInputContainer,
                    {width: '100%', borderRadius: 0},
                  ]}
                  placeholder={'Username'}
                />
              </View>
              <TouchableOpacity
                disabled={requestLoading}
                onPress={requestChangePassword}
                style={[
                  inputloginStyle.buttonBlock,
                  {
                    backgroundColor: requestLoading ? '#949494' : '#002DBB',
                    borderRadius: 0,
                  },
                ]}>
                <Text style={inputloginStyle.buttonText}>
                  {requestLoading ? (
                    <ActivityIndicator
                      color={'#fff'}
                      style={loginStyle.buttonText}
                    />
                  ) : (
                    <Text style={inputloginStyle.buttonText}>Reset Password</Text>
                  )}
                </Text>
              </TouchableOpacity>
              <Text
                style={
                  (loginStyle.normalText,
                  {
                    fontSize: 11,
                    color: '#747474',
                    fontWeight: '200',
                    letterSpacing: 0.5,
                    paddingVertical: 10,
                  })
                }>
                Back to&nbsp;
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={[loginStyle.linkText, {color: '#3552C6'}]}>
                    Login
                  </Text>
                </TouchableWithoutFeedback>
              </Text>
              <View style={[loginStyle.loginSettingWrapper, {marginTop: 10}]}>
                <Text
                  style={[loginStyle.label, {fontSize: 11, color: '#23282C'}]}>
                  Need support?
                </Text>
                <Text>
                  <FontAwesome name="phone" size={11} color="grey" />
                  <TouchableWithoutFeedback
                    onPress={() => Linking.openURL('tel://+622157959556')}>
                    <Text style={[loginStyle.linkText, {fontSize: 11}]}>
                      &nbsp;+62 21 57959556{' '}
                    </Text>
                  </TouchableWithoutFeedback>
                </Text>
                <Text>
                  <FontAwesome name="envelope" size={11} color="grey" />
                  <TouchableWithoutFeedback
                    onPress={() =>
                      Linking.openURL('mailto://cs-busol@xl.co.id')
                    }>
                    <Text style={[loginStyle.linkText, {fontSize: 11}]}>
                      &nbsp;cs-busol@xl.co.id{' '}
                    </Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={(loginStyle.footer, {alignItems: 'center'})}>
        <Text
          style={{
            color: '#707070',
            fontSize: 12,
            bottom: orientation === 'potrait' ? 10 : 5,
          }}>
          &copy; {`${year} PT. XL Axiata Tbk. All Right Reserved `}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordPage;
