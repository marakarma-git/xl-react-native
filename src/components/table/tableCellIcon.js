import React from 'react';
import {
  border_radius,
  defaultHeightCell,
  defaultWidthCell,
} from '../../constant/config';
import {TouchableOpacity, View, Image} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
import {iconLogout} from '../../assets/images';
import {SvgUri} from 'react-native-svg';
const {uri, width: width2, height: height2} = Image.resolveAssetSource(
  require('../../assets/images/icons/monitor.svg'),
);
const TableCellIcon = (props) => {
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
          }}>
          <SvgUri width={width2} height={height2} uri={uri} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
TableCellIcon.propTypes = {
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
export default TableCellIcon;
