import {Text, TouchableOpacity, View} from 'react-native';
import CustomCheckBox from '../customCheckBox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {defaultWidthCell, defaultHeightCell} from '../../constant/config';
import PropTypes from 'prop-types';

const TableCellHeaderCheckBox = (props) => {
  const {config, onPress, onChangeCheck, valueCheck, sorted, key} = props || {};
  const {label, width, height, isTouchable, fontColor, backgroundColor} =
    config || {};
  const TouchView = isTouchable ? TouchableOpacity : View;
  return (
    <View
      key={key}
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'blue',
      }}>
      <CustomCheckBox
        style={{marginLeft: 16}}
        value={valueCheck}
        onPress={onChangeCheck}
      />
      <TouchView
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
        onPress={onPress}>
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
        </View>
      </TouchView>
    </View>
  );
};
TableCellHeaderCheckBox.propTypes = {
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
  onChangeCheck: PropTypes.func,
  sorted: PropTypes.oneOf(['ASC', 'DESC', null]),
  valueCheck: PropTypes.bool,
};
export default TableCellHeaderCheckBox;
