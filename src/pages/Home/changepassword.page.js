import React, {useState, useEffect, useCallback} from 'react';
import {base_url} from '../../constant/connection';
import {setRequestError} from '../../redux/action/dashboard_action';
import {authLogout, changePassword} from '../../redux/action/auth_action';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView, ToastAndroid, Dimensions} from 'react-native';
import {Header, NavbarTitle, PasswordInput} from '../../components/index';

import styles from '../../style/home.style';
import Axios from 'axios';
import Orientation from '../../helpers/orientation';

const ChangePasswordPage = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const {access_token} = useSelector((state) => state.auth_reducer.data);
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

  const submitHandler = async (form) => {
    const username = userData ? userData.principal.username : '';
    setRequestLoading(true);
    try {
      const {data} = await Axios.post(
        `${base_url}/user/usr/changePassword`,
        {
          ...form,
          updatedBy: username,
          username,
        },
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(changePassword(username));
          ToastAndroid.show(data.result, ToastAndroid.LONG);
          dispatch(authLogout());
          navigation.replace("Auth");
        } else {
          ToastAndroid.show(data.statusDescription, ToastAndroid.LONG);
        }
        setRequestLoading(false);
      }
    } catch (error) {
      setRequestLoading(false);
      dispatch(setRequestError(error.response.data));
      ToastAndroid.show(
        error.response.data.error_description || error.message,
        ToastAndroid.LONG,
      );
    }
  };

  useEffect(() => {
    detectOrientation();
  }, []);

  return (
    <ScrollView style={[styles.container, {backgroundColor: 'white'}]}>
      <Header notifications={false} orientation={orientation}/>
      <NavbarTitle title={'Change Password'} type={'change'}/>
      <PasswordInput
        orientation={orientation}
        navigation={navigation}
        submitHandler={submitHandler}
        requestLoading={requestLoading}
      />
    </ScrollView>
  );
};

export default ChangePasswordPage;
