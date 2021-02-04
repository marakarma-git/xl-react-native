import {Text, TouchableOpacity, View} from 'react-native';
import CustomCheckBox from '../customCheckBox';
import {colors} from '../../constant/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {defaultWidthCell, defaultHeightCell} from '../../constant/config';
import PropTypes from 'prop-types';

const TableCellHeaderOptionCheckBox = (props) => {
  const {config, onPress, onChangeCheck, otherInformation, value} = props || {};
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
        backgroundColor: backgroundColor || 'blue',
      }}>
      <CustomCheckBox
        style={{marginLeft: 16}}
        value={value}
        onPress={() => onChangeCheck(otherInformation)}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.gray_button,
            paddingHorizontal: 2,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <FontAwesome
            name={'sort-desc'}
            color={'black'}
            size={18}
            style={{bottom: 3}}
          />
        </View>
      </CustomCheckBox>
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
              color: fontColor || 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {label}
          </Text>
          <FontAwesome
            style={{marginLeft: 5}}
            name={'unsorted'}
            color={'white'}
            size={18}
          />
        </View>
      </TouchView>
    </View>
  );
};
TableCellHeaderOptionCheckBox.propTypes = {
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
  otherInformation: PropTypes.any,
  value: PropTypes.bool,
};
export default TableCellHeaderOptionCheckBox;
