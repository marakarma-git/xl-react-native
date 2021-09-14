import React from 'react';
import {
  border_radius,
  defaultHeightCell,
  defaultWidthCell,
} from '../../constant/config';
import {TouchableOpacity, View} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
const TableCellViewMap = (props) => {
  const {config, onPress, otherInformation, key} = props || {};
  const {width, height, fontColor, backgroundColor} = config || {};
  return (
    <View
      key={key}
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'white',
      }}>
      <TouchableOpacity
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
            backgroundColor: colors.tab_edit,
            marginHorizontal: '20%',
            paddingVertical: 4,
            borderRadius: border_radius,
          }}>
          <MaterialCommunityIcons
            name={'map-marker'}
            size={16}
            color={'white'}
            style={{marginRight: 5}}
          />
          <Text
            style={{
              color: fontColor || 'white',
            }}>
            View
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
TableCellViewMap.propTypes = {
  config: PropTypes.objectOf({
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  onPress: PropTypes.func,
  otherInformation: PropTypes.any,
};
export default TableCellViewMap;
