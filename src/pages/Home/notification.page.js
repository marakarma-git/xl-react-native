import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {NotificationCard, Text} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {readNotification} from '../../redux/action/notification_action';
import {Card} from 'react-native-paper';
import {HeaderContainer} from '../../components';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from '../../style/home.style';
import Helper from '../../helpers/helper';

dayjs.extend(relativeTime);

const NotificationPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {pushNotification} = useSelector((state) => state.notification_reducer);

  const notificationList = ({item}) => {
    return (
      <NotificationCard
        message={item.message}
        title={item.title}
        time={item.time}
      />
    );
  };

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      const newNotification = new Array();

      pushNotification.map((notif) => {
        newNotification.push({
          title: notif.title,
          message: notif.message,
          time: notif.time,
          status: 'read',
        });
      });

      dispatch(readNotification(newNotification));
    });

    return pageLoad;
  }, [navigation, pushNotification]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Notification'}
        companyLogo={imageBase64}
      />
      <FlatList
        style={{marginTop: 5}}
        data={Helper.sortDescending(pushNotification, 'time')}
        renderItem={notificationList}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default NotificationPage;
