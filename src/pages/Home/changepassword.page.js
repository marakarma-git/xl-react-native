import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {base_url} from '../../constant/connection';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import {Header, NavbarTitle, PasswordInput} from '../../components/index';

import styles from '../../style/home.style';
import Axios from 'axios';

const ChangePasswordPage = ({navigation}) => {
  const {access_token} = useSelector((state) => state.auth_reducer.data);
  const titleVersion = useSelector((state) => state.auth_reducer.titleVersion);
  const [requestLoading, setRequestLoading] = useState(false);

  const submitHandler = async (form) => {
    setRequestLoading(true);
    try {
      const {data} = await Axios.post(
        `${base_url}/user/usr/changePassword`,
        form,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      if (data) {
        if (data.statusCode == 0) {
          ToastAndroid.show(data.result, ToastAndroid.LONG);
          navigation.replace('Home');
        } else {
          ToastAndroid.show(data.statusDescription, ToastAndroid.LONG);
        }
        setRequestLoading(false);
      }
    } catch (error) {
      setRequestLoading(false);
      ToastAndroid.show('Terdapat Kesalahan Jaringan', ToastAndroid.LONG);
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: 'white'}]}>
      <Header notifications={false} />
      <NavbarTitle title={'Change Password'} />
      <PasswordInput
        navigation={navigation}
        submitHandler={submitHandler}
        requestLoading={requestLoading}
      />
      <View>
        <Text style={{fontWeight: 'bold', textAlign: 'center', paddingTop: 10}}>
          IoT SIMCare {titleVersion || ''}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordPage;
