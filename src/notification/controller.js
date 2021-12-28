import PushNotification from 'react-native-push-notification';
import {
  getListNotification,
  savePushNotifToken,
  saveUserToken,
} from '../redux/action/notification_action';

class Notification {
  static configure = (dispatch, userData) => {
    const {access_token, principal} = userData;
    PushNotification.configure({
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      color: 'red',
      onRegister: function (token) {
        const notifToken = token?.token;
        dispatch(savePushNotifToken(notifToken));
        dispatch(
          saveUserToken(
            notifToken,
            principal?.username,
            principal?.enterpriseId,
          ),
        );
        if (access_token) dispatch(getListNotification(principal?.username));
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION ', notification);
        const {title, body} = JSON.parse(notification.data.notification);
        PushNotification.localNotification({
          channelId: 'fcm_fallback_notification_channel',
          foreground: true,
          userInteraction: false,
          title: title,
          message: body,
        });
        if (access_token) dispatch(getListNotification(principal?.username));
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
