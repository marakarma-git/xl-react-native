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
        console.log('Notification : ' + JSON.parse(notification.data));
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
