import httpRequest from '../../constant/axiosInstance';
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

// const unsubscribeTopicNotification = (params, username) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await httpRequest.post(
//         `/notif/push-notification/unSubcribeTopic`,
//         params,
//         {
//           headers: {
//             username,
//           },
//         },
//       );
//     } catch (error) {
//       dispatch(setRequestError(error.response.data));
//     }
//   };
// };

const subscribeTopicNotification = (params, username) => {
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.post(
        `/notif/push-notification/subcribeTopic`,
        params,
        {
          headers: {
            username,
          },
        },
      );
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getListTopicByEnterprise = (
  custNo,
  username,
  notifToken,
  isSubscribe = true,
) => {
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.get(
        `/notif/push-notification/getListTopicByEnterprise?customerNumber=${custNo}`,
        {
          headers: {
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
          if (typeof result == 'object') {
            if (result.length > 0) {
              if (isSubscribe)
                dispatch(subscribeTopicNotification(params, username));
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
  // unsubscribeTopicNotification,
};
