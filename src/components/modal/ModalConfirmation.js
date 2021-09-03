import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {inputHybridStyle} from '../../style';
import {Text} from '../index';
import PropTypes from 'prop-types';

const ModalConfirmation = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.showModal}
      onRequestClose={props.closeModal}>
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
              {props.title}
            </Text>
          </View>
          <View style={{padding: 15}}>
            <Text fontType="semi-bold" style={inputHybridStyle.tcText}>
              {props.description}
            </Text>
          </View>
          <View style={inputHybridStyle.modalFooter}>
            <View style={inputHybridStyle.buttonContainer}>
              <TouchableOpacity
                onPress={props.closeModal}
                style={[
                  inputHybridStyle.buttonCancel,
                  {
                    borderRadius: 5,
                    backgroundColor: '#CBC9C9',
                    borderColor: '#CBC9C9',
                  },
                ]}>
                <Text style={[inputHybridStyle.buttonText, {color: 'black'}]}>
                  {props.cancelText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={props.loading}
                onPress={props.confirmAction}
                style={[
                  inputHybridStyle.buttonNext,
                  {borderRadius: 5, borderColor: 'none'},
                ]}>
                <Text style={inputHybridStyle.buttonText}>
                  {props.confirmText}
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
  description: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  loading: PropTypes.bool,
  confirmAction: PropTypes.func,
};

ModalConfirmation.defaultProps = {
  showModal: false,
  closeModal: () => {},
  title: '',
  description: '',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  loading: false,
  confirmAction: () => {},
};

export default ModalConfirmation;
