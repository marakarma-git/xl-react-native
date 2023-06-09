import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {border_radius} from '../../constant/config';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import Feather from 'react-native-vector-icons/Feather';
import {color_theme_one, colors} from '../../constant/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropType from 'prop-types';
import PropTypes from 'prop-types';

const TableCellEditDelete = (props) => {
  const {
    config,
    onPressEdit,
    onPressDelete,
    item,
    subItem,
    hideEdit,
    hideDelete,
  } = props || {};
  const {width, height, backgroundColor, key, removeDelete} = config || {};
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
      {!hideEdit && (
        <TouchableOpacity
          style={{
            width: 28,
            height: 28,
            backgroundColor: colors.tab_edit,
            marginRight: !removeDelete ? 8 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: border_radius,
          }}
          onPress={() => onPressEdit(props)}>
          <Feather name={'edit'} size={20} color={'white'} />
        </TouchableOpacity>
      )}
      {!removeDelete && !hideDelete && (
        <TouchableOpacity
          style={{
            width: 28,
            height: 28,
            backgroundColor: color_theme_one.peach,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: border_radius,
          }}
          onPress={() => onPressDelete(props)}>
          <FontAwesome5 name={'trash-alt'} size={20} color={'white'} />
        </TouchableOpacity>
      )}
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
