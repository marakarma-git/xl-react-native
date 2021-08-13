import {ActivityIndicator, View} from 'react-native';
import {inputHybridStyle} from '../style';
import {colors} from '../constant/color';
import React from 'react';

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={inputHybridStyle.modalBackdrop} />
      <ActivityIndicator size={'large'} color={colors.button_color_one} />
    </View>
  );
};
export default Loading;
