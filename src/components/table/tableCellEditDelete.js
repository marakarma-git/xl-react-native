import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {border_radius} from '../../constant/config';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../constant/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropType from 'prop-types';
import PropTypes from 'prop-types';

const TableCellEditDelete = (props) => {
  const {config, onPressEdit, onPressDelete, item, subItem} = props || {};
  const {width, height, backgroundColor, key} = config || {};
  return (
    <View
      key={key}
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'white',
      }}>
      <TouchableOpacity
        style={{
          width: 28,
          height: 28,
          backgroundColor: colors.background_overlay,
          marginRight: 8,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: border_radius,
        }}
        onPress={() => onPressEdit(props)}>
        <Feather name={'edit'} size={20} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 28,
          height: 28,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: border_radius,
        }}
        onPress={() => onPressDelete(props)}>
        <FontAwesome5 name={'trash-alt'} size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};
TableCellEditDelete.propTypes = {
  config: PropTypes.objectOf({
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    key: PropType.string || PropType.number,
  }),
  onPressEdit: PropType.func,
  onPressDelete: PropType.func,
};
TableCellEditDelete.defaultProp = {
  onPressEdit: () => {},
  onPressDelete: () => {},
};
export default TableCellEditDelete;
