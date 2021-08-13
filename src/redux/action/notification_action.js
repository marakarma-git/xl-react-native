const addNotification = (payload) => ({
    type: "ADD_NOTIFICATION",
    payload
});

export const receivePushNotification = (notification, navigation) => {
    return (dispatch, getState) => {
        const { data } = getState().auth_reducer;

        const notificationObject = {
            title: notification.title,
            message: notification.message,
            time: new Date().toString(),
            status: "unread"
        }

        if(notification.userInteraction){
            if(notification.data.parameter || notification.data.navigateTo){
                if(data){
                    navigation.navigate(notification.data.navigateTo);
                }
            }
        }else{
            dispatch(addNotification(notificationObject));
        }

    }
};

export const readNotification = (payload) => ({
    type: "READ_NOTIFICATION",
    payload
});