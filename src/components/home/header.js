import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {homeStyle} from '../../style/index';
import {xlBusol} from '../../assets/images/index';
import {colors} from '../../constant/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {device_width} from '../../constant/config';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HeaderComponent = (props) => {
  const navigation = useNavigation();
  const notification = useSelector(
    (state) => state.notification_reducer.bellCountNotification,
  );

  const generateNotif = () => {
    if (notification > 0) {
      return (
        <View style={homeStyle.notifCircle}>
          <Text style={homeStyle.notifText}>
            {notification > 99 ? '99+' : notification}
          </Text>
        </View>
      );
    }
  };

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
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <MaterialCommunityIcons
            name={'bell-ring'}
            color={colors.yellow_bell}
            size={30}
          />
          {generateNotif()}
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
