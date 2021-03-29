import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { readNotification } from '../../redux/action/notification_action';

const NotificationPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification_reducer.pushNotification);

    const readNotif = () => {
        const newNotification = [];
        notification.map((notif) => {
            newNotification.push({
                title: notif.title,
                message: notif.message,
                status: 'read'
            });
        });

        dispatch(readNotification(newNotification));
    }

    useEffect(() => {
        const pageLoad = navigation.addListener("focus", () => {
            readNotif();
        })

        return pageLoad;
    }, []);  

    return (
        <View>
            <Text>
                {JSON.stringify(notification, null, 2)}
            </Text>
        </View>
    );
}

export default NotificationPage;