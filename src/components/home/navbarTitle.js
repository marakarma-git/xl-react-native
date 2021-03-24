import React from 'react';
import {View} from 'react-native';
import {Text} from '../index';
import styles from '../../style/home.style';

const NavbarTitleComponent = ({title, type = 'forget'}) => {
  return (
    <View style={[styles.navbarContainer, 
      type === 'forget'
      ? {backgroundColor: '#00D3A0'}
      : {backgroundColor: '#00D3A0', height: 100, alignItems: 'flex-start', paddingTop: 10}
    ]}>
      <Text style={styles.largeText}>{title}</Text>
    </View>
  );
};

export default NavbarTitleComponent;
