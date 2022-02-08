import httpRequest from '../../constant/axiosInstance';
import {setRequestError} from './dashboard_action';

const addNotification = (payload) => ({
  type: 'ADD_NOTIFICATION',
  payload,
});

const countSeverityLevel = ({high, medium, low}) => ({
  type: 'COUNT_SEVERITY_LEVEL',
  payload: {high, medium, low},
});

const resetNotificationLimit = () => ({
  type: 'RESET_NOTIFICATION_LIMIT',
});

const setLimitedNotification = (data) => ({
  type: 'SET_LIMITED_NOTIFICATION',
  payload: data,
});

const increaseNotificationLimit = (increaseNumber) => ({
  type: 'INCREASE_NOTIFICATION_LIMIT',
  payload: Number(increaseNumber),
});

const limitListNotification = (notificationData, type = 'init') => {
  return async (dispatch, getState) => {
    const {
      showNotificationLimit,
      limitedListNotification,
      limitedHighNotification,
      limitedMediumNotification,
      limitedLowNotification,
    } = getState().notification_reducer;
    const limitedListAllNotification =
      type === 'init' || type === 'all'
        ? [...notificationData.listAll].slice(0, showNotificationLimit)
        : limitedListNotification;
    const limitedListHighNotification =
      type === 'init' || type === 'high'
        ? [...notificationData.listHigh].slice(0, showNotificationLimit)
        : limitedHighNotification;
    const limitedListMediumNotification =
      type === 'init' || type === 'medium'
        ? [...notificationData.listMedium].slice(0, showNotificationLimit)
        : limitedMediumNotification;
    const limitedListLowNotification =
      type === 'init' || type === 'low'
        ? [...notificationData.listLow].slice(0, showNotificationLimit)
        : limitedLowNotification;
    dispatch(
      setLimitedNotification({
        listAll: limitedListAllNotification,
        listHigh: limitedListHighNotification,
        listMedium: limitedListMediumNotification,
        listLow: limitedListLowNotification,
      }),
    );
  };
};

const receivePushNotification = (notification) => {
  return (dispatch) => {
    const severityLevel = {
      high: 0,
      medium: 0,
      low: 0,
      listHigh: [],
      listMedium: [],
      listLow: [],
    };
    const {listHigh, listMedium, listLow} = severityLevel;
    [...notification].map((notif) => {
      if (notif.criticalLevel) {
        const {criticalLevel} = notif;
        if (criticalLevel === 'high')
          severityLevel.high++, severityLevel.listHigh.push(notif);
        if (criticalLevel === 'medium')
          severityLevel.medium++, severityLevel.listMedium.push(notif);
        if (criticalLevel === 'low')
          severityLevel.low++, severityLevel.listLow.push(notif);
      } else {
        severityLevel.low++;
      }
    });
    dispatch(
      addNotification({
        listAll: notification,
        listHigh,
        listMedium,
        listLow,
      }),
    );
    dispatch(countSeverityLevel(severityLevel));
    dispatch(
      limitListNotification({
        listAll: notification,
        listHigh,
        listMedium,
        listLow,
      }),
    );
  };
};

const savePushNotifToken = (token) => ({
  type: 'SAVE_TOKEN',
  payload: token,
});

const readNotification = (payload) => ({
  type: 'READ_NOTIFICATION',
  payload,
});

const countBellNotification = (payload) => ({
  type: 'COUNT_BELL_NOTIFICATION',
  payload,
});

const setBellNotification = (payload) => ({
  type: 'SET_BELL_NOTIFICATION',
  payload,
});

const saveUserToken = (token, username, enterpriseId) => {
  return async (dispatch) => {
    const requestBody = {
      token,
      enterpriseId,
    };
    const requestHeader = {
      headers: {
        username,
      },
    };
    try {
      await httpRequest.post(
        `/notif/push-notification/saveUserToken`,
        requestBody,
        requestHeader,
      );
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const readNotificationApi = (
  limitedListNotification,
  listNotif,
  type = 'all',
) => {
  return async (dispatch, getState) => {
    const {username} = getState().auth_reducer;
    const {
      showNotificationLimit,
      listNotification,
      highNotification,
      mediumNotification,
      lowNotification,
    } = getState().notification_reducer;
    const pushMessageIds = limitedListNotification.map(
      (notif) => notif.pushMessageNotifId,
    );
    const customHeaders = {
      headers: {
        username,
      },
    };
    try {
      const {data} = await httpRequest.post(
        '/notif/push-notification/readAllNotification',
        pushMessageIds,
        customHeaders,
      );
      if (data) {
        const {statusCode, result} = data;
        if (statusCode === 0 && result) {
          let readByLimit = 0;
          const newNotificationData = [...listNotif];
          newNotificationData.map((notif) => {
            if (readByLimit < showNotificationLimit) notif.readStatus = true;
            readByLimit++;
          });
          dispatch(countBellNotification(pushMessageIds.length));
          dispatch(
            addNotification({
              listAll: type === 'all' ? newNotificationData : listNotification,
              listHigh:
                type === 'high' ? newNotificationData : highNotification,
              listMedium:
                type === 'medium' ? newNotificationData : mediumNotification,
              listLow: type === 'low' ? newNotificationData : lowNotification,
            }),
          );
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getListNotification = (username, limit = 100) => {
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.get(
        `/notif/push-notification/getNotificationList?limit=${limit}`,
        {
          headers: {username},
        },
      );
      if (data) {
        const {statusCode, result} = data;
        const checkUnread = result.filter((data) => data.readStatus === false);
        if (statusCode === 0)
          dispatch(receivePushNotification(result)),
            dispatch(setBellNotification(checkUnread.length));
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export {
  receivePushNotification,
  readNotification,
  savePushNotifToken,
  readNotificationApi,
  getListNotification,
  saveUserToken,
  resetNotificationLimit,
  increaseNotificationLimit,
  limitListNotification,
};
