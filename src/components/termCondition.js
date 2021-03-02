import React from 'react';
import {View, Linking, Text, TouchableWithoutFeedback} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import styles from '../style/login.style';

const TermConditionComponent = ({textStyle = {}, containerStyle = {}}) => {
    return(
        <View style={styles.loginSettingWrapper,  containerStyle}>
            <View style={styles.loginSetting}>
            <CheckBox/>
            <View style={{ width: '90%' }}>
                <Text style={[styles.tcText, textStyle]}>Check here to indicate that you have read and agree to the&nbsp;
                    <TouchableWithoutFeedback
                        onPress={() => Linking.openURL('https://www.xl.co.id/en/terms-and-conditions')}>
                        <Text style={styles.linkText}>Terms and Condition </Text>
                    </TouchableWithoutFeedback>
                        and &nbsp;
                        <TouchableWithoutFeedback
                        onPress={() => Linking.openURL('https://www.xl.co.id/en/privacy-policy')}>
                        <Text style={styles.linkText}>Privacy Policy </Text>
                </TouchableWithoutFeedback>
                </Text>
            </View>
            </View>
        </View>
    );
}

export default TermConditionComponent;