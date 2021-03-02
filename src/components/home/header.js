import React from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {homeStyle} from '../../style/index';
import {xlBusol} from '../../assets/images/index';
import {colors} from '../../constant/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {device_width} from '../../constant/config';

const HeaderComponent = (props) => {
  const {customStyle, notifications} = props || {};
  return (
    <View style={[homeStyle.headerContainer, customStyle]}>
      <View style={{height: '100%'}}>
        <Image
          source={xlBusol}
          style={{
            resizeMode: 'contain',
            width: device_width * 0.3,
            height: '100%',
          }}
        />
      </View>
      {notifications && (
        <TouchableOpacity onPress={() => Alert.alert('Notification')}>
          <MaterialCommunityIcons
            name={'bell-ring'}
            color={colors.yellow_bell}
            size={30}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
HeaderComponent.propTypes = {
  customStyle: PropTypes.object,
  notifications: PropTypes.bool,
};
export default HeaderComponent;
