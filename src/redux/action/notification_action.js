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

const limitListNotification = (notificationData) => {
  return async (dispatch, getState) => {
    const {showNotificationLimit} = getState().notification_reducer;
    const newLimitedNotificationList = [...notificationData].slice(
      0,
      showNotificationLimit,
    );
    dispatch(setLimitedNotification(newLimitedNotificationList));
  };
};

const receivePushNotification = (notification) => {
  return (dispatch) => {
    const severityLevel = {
      high: 0,
      medium: 0,
      low: 0,
    };
    [...notification].map((notif) => {
      if (notif.criticalLevel) {
        const {criticalLevel} = notif;
        if (criticalLevel === 'high') severityLevel.high++;
        if (criticalLevel === 'medium') severityLevel.medium++;
        if (criticalLevel === 'low') severityLevel.low++;
      } else {
        severityLevel.low++;
      }
    });
    dispatch(addNotification(notification));
    dispatch(countSeverityLevel(severityLevel));
    dispatch(limitListNotification(notification));
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
      console.log(error, 'ERROR NICH');
      dispatch(setRequestError(error.response.data));
    }
  };
};

const readNotificationApi = (username) => {
  return async (dispatch, getState) => {
    const {
      limitedListNotification,
      listNotification,
      showNotificationLimit,
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
          const newNotificationData = [...listNotification];
          newNotificationData.map((notif) => {
            if (readByLimit < showNotificationLimit) notif.readStatus = true;
            readByLimit++;
          });
          dispatch(addNotification(newNotificationData));
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
        console.log('DATA LENGTH ', result.length);
        if (statusCode === 0) dispatch(receivePushNotification(result));
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
