import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import PropTypes from 'prop-types';
const TableCellHeaderAscDesc = (props) => {
  const {config, onPress, sorted, key} = props || {};
  const {
    label,
    width,
    height,
    isTouchable,
    fontColor,
    backgroundColor,
    flexStart,
  } = config || {};
  const TouchView = isTouchable ? TouchableOpacity : View;
  return (
    <View
      key={key}
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        backgroundColor: backgroundColor || 'blue',
      }}>
      <TouchView
        style={{
          flex: 1,
          paddingLeft: flexStart ? 8 : 0,
          justifyContent: flexStart ? 'flex-start' : 'center',
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
            sorted === 'DESC'
              ? 'sort-asc'
              : sorted === 'ASC'
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
    flexStart: PropTypes.bool,
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
