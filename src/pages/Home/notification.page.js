import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {CardSeverityLevel, NotificationCard, Text} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderContainer} from '../../components';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from '../../style/home.style';
import {
  increaseNotificationLimit,
  limitListNotification,
  readNotificationApi,
  resetNotificationLimit,
} from '../../redux/action/notification_action';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../constant/color';

dayjs.extend(relativeTime);

const NotificationPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {username} = useSelector((state) => state.auth_reducer);
  const {
    listNotification,
    severityLevel,
    limitedListNotification,
  } = useSelector((state) => state.notification_reducer);
  const {high, medium, low} = severityLevel;
  const [activeMenu, setActiveMenu] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const notificationList = ({item}) => {
    return (
      <>
        <NotificationCard
          message={item.message}
          title={item.subject}
          time={new Date(item.createdDate.split('.')[0])}
          severityLevel={item.criticalLevel}
        />
      </>
    );
  };
  const filterDataBySeverityLevel = (activeMenu) => {
    const notificationData = [...limitedListNotification];
    const lowActiveMenu = activeMenu.toLowerCase();
    if (lowActiveMenu !== 'all') {
      return notificationData.filter(
        (data) => data.criticalLevel == lowActiveMenu,
      );
    }
    return notificationData;
  };
  const loadMoreHandler = (info) => {
    if (limitedListNotification.length < listNotification.length) {
      if (isScrolled) {
        setIsLoadMore(true);
        setTimeout(() => {
          setIsLoadMore(false);
          dispatch(increaseNotificationLimit(10));
          dispatch(limitListNotification(listNotification));
        }, 2000);
      }
    }
  };
  useEffect(() => {
    const checkUnreadNotif = [...limitedListNotification].filter(
      (notif) => notif.readStatus == false,
    );
    if (checkUnreadNotif.length > 0) {
      if (!firstLoad) dispatch(readNotificationApi(username));
    }
  }, [limitedListNotification]);
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
      setIsScrolled(false);
      dispatch(resetNotificationLimit());
      dispatch(limitListNotification(listNotification));
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
        onEndReached={loadMoreHandler}
        onEndReachedThreshold={0.2}
        onScroll={() => setIsScrolled(true)}
        ListFooterComponent={
          <>
            {isLoadMore && (
              <View style={style.loader}>
                <ActivityIndicator size={'small'} color={'black'} />
                <Text style={style.loaderText}>Loading...</Text>
              </View>
            )}
          </>
        }
        ListFooterComponentStyle={{marginBottom: 50}}
      />
    </View>
  );
};

export default NotificationPage;
