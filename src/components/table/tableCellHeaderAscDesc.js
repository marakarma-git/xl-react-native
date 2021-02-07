import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import PropTypes from 'prop-types';
const TableCellHeaderAscDesc = (props) => {
  const {config, onPress, sorted} = props || {};
  const {label, width, height, isTouchable, fontColor, backgroundColor} =
    config || {};
  const TouchView = isTouchable ? TouchableOpacity : View;
  return (
    <View
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        backgroundColor: backgroundColor || 'blue',
      }}>
      <TouchView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        onPress={onPress}>
        <Text
          style={{
            color: fontColor || 'white',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {label}
        </Text>
        <FontAwesome
          style={{marginLeft: 5}}
          name={
            sorted === 'ASC'
              ? 'sort-asc'
              : sorted === 'DESC'
              ? 'sort-desc'
              : 'unsorted'
          }
          color={'white'}
          size={18}
        />
      </TouchView>
    </View>
  );
};
TableCellHeaderAscDesc.propTypes = {
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
  sorted: PropTypes.oneOf(['ASC', 'DESC', null]),
  otherInformation: PropTypes.any,
};
export default TableCellHeaderAscDesc;
