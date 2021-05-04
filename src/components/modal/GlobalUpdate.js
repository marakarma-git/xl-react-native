import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {inputHybridStyle} from '../../style';
import React from 'react';

const GlobalUpdate = () => {
  return (
    <Modal animationType="slide" transparent onRequestClose={true}>
      <View style={inputHybridStyle.modalBackdrop} />
      <KeyboardAvoidingView
        enabled={false}
        style={[
          inputHybridStyle.modalContainer,
          {
            padding: 0,
          },
        ]}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Ada update sedang menanti kamu
        </Text>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity style={inputHybridStyle.buttonStyle}>
            <Text style={{color: 'white'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default GlobalUpdate;
