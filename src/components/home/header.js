import React from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {homeStyle} from '../../style/index';
import {xlBusol} from '../../assets/images/index';
import {colors} from '../../constant/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderComponent = (props) => {
  return (
    <View style={[homeStyle.headerContainer, props.customStyle]}>
      <Image source={xlBusol} style={homeStyle.headerImage} />
      <TouchableOpacity onPress={() => Alert.alert('Notification')}>
        <MaterialCommunityIcons
          name={'bell-ring'}
          color={colors.yellow_bell}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderComponent;
