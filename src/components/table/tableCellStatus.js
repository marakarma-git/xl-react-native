import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
const TableCellStatus = (props) => {
  const {config, onPress, otherInformation, key} = props || {};
  const {
    label,
    width,
    height,
    isTouchable,
    fontColor,
    backgroundColor,
    ballColor,
  } = config || {};
  const TouchView = isTouchable ? TouchableOpacity : View;
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
          <MaterialCommunityIcons
            name={'checkbox-blank-circle'}
            size={14}
            color={
              label === 'Active'
                ? colors.green_status
                : label === 'Deactivated'
                ? 'red'
                : label === 'Terminated'
                ? 'gray'
                : label === 'Yes'
                ? colors.green_status
                : label === 'No'
                ? 'red'
                : null
            }
            style={{marginRight: 4}}
          />
          <Text
            style={{
              color: fontColor || 'black',
              fontWeight: 'bold',
            }}>
            {label}
          </Text>
        </View>
      </TouchView>
    </View>
  );
};
TableCellStatus.propTypes = {
  config: PropTypes.objectOf({
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    isTouchable: PropTypes.bool,
    ballColor: PropTypes.oneOf(['green', 'yellow', 'lightgray', 'red']),
  }),
  onPress: PropTypes.func,
  otherInformation: PropTypes.any,
  value: PropTypes.any,
};
export default TableCellStatus;
