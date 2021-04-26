import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../global/text';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../style/drawer.style';
import lod from 'lodash';
import {inputHybridStyle} from '../../style';
import {colors} from '../../constant/color';

const TableCellText = (props) => {
  const [moreText, setMoreText] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const {config, onPress, otherInformation, onPressArrow} = props || {};
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
                  onTextLayout={(e) =>
                    setMoreText(lod.size(e.nativeEvent.lines) > 1)
                  }
                  onPress={() => {
                    if (moreText) {
                      setShowMore(true);
                    }
                  }}
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
      {showMore && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => setShowMore(false)}>
          <View style={inputHybridStyle.modalBackdrop} />
          <KeyboardAvoidingView
            enabled={false}
            style={inputHybridStyle.modalContainer}>
            <View style={inputHybridStyle.modalTitleContainer}>
              <Text style={inputHybridStyle.modalTitleText}>Detail</Text>
            </View>
            <ScrollView style={{flex: 1}}>
              <Text>{label}</Text>
            </ScrollView>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[
                  inputHybridStyle.buttonStyle,
                  {backgroundColor: colors.gray_button_cancel},
                ]}
                onPress={() => setShowMore(false)}>
                <Text style={{color: 'black'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </React.Fragment>
  );
};
TableCellText.proptTypes = {
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
