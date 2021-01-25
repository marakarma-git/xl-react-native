import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, NavbarTitle, PasswordInput } from '../../components/index';

import styles from '../../style/home.style';

const ChangePasswordPage = () => {
    const titleVersion = useSelector((state) => state.auth_reducer.titleVersion);

    return(
        <ScrollView style={[styles.container, { backgroundColor: 'white' }]}>
            <Header notifications={false} />
            <NavbarTitle title={"Change Password"} />
            <PasswordInput />
            <View>
                <Text style={{fontWeight: 'bold', textAlign: 'center', paddingTop: 10}}>
                IoT SIMCare {titleVersion || ''}
                </Text>
            </View>
        </ScrollView>
    );
}

export default ChangePasswordPage;