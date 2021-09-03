import React from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {inputHybridStyle} from '../../style';
import Text from '../global/text';
import {colors} from '../../constant/color';
const ModalViewMoreText = (props) => {
  const {
    onRequestClose,
    detectLabelArray,
    createLabel,
    onPressClose,
    buttonLink,
    onPressButton,
    labelButton,
  } = props || {};
  return (
    <Modal animationType="slide" transparent onRequestClose={onRequestClose}>
      <View style={inputHybridStyle.modalBackdrop} />
      <KeyboardAvoidingView
        enabled={false}
        style={inputHybridStyle.modalContainer}>
        <View style={inputHybridStyle.modalTitleContainer}>
          <Text style={inputHybridStyle.modalTitleText}>Detail</Text>
        </View>
        <ScrollView style={{flex: 1}}>
          {Array.isArray(detectLabelArray) ? (
            detectLabelArray.map((textPerBaris) => {
              return <Text selectable>{textPerBaris}</Text>;
            })
          ) : (
            <Text selectable>{createLabel}</Text>
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
            onPress={onPressClose}>
            <Text style={{color: 'black'}}>Close</Text>
          </TouchableOpacity>
          {buttonLink && (
            <TouchableOpacity
              style={[
                inputHybridStyle.buttonStyle,
                {backgroundColor: colors.button_color_one},
              ]}
              onPress={onPressButton}>
              <Text style={{color: 'white'}}>{labelButton}</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
ModalViewMoreText.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  detectLabelArray: PropTypes.oneOf([PropTypes.array, PropTypes.string]),
  createLabel: PropTypes.string,
  onPressClose: PropTypes.func,
  buttonLink: PropTypes.bool,
  onPressButton: PropTypes.func,
  labelButton: PropTypes.string,
};
ModalViewMoreText.defaultProps = {
  onRequestClose: () => {},
  onPressClose: () => {},
  onPressButton: () => {},
};
export default ModalViewMoreText;
