import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {CardSeverityLevel, NotificationCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderContainer} from '../../components';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from '../../style/home.style';
import {readNotificationApi} from '../../redux/action/notification_action';

dayjs.extend(relativeTime);

const NotificationPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {username} = useSelector((state) => state.auth_reducer);
  const {listNotification, severityLevel} = useSelector(
    (state) => state.notification_reducer,
  );
  const {high, medium, low} = severityLevel;
  const [activeMenu, setActiveMenu] = useState('All');

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
  const filterDataBySeverityLevel = (activeMenu) => {
    const notificationData = [...listNotification];
    const lowActiveMenu = activeMenu.toLowerCase();
    if (lowActiveMenu !== 'all') {
      return notificationData.filter(
        (data) => data.criticalLevel == lowActiveMenu,
      );
    }
    return notificationData;
  };
  useEffect(() => {
    const checkUnreadNotif = [...listNotification].filter(
      (notif) => notif.readStatus == false,
    );
    if (checkUnreadNotif.length > 0) {
      if (!firstLoad) dispatch(readNotificationApi(username));
    }
  }, [listNotification]);
  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      dispatch(readNotificationApi(username));
      setFirstLoad(false);
    });
    return pageLoad;
  }, [navigation]);
  useEffect(() => {
    const pageBlur = navigation.addListener('blur', () => {
      setFirstLoad(true);
    });
    return pageBlur;
  }, [navigation]);

  return (
    <View style={style.notificationContainer}>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Notification'}
        companyLogo={imageBase64}
      />
      <CardSeverityLevel
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        severityHigh={high}
        severityMedium={medium}
        severityLow={low}
        totalMessage={listNotification.length}
      />
      <FlatList
        data={filterDataBySeverityLevel(activeMenu)}
        renderItem={notificationList}
        keyExtractor={(item) => item.pushMessageNotifId}
      />
    </View>
  );
};

export default NotificationPage;
