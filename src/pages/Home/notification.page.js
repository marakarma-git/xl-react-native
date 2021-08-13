import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { readNotification } from '../../redux/action/notification_action';
import {Card} from 'react-native-paper';
import { HeaderContainer } from '../../components';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from '../../style/home.style';
import Helper from '../../helpers/helper';

dayjs.extend(relativeTime);

const NotificationPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const {imageBase64} = useSelector((state) => state.enterprise_reducer);
    const {pushNotification} = useSelector((state) => state.notification_reducer);

    const notificationList = ({ item }) => {
        return(
            <Card style={[style.cardSection, {marginTop: '2%', borderWidth: 0}]}>
                <Card.Content style={{marginBottom: 10}}>
                    <View style={style.notifCardHeader}>
                        <Text fontType="bold">{item.title}</Text>
                        <Text style={{ fontSize: 10 }}>{item.time ? dayjs(item.time).fromNow(true) : "-"}</Text>
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                        <Text>{item.message}</Text>
                    </View>
                </Card.Content>
            </Card>
        );
    }

    useEffect(() => {
        const pageLoad = navigation.addListener("focus", () => {
            const newNotification = new Array();

            pushNotification.map((notif) => {
                newNotification.push({
                    title: notif.title,
                    message: notif.message,
                    time: notif.time,
                    status: 'read'
                });
            });

            dispatch(readNotification(newNotification));
        });

        return pageLoad;
    }, [navigation, pushNotification]);

    return(
        <View>
            <HeaderContainer
                navigation={navigation}
                headerTitle={'Notification'}
                companyLogo={imageBase64}
            />   
                <FlatList 
                    data={Helper.sortDescending(pushNotification, "time")}
                    renderItem={notificationList}
                    keyExtractor={(item) => item.title}
                />
        </View>
    );
}

export default NotificationPage;