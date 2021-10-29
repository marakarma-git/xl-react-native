import PushNotification from 'react-native-push-notification';
import {
  getListTopicByEnterprise,
  receivePushNotification,
  savePushNotifToken,
} from '../redux/action/notification_action';

class Notification {
  static configure = (dispatch, userData) => {
    PushNotification.configure({
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      color: 'red',
      onRegister: function (token) {
        // Subscribe Push Notification
        dispatch(savePushNotifToken(token?.token));
        dispatch(
          getListTopicByEnterprise(
            userData.customerNo, // sementara
            userData?.principal?.username,
            token?.token,
          ),
        );
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION :', notification);
        const {title, body} = JSON.parse(notification.data.title);
        PushNotification.localNotification({
          channelId: 'fcm_fallback_notification_channel',
          foreground: true,
          userInteraction: false,
          title: title,
          message: body,
        });
        dispatch(receivePushNotification(notification));
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        // process the action
      },
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
