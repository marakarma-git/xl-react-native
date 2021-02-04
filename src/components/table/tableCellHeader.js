import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
const TableCellHeader = (props) => {
  const {config} = props || {};
  const {label, width, height, fontColor, backgroundColor} = config || {};
  return (
    <View
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        backgroundColor: backgroundColor || 'blue',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: fontColor || 'white',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {label}
        </Text>
      </View>
    </View>
  );
};
TableCellHeader.protTypes = {
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
