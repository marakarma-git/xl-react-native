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

dayjs.extend(relativeTime);

const NotificationPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    listNotification,
    highNotification,
    mediumNotification,
    lowNotification,
    severityLevel,
    limitedListNotification,
    limitedHighNotification,
    limitedMediumNotification,
    limitedLowNotification,
  } = useSelector((state) => state.notification_reducer);
  const {high, medium, low} = severityLevel;
  const [activeMenu, setActiveMenu] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [listEndText, setListEndText] = useState(null);
  const [isAbleToRead, setIsAbleToRead] = useState(true);
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
  const toggleActiveMenu = (menu) => {
    setActiveMenu(menu);
    dispatch(resetNotificationLimit());
    setListEndText(null);
    setIsScrolled(false);
  };
  const loadMoreHandler = (
    listLimitNotif = [],
    listNotif = [],
    type = 'all',
  ) => {
    if (isAbleToRead) {
      console.log('READ');
      setIsAbleToRead(false);
      const checkUnreadNotif = [...listLimitNotif].filter(
        (notif) => notif.readStatus == false,
      );
      if (checkUnreadNotif.length > 0)
        dispatch(readNotificationApi(listLimitNotif, listNotif, type));
      setTimeout(() => {
        setIsAbleToRead(true);
      }, 1000);
    }
    if (listLimitNotif.length < listNotif.length) {
      if (isScrolled) {
        setListEndText(null);
        setIsLoadMore(true);
        setTimeout(() => {
          setIsLoadMore(false);
          dispatch(increaseNotificationLimit(10));
          dispatch(
            limitListNotification(
              {
                listAll: listNotification,
                listHigh: highNotification,
                listMedium: mediumNotification,
                listLow: lowNotification,
              },
              activeMenu.toLowerCase(),
            ),
          );
        }, 2000);
      }
    } else {
      setListEndText('- You have reach end of message -');
    }
  };
  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      setFirstLoad(false);
    });
    return pageLoad;
  }, [navigation]);
  useEffect(() => {
    const pageBlur = navigation.addListener('blur', () => {
      setFirstLoad(true);
      setIsScrolled(false);
      setListEndText(null);
      setActiveMenu('All');
      setIsAbleToRead(true);
      dispatch(resetNotificationLimit());
      dispatch(
        limitListNotification({
          listAll: listNotification,
          listHigh: highNotification,
          listMedium: mediumNotification,
          listLow: lowNotification,
        }),
      );
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
        setActiveMenu={toggleActiveMenu}
        severityHigh={high}
        severityMedium={medium}
        severityLow={low}
        totalMessage={listNotification.length}
      />
      {activeMenu === 'All' && (
        <FlatList
          data={limitedListNotification}
          renderItem={notificationList}
          keyExtractor={(item) => item.pushMessageNotifId}
          onEndReached={() => {
            loadMoreHandler(limitedListNotification, listNotification, 'all');
          }}
          onEndReachedThreshold={0.1}
          onScroll={() => setIsScrolled(true)}
          ListFooterComponent={
            <>
              {isLoadMore && (
                <View style={style.loader}>
                  <ActivityIndicator size={'small'} color={'black'} />
                  <Text style={style.loaderText}>Loading...</Text>
                </View>
              )}
              {listEndText && (
                <View style={style.loader}>
                  <Text style={style.loaderText}>{listEndText}</Text>
                </View>
              )}
            </>
          }
          ListFooterComponentStyle={{marginBottom: 20}}
        />
      )}
      {activeMenu === 'High' && (
        <FlatList
          data={limitedHighNotification}
          renderItem={notificationList}
          keyExtractor={(item) => item.pushMessageNotifId}
          onEndReached={() => {
            loadMoreHandler(limitedHighNotification, highNotification, 'high');
          }}
          onEndReachedThreshold={0.1}
          onScroll={() => setIsScrolled(true)}
          ListFooterComponent={
            <>
              {isLoadMore && (
                <View style={style.loader}>
                  <ActivityIndicator size={'small'} color={'black'} />
                  <Text style={style.loaderText}>Loading...</Text>
                </View>
              )}
              {listEndText && (
                <View style={style.loader}>
                  <Text style={style.loaderText}>{listEndText}</Text>
                </View>
              )}
            </>
          }
          ListFooterComponentStyle={{marginBottom: 20}}
        />
      )}
      {activeMenu === 'Medium' && (
        <FlatList
          data={limitedMediumNotification}
          renderItem={notificationList}
          keyExtractor={(item) => item.pushMessageNotifId}
          onEndReached={() => {
            loadMoreHandler(
              limitedMediumNotification,
              mediumNotification,
              'medium',
            );
          }}
          onEndReachedThreshold={0.1}
          onScroll={() => setIsScrolled(true)}
          ListFooterComponent={
            <>
              {isLoadMore && (
                <View style={style.loader}>
                  <ActivityIndicator size={'small'} color={'black'} />
                  <Text style={style.loaderText}>Loading...</Text>
                </View>
              )}
              {listEndText && (
                <View style={style.loader}>
                  <Text style={style.loaderText}>{listEndText}</Text>
                </View>
              )}
            </>
          }
          ListFooterComponentStyle={{marginBottom: 20}}
        />
      )}
      {activeMenu === 'Low' && (
        <FlatList
          data={limitedLowNotification}
          renderItem={notificationList}
          keyExtractor={(item) => item.pushMessageNotifId}
          onEndReached={() => {
            loadMoreHandler(limitedLowNotification, lowNotification, 'low');
          }}
          onEndReachedThreshold={0.1}
          onScroll={() => setIsScrolled(true)}
          ListFooterComponent={
            <>
              {isLoadMore && (
                <View style={style.loader}>
                  <ActivityIndicator size={'small'} color={'black'} />
                  <Text style={style.loaderText}>Loading...</Text>
                </View>
              )}
              {listEndText && (
                <View style={style.loader}>
                  <Text style={style.loaderText}>{listEndText}</Text>
                </View>
              )}
            </>
          }
          ListFooterComponentStyle={{marginBottom: 20}}
        />
      )}
    </View>
  );
};

export default NotificationPage;
