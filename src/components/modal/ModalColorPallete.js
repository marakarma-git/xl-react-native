import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {inputHybridStyle} from '../../style';
import styles from '../../style/account.style';
import {Text} from '../index';
import PropTypes from 'prop-types';
import {preDefineColorPallete} from '../../constant/color';

const ModalConfirmation = (props) => {
  const {showModal, closeModal, title, currentColor, setCurrentColor} = props;
  const [pickedColor, setPickedColor] = useState(currentColor);
  const renderColorPallete = () => (
    <>
      {preDefineColorPallete.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.palleteButton, {backgroundColor: color}]}
          onPress={() => setPickedColor(color)}></TouchableOpacity>
      ))}
    </>
  );
  const pickColor = () => {
    setCurrentColor(pickedColor);
    closeModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      onRequestClose={closeModal}>
      <View style={inputHybridStyle.modalBackdrop} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <KeyboardAvoidingView
          style={[
            inputHybridStyle.multiSessionModal,
            {borderRadius: 5, width: '85%'},
          ]}>
          <View
            style={[
              inputHybridStyle.tcTitleContainer,
              {borderTopRightRadius: 5, borderTopLeftRadius: 5},
            ]}>
            <Text style={(inputHybridStyle.modalTitleText, {color: 'white'})}>
              {title}
            </Text>
          </View>
          <View style={{padding: 15}}>
            <View
              style={[
                styles.modalColorPreview,
                {backgroundColor: pickedColor},
              ]}>
              <Text style={styles.modalColorPreviewText}>{pickedColor}</Text>
            </View>
            <View style={styles.colorPalleteContainer}>
              {renderColorPallete()}
            </View>
            <TextInput
              onChangeText={(text) => setPickedColor(text)}
              style={[styles.textInputColorPicker, {width: '100%'}]}
              value={pickedColor}
            />
          </View>
          <View style={inputHybridStyle.modalFooter}>
            <View
              style={[
                inputHybridStyle.buttonContainer,
                {justifyContent: 'flex-end'},
              ]}>
              <TouchableOpacity
                disabled={props.loading}
                onPress={pickColor}
                style={[
                  inputHybridStyle.buttonNext,
                  {borderRadius: 5, borderColor: 'none', marginRight: 5},
                ]}>
                <Text
                  fontType="regular"
                  style={[inputHybridStyle.buttonText, {fontSize: 14}]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

ModalConfirmation.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  currentColor: PropTypes.string,
  setCurrentColor: PropTypes.func,
};

ModalConfirmation.defaultProps = {
  showModal: false,
  closeModal: () => {},
  title: '',
  currentColor: '#FFFFFF',
  setCurrentColor: () => {},
};

export default ModalConfirmation;
