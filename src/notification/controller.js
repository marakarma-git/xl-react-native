import PushNotification from "react-native-push-notification";
import { receivePushNotification } from "../redux/action/notification_action";

class Notification {

    static configure = (dispatch, navigation) => {
        PushNotification.configure({
            largeIcon: "ic_launcher",
            smallIcon: "ic_launcher",
            color: "red",
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                dispatch(receivePushNotification(notification, navigation));

            },
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                
                // process the action
            },
            onRegistrationError: function(err) {
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
    }

    static pushNotifLinking = (navigation, screenName, parameter) => {

    }

}

export default Notification;