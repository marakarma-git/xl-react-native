import PushNotification from 'react-native-push-notification';
import {
  getListTopicByEnterprise,
  saveNotification,
  savePushNotifToken,
} from '../redux/action/notification_action';
import {store} from '../app';

class Notification {
  static configure = (dispatch, userData) => {
    PushNotification.configure({
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      color: 'red',
      onRegister: function (token) {
        dispatch(savePushNotifToken(token?.token));
        dispatch(
          getListTopicByEnterprise(
            userData.customerNo,
            userData?.principal?.username,
            token?.token,
          ),
        );
      },
      onNotification: function (notification) {
        const {title, body} = JSON.parse(notification.data.title);
        const {token} = store.getState().notification_reducer;
        const {username} = store.getState().auth_reducer.data;
        PushNotification.localNotification({
          channelId: 'fcm_fallback_notification_channel',
          foreground: true,
          userInteraction: false,
          title: title,
          message: body,
        });
        dispatch(saveNotification({body, title, token}, {username}));
      },
      onAction: function (notification) {},
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };
}

export default Notification;
