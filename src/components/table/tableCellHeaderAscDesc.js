import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../global/text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import PropTypes from 'prop-types';
import {colors} from '../../constant/color';
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
        backgroundColor: backgroundColor || colors.main_color,
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
          fontType={'bold'}
          style={{
            color: fontColor || 'white',
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
          color={
            sorted === 'RESET' || !sorted
              ? 'white'
              : colors.white_header_asc_desc
          }
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
