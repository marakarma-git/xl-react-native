import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constant/color';
import {TouchableOpacity} from 'react-native';
import React from 'react';

<TouchableOpacity onPress={onClose}>
  <MaterialCommunityIcons name={'close-circle'} color={colors.gray} size={28} />
</TouchableOpacity>;
