import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { TermCondition } from '../components';

import styles from '../style/login.style'; 
import busolLogo from '../assets/images/logo/xl-busol-inverted.png';
import Orientation from '../helpers/orientation';

const TermConditionPage = ({navigation}) => {
    const [checked, setChecked] = useState(false);
    const [orientation, setOrientation] = useState('potrait');

    return(
        <ScrollView style={styles.container}>
            <View 
                style={
                    orientation === 'landscape'
                        ? {
                            height: errorText
                            ? Orientation.getHeight() + 100
                            : Orientation.getHeight() + 70,
                            backgroundColor: 'transparent',
                        }
                        : {
                            height: Orientation.getHeight() - 100,
                            backgroundColor: 'transparent',
                        }
                    }>
                <View
                    style={[
                        {flex: 1},
                        orientation === 'potrait'
                            ? {justifyContent: 'center'}
                            : {marginTop: 10},
                        ]}>
                        <View style={[styles.imageContainer, 
                            { height: 100, justifyContent: 'center', alignItems: 'center' }]}>
                            <Image
                                resizeMode="contain"
                                style={
                                { 
                                    width: Orientation.getWidth() * (orientation === 'potrait' ? 0.5 : 0.4), 
                                    height: Orientation.getHeight() * (orientation === 'potrait' ? 0.2 : 0.15) 
                                }
                                }
                                source={busolLogo}
                            />
                        </View>
                        <View
                            style={[
                                styles.loginContainer,
                                orientation === 'landscape'
                                ? {width: '48%', marginHorizontal: '26%'}
                                : {width: '85%', marginHorizontal: '7.5%'},
                            ]}>
                            <Text
                                style={{
                                ...styles.loginDesc,
                                ...{
                                    fontSize: orientation === 'landscape' ? 14 : 16,
                                    marginVertical: orientation === 'landscape' ? 2 : '3%',
                                },
                            }}>
                                Terms & Privacy Policy
                            </Text>
                            <View style={styles.tcBox}>
                                <TermCondition 
                                    containerStyle={{ width: '95%', marginBottom: 15 }}
                                    textStyle={{ color: 'black', fontSize: 11, position: 'relative', top: 7 }} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()} 
                                    style={styles.buttonCancel}>
                                    <Text style={[styles.buttonText, { color: '#8D8D8D' }]}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                     disabled={checked}
                                     style={styles.buttonNext}>
                                    <Text style={styles.buttonText}>
                                        Next
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default TermConditionPage;