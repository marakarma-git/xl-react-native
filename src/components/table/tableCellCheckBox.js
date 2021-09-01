import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  ToastAndroid,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Text from '../global/text';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import CustomCheckBox from '../customCheckBox';
import PropTypes from 'prop-types';
import {inputHybridStyle} from '../../style';
import {colors} from '../../constant/color';
import lod from 'lodash';
const TableCellCheckBox = (props) => {
  const [moreText, setMoreText] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [textRaw, setTextRaw] = useState('');
  const {config, onPress, onChangeCheck, otherInformation, value, key} =
    props || {};
  const {label, width, height, isTouchable, fontColor, backgroundColor} =
    config || {};
  const TouchView = isTouchable ? TouchableOpacity : View;
  const onLongPress = () => {
    console.log('onLongPress');
    Clipboard.setString(label);
    ToastAndroid.show('Text copied', ToastAndroid.LONG);
  };
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
      <CustomCheckBox
        style={{marginLeft: 16}}
        value={value}
        onPress={() => onChangeCheck(otherInformation)}
      />
      <TouchView
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
        onLongPress={onLongPress}
        onPress={() => onPress(otherInformation)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            disabled={isTouchable}
            onLongPress={() => onLongPress()}
            onPress={() => {
              if (moreText) {
                setShowMore(true);
              }
            }}>
            <Text
              numberOfLines={1}
              onTextLayout={(e) => {
                setTextRaw(e.nativeEvent);
                setMoreText(lod.size(e.nativeEvent.lines) > 1);
              }}
              style={{
                color: fontColor || 'black',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchView>
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
                <Text selectable>{label}</Text>
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
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </View>
  );
};
TableCellCheckBox.propTypes = {
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
export default TableCellCheckBox;
