import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import Text from '../global/text';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../style/drawer.style';
import lod, {isNaN} from 'lodash';
import {inputHybridStyle} from '../../style';
import {colors} from '../../constant/color';
import Clipboard from '@react-native-community/clipboard';
const mergingText = (arrayText) => {
  let stringRawText = '';
  arrayText.map(({text}) => {
    stringRawText = stringRawText + text;
  });
  return stringRawText;
};
const TableCellText = (props) => {
  const [moreText, setMoreText] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [textRaw, setTextRaw] = useState('');
  const {
    config,
    onPress,
    otherInformation,
    onPressArrow,
    item,
    subItem,
    for_layout_edit_only,
  } = props || {};
  const {child_api_id} = subItem || '';
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
    textLink,
    rootConfig,
  } = config || {};
  const {condition} = rootConfig || {};
  const delimiterNumberOnText = (value) => {
    let number = value;
    if (number) {
      number = number.toString();
      if (number) {
        let splitNumber = number.split('.');
        let valueNumber = splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        valueNumber = `${valueNumber}${
          splitNumber[1] ? ',' + splitNumber[1] : ''
        }`;
        return valueNumber;
      }
      return value;
    } else {
      return '';
    }
  };
  const createLocalLabel = (editTextType, valueLocal, removeZero) => {
    if (editTextType === 'Currency') {
      return valueLocal
        ? delimiterNumberOnText(valueLocal)
        : removeZero === true
        ? ''
        : '0';
    } else {
      return valueLocal || '';
    }
  };
  const createLabel = () => {
    if (for_layout_edit_only) {
      const {
        type_input_edit,
        edit_value,
        edit_value2,
        edit_text_type,
        constantLabelLeft,
        constantLabelRight,
        noDefaultCurrency,
      } = for_layout_edit_only || {};
      if (type_input_edit === 'TextInput') {
        return `${
          constantLabelLeft ? `${constantLabelLeft} ` : ''
        }${createLocalLabel(
          edit_text_type,
          edit_value && edit_value.toString(),
          noDefaultCurrency,
        )}${constantLabelRight ? ` ${constantLabelRight}` : ''}`;
      }
      if (type_input_edit === 'DropDown') {
        return edit_value.label;
      }
      if (type_input_edit === 'DropDownType2') {
        return `${createLocalLabel(
          edit_text_type,
          edit_value,
          noDefaultCurrency,
        )} ${edit_value2.label || ''}`;
      }
    }
    if (condition) {
      return condition[`${label}`];
    }
    if (label && !child_api_id) {
      return label;
    }
    if (child_api_id) {
      return label + (child_api_id ? ` ${item[`${child_api_id}`]}` : '');
    } else {
      return label;
    }
  };
  const onLongPress = () => {
    if (!moreText) {
      Clipboard.setString(mergingText(textRaw.lines));
      ToastAndroid.show('Text copied', ToastAndroid.LONG);
    }
  };
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
                  // selectable
                  onLongPress={() => onLongPress()}
                  onTextLayout={(e) => {
                    setTextRaw(e.nativeEvent);
                    setMoreText(lod.size(e.nativeEvent.lines) > 1);
                  }}
                  onPress={() => {
                    if (moreText) {
                      setShowMore(true);
                    }
                    if (!moreText && textLink) {
                      onPress(otherInformation);
                    }
                  }}
                  style={[
                    {
                      paddingLeft:
                        isTreeView && (treeLevel + (!icon ? 1.6 : 0)) * 10,
                      color: fontColor || 'black',
                    },
                    ,
                    textLink && {
                      color: colors.main_color,
                      textDecorationLine: 'underline',
                    },
                  ]}>
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
                  {createLabel()}
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
              {Array.isArray(label) ? (
                label.map((textPerBaris) => {
                  return <Text selectable>{textPerBaris}</Text>;
                })
              ) : (
                <Text selectable>{createLabel()}</Text>
              )}
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
              {textLink && (
                <TouchableOpacity
                  style={[
                    inputHybridStyle.buttonStyle,
                    {backgroundColor: colors.main_color},
                  ]}
                  onPress={() => {
                    setShowMore(false);
                    onPress(otherInformation);
                  }}>
                  <Text style={{color: textLink ? 'white' : 'black'}}>
                    Open Link
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </Modal>
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
export {mergingText};
