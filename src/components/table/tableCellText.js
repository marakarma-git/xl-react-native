import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
const TableCellText = (props) => {
  const {config, onPress, otherInformation} = props || {};
  const {label, width, height, isTouchable, fontColor, backgroundColor} =
    config || {};
  const TouchView = isTouchable ? TouchableOpacity : View;
  return (
    <View
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'white',
      }}>
      <TouchView
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
        onPress={() => onPress(otherInformation)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: fontColor || 'black',
              fontWeight: 'bold',
            }}>
            {label}
          </Text>
        </View>
      </TouchView>
    </View>
  );
};
TableCellText.proptTypes = {
  config: PropTypes.objectOf({
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    isTouchable: PropTypes.bool,
  }),
  onPress: PropTypes.func,
  otherInformation: PropTypes.any,
  value: PropTypes.any,
};
export default TableCellText;
