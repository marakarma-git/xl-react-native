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

const receivePushNotification = (notification) => {
  return (dispatch) => {
    const severityLevel = {
      high: 0,
      medium: 0,
      low: 0,
    };
    console.log('NOTIFICATION', notification);
    notification.map((notif) => {
      if (notif.criticalLevel) {
        const {criticalLevel} = notif;
        if (criticalLevel === 'high') severityLevel.high++;
        if (criticalLevel === 'medium') severityLevel.medium++;
        if (criticalLevel === 'low') severityLevel.low++;
      } else {
        severityLevel.low++;
      }
    });
    dispatch(countSeverityLevel(severityLevel));
    dispatch(addNotification(notification));
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

const saveUserToken = (token, username) => {
  return async (dispatch) => {
    const requestBody = {};
    const requestHeader = {
      headers: {
        username,
        token,
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

const readNotificationApi = (params, username) => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        username,
      },
    };
    try {
      const {data} = await httpRequest.post(
        '/notif/push-notification/readNotification',
        params,
        customHeaders,
      );
      if (data) {
        const {statusCode, result} = data;
        console.log('Status Code : ', statusCode);
        console.log('Result : ', result);
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getListNotification = (username) => {
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.get(
        '/notif/push-notification/getNotificationList',
        {
          headers: {username},
        },
      );
      if (data) {
        const {statusCode, result} = data;
        console.log('Status Code : ', statusCode);
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
};
