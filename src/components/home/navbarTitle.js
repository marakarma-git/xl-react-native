import React from 'react';
import {View} from 'react-native';
import {Text} from '../index';
import styles from '../../style/home.style';
import {colors} from '../../constant/color';

const NavbarTitleComponent = ({title, type = 'forget'}) => {
  return (
    <View
      style={[
        styles.navbarContainer,
        type === 'forget'
          ? {backgroundColor: colors.main_color_overlay}
          : {
              backgroundColor: colors.main_color_overlay,
              height: 100,
              alignItems: 'flex-start',
              paddingTop: 10,
            },
      ]}>
      <Text style={styles.largeText}>{title}</Text>
    </View>
  );
};

export default NavbarTitleComponent;
