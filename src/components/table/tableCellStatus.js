import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from '../global/text';
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
            paddingLeft: flexStart ? 8 : 0,
            justifyContent: flexStart ? 'flex-start' : 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <MaterialCommunityIcons
            name={'checkbox-blank-circle'}
            size={14}
            color={
              label === 'Active'
                ? colors.green_status
                : label === 'Pause'
                ? 'yellow'
                : label === 'Deactivated'
                ? colors.delete
                : label === 'Terminated'
                ? 'gray'
                : label === true
                ? colors.green_status
                : label === false
                ? colors.delete
                : null
            }
            style={{marginRight: 4}}
          />
          <Text
            style={{
              color: fontColor || 'black',
            }}>
            {label === true ? 'Yes' : label === false ? 'No' : label}
          </Text>
        </View>
      </TouchView>
    </View>
  );
};
TableCellStatus.propTypes = {
  config: PropTypes.objectOf({
    flexStart: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    isTouchable: PropTypes.bool,
    ballColor: PropTypes.oneOf(['green', 'yellow', 'lightgray', colors.delete]),
  }),
  onPress: PropTypes.func,
  otherInformation: PropTypes.any,
  value: PropTypes.any,
};
export default TableCellStatus;
