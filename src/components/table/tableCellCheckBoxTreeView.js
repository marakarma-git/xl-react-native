import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Text from '../global/text';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../style/drawer.style';
import CustomCheckBox from '../customCheckBox';

const TableCellText = (props) => {
  const {config, onPress, otherInformation, onPressArrow, onChangeCheck} =
    props || {};
  const {
    label,
    width,
    height,
    isTouchable,
    fontColor,
    backgroundColor,
    key,
    flexStart,
    visibility,
    icon,
    showIcon,
    isTreeView,
    treeLevel,
    treeCheck,
  } = config || {};

  const TouchView = isTouchable ? TouchableOpacity : View;
  return (
    <React.Fragment>
      {visibility && (
        <View
          key={key}
          style={{
            width: width || defaultWidthCell,
            height: height || defaultHeightCell,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: backgroundColor || 'white',
          }}>
          <CustomCheckBox
            style={{marginLeft: 16}}
            value={treeCheck}
            onPress={() => onChangeCheck(otherInformation)}
          />
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
              <TouchableOpacity
                disabled={!isTreeView}
                onPress={() => onPressArrow(otherInformation)}>
                <Text
                  numberOfLines={1}
                  style={{
                    paddingLeft:
                      isTreeView && (treeLevel + (!icon ? 1.6 : 0)) * 10,
                    color: fontColor || 'black',
                  }}>
                  {showIcon && icon && (
                    <React.Fragment>
                      <Ionicons
                        name={icon}
                        color={'black'}
                        style={styles.caretMenu}
                      />
                      &nbsp;
                    </React.Fragment>
                  )}
                  {label}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchView>
        </View>
      )}
    </React.Fragment>
  );
};
TableCellText.propTypes = {
  config: PropTypes.objectOf({
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    isTouchable: PropTypes.bool,
    visibility: PropTypes.bool,
    icon: PropTypes.string,
  }),
  onPress: PropTypes.func,
  otherInformation: PropTypes.any,
  value: PropTypes.any,
  superType: PropTypes.oneOf(['BYTE', 'DATE']),
};
export default TableCellText;
