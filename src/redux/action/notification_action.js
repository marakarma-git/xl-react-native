import {callApi} from '../../constant/connection';
import {setRequestError} from './dashboard_action';

const addNotification = (payload) => ({
  type: 'ADD_NOTIFICATION',
  payload,
});

const receivePushNotification = (notification, navigation) => {
  return (dispatch, getState) => {
    const {title, message, userInteraction} = notification.data;
    const notificationObject = {
      title,
      message,
      userInteraction,
      time: new Date().toString(),
      status: 'unread',
    };

    dispatch(addNotification(notificationObject));
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

const unsubscribeTopicNotification = (notifToken, token) => {
  return async (dispatch) => {
    try {
      const {data} = await callApi.post(
        `/notif/push-notification/unSubcribeTopic`,
        {tokens: [notifToken]},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const subscribeTopicNotification = (params, username, token) => {
  return async (dispatch) => {
    try {
      const {data} = await callApi.post(
        `/notif/push-notification/subcribeTopic`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            username,
          },
        },
      );
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getListTopicByEnterprise = (custNo, token, username, notifToken) => {
  return async (dispatch) => {
    try {
      const {data} = await callApi.get(
        `/notif/push-notification/getListTopicByEnterprise?customerNumber=${custNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            username,
          },
        },
      );

      if (data) {
        const {statusCode, result} = data;
        const params = {
          customerNumbers: [custNo],
          tokens: notifToken,
          topics: result,
        };
        if (statusCode === 0) {
          if (Array.isArray(result)) {
            if (result.length > 0) {
              dispatch(subscribeTopicNotification(params, username, token));
            }
          }
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export {
  receivePushNotification,
  readNotification,
  getListTopicByEnterprise,
  savePushNotifToken,
  unsubscribeTopicNotification,
};
