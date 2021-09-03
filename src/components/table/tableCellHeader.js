import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Text from '../global/text';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import {colors} from '../../constant/color';
const TableCellHeader = (props) => {
  const {config, key} = props || {};
  const {label, width, height, fontColor, backgroundColor} = config || {};
  return (
    <View
      key={key}
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        backgroundColor: backgroundColor || colors.button_color_one,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          fontType={'bold'}
          style={{
            color: fontColor || 'white',
            fontSize: 18,
          }}>
          {label}
        </Text>
      </View>
    </View>
  );
};
TableCellHeader.propTypes = {
  config: PropTypes.objectOf({
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
  }),
};
export default TableCellHeader;
