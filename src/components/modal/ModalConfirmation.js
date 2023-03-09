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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../constant/color';

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
            {props?.iconClose && (
              <TouchableOpacity onPress={props.closeModal}>
                <MaterialCommunityIcons
                  name={'close-circle'}
                  color={'white'}
                  size={24}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{padding: 15}}>
            <Text
              fontType="semi-bold"
              style={{
                ...inputHybridStyle.tcText,
                textAlign: props.alignContent,
              }}>
              {props.description}
            </Text>
          </View>
          {props?.subDescription && (
            <View style={{paddingLeft: 15, paddingBottom: 15}}>
              <Text
                style={{
                  ...inputHybridStyle.tcText,
                  textAlign: props.alignContent,
                }}>
                {props.subDescription}
              </Text>
            </View>
          )}
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
                  {
                    borderRadius: 5,
                    borderColor: 'none',
                    backgroundColor: props?.loading
                      ? '#CBC9C9'
                      : colors.main_color,
                  },
                ]}>
                <Text style={inputHybridStyle.buttonText}>
                  {props.confirmText}
                </Text>
                {props?.loading && (
                  <ActivityIndicator
                    size={'small'}
                    color={'white'}
                    style={{marginLeft: 5}}
                  />
                )}
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
  alignContent: PropTypes.string,
  iconClose: PropTypes.bool,
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
  alignContent: 'left',
  iconClose: false,
};

export default ModalConfirmation;
