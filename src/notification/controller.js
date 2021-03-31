import PushNotification from "react-native-push-notification";
import { addNotification } from "../redux/action/notification_action";

class Notification {

    static configure = (dispatch) => {
        PushNotification.configure({
            largeIcon: "ic_launcher",
            smallIcon: "ic_launcher",
            color: "red",
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                if(!notification.userInteraction){
                    const notificationObject = {
                        title: notification.title,
                        message: notification.message,
                        time: new Date().toString(),
                        status: "unread"
                    }
    
                    dispatch(addNotification(notificationObject));
                }

            },
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("SINI:", notification);
                
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

}

export default Notification;