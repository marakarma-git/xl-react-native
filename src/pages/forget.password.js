import React, { useState } from 'react';
import { base_url } from '../constant/connection';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { Header, NavbarTitle } from '../components';

import Axios from 'axios';
import inputStyles from '../style/account.style';
import loginStyle from '../style/login.style';

const ChangePasswordPage = ({ navigation }) => {
  const year = new Date().getFullYear();
  const [username, setUsername] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);

  const requestChangePassword = async () => {
    try {
      const { data } = await Axios.post(`${base_url}/user/usr/resetPassword?username=${username}`,);

      if (data) {
        if (data.statusCode === 0) {
          ToastAndroid.show(data.result, ToastAndroid.LONG);
          navigation.replace('Login');
        }
      }

    } catch (error) {
      console.log(error.response.data, " <<< ")
      setRequestLoading(false);
      ToastAndroid.show(error.response.data.error_description || error.message, ToastAndroid.LONG);
    }
  }

  return (
    <ScrollView style={[inputStyles.container, { backgroundColor: 'white' }]}>
      <Header notifications={false} />
      <NavbarTitle title={'Reset Password'} />
      <View style={loginStyle.forgetPasswordForm}>
        <View style={inputStyles.formGroup}>
          <Text style={inputStyles.label}>
            Username
          <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            style={[inputStyles.textInputContainer, { width: '100%' }]}
            placeholder={'Username'}
          />
        </View>
        <Text style={loginStyle.normalText}>
          Back to&nbsp;
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}>
            <Text style={loginStyle.linkText}>Login</Text>
          </TouchableWithoutFeedback>
        </Text>
        <TouchableOpacity
          disabled={requestLoading}
          onPress={requestChangePassword}
          style={[inputStyles.buttonBlock, { backgroundColor: requestLoading ? '#949494' : '#002DBB' }]}>
          <Text style={inputStyles.buttonText}>
            {requestLoading ? (
              <ActivityIndicator color={'#fff'} style={styles.buttonText} />
            ) : (
                <Text style={inputStyles.buttonText}>Reset Password</Text>
              )}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyle.footer, { bottom: 40 }}>
        <Text style={{ color: '#707070', fontSize: 12, textAlign: 'center' }}>
          &copy; {`${year} PT. XL Axiata Tbk. All Right Reserved `}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordPage;
