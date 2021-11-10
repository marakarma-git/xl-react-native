import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {CardSeverityLevel, NotificationCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderContainer} from '../../components';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from '../../style/home.style';

dayjs.extend(relativeTime);

const NotificationPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {listNotification, severityLevel} = useSelector(
    (state) => state.notification_reducer,
  );
  const {high, medium, low} = severityLevel;

  const notificationList = ({item}) => {
    return (
      <NotificationCard
        message={item.message}
        title={item.subject}
        time={new Date(item.createdDate.split('.')[0])}
        severityLevel={item.criticalLevel}
      />
    );
  };

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      // Nanti disini buat ngelakuin dispatch api read notif
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View style={style.notificationContainer}>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Notification'}
        companyLogo={imageBase64}
      />
      <CardSeverityLevel
        severityHigh={high}
        severityMedium={medium}
        severityLow={low}
      />
      <FlatList
        data={listNotification}
        renderItem={notificationList}
        keyExtractor={(item) => item.pushMessageNotifId}
      />
    </View>
  );
};

export default NotificationPage;
