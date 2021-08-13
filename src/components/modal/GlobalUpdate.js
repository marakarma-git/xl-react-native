import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import {inputHybridStyle} from '../../style';
import React from 'react';
import PropTypes from 'prop-types';

const linkToStore = () => {
  Linking.openURL("market://details?id=com.dcp_mobile_v4");
}
const GlobalUpdate = (props) => {
  return props.isShow && 
    <Modal animationType="slide" transparent onRequestClose={props.closeModal}>
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
            fontSize: 24,
            fontWeight: 'bold',
            flex: 2,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Update your app
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            textAlignVertical: 'center',
            flex: 1/2
          }}>
         For more features and a better user experience please update your app
        </Text>
        <View style={{alignItems: 'center', marginBottom: '10%',flex: 1/3}}>
          <TouchableOpacity style={inputHybridStyle.buttonStyle} onPress={linkToStore}>
            <Text style={{color: 'white'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
};

GlobalUpdate.propTypes = {
  isShow: PropTypes.bool,
  closeModal: PropTypes.func
}

GlobalUpdate.defaultProps = {
  isShow: false,
  closeModal: () => {},
}
export default GlobalUpdate;
