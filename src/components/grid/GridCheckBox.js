import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
const CustomCheckBox = (props) => {
  const {value, onPress, style, disabled, children} = props || {};
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{flexDirection: 'row'}}>
      <View
        style={[
          {
            width: 20,
            height: 20,
            backgroundColor: disabled
              ? colors.gray
              : value
              ? colors.tab_edit
              : colors.gray,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        <MaterialCommunityIcons
          style={{
            backgroundColor: disabled
              ? value
                ? colors.tab_edit
                : colors.gray
              : value
              ? colors.tab_edit
              : 'white',
            borderRadius: 3,
          }}
          name={'check-bold'}
          color={disabled ? (value ? colors.gray : 'white') : 'white'}
          size={17}
        />
      </View>
      {children}
    </TouchableOpacity>
  );
};
CustomCheckBox.propTypes = {
  value: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};
export default CustomCheckBox;
