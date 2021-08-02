import React, {useEffect} from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {inputHybridStyle} from '../../style';
import {Text} from '../index';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  authLogout,
  updateCustomerConsent,
} from '../../redux/action/auth_action';

const ModalTermCondition = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);

  const submitHandler = () => {
    props.closeModal();
    dispatch(updateCustomerConsent(userData));
  };

  const logoutHandler = () => {
    props.closeModal();
    dispatch(authLogout());
    // if(props.afterLogin){
    navigation.replace('Auth');
    // }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.showModal}
      onRequestClose={props.closeModal}>
      <View style={inputHybridStyle.modalBackdrop} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <KeyboardAvoidingView style={inputHybridStyle.newModalContainer}>
          <View style={inputHybridStyle.tcTitleContainer}>
            <Text style={(inputHybridStyle.modalTitleText, {color: 'white'})}>
              {props.title}
            </Text>
          </View>
          <View style={{width: '100%', height: '55%'}}>
            <ScrollView style={{flex: 1}}>
              <View style={inputHybridStyle.contentWrapper}>
                <Text style={inputHybridStyle.tcText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={{width: '100%', height: '20%'}}>
            <View style={inputHybridStyle.contentWrapper}>
              <Text style={{paddingBottom: 0, fontSize: 14}}>
                Read more in our
                <TouchableWithoutFeedback
                  onPress={() =>
                    Linking.openURL(
                      'https://www.xl.co.id/en/terms-and-conditions',
                    )
                  }>
                  <Text style={inputHybridStyle.linkText}> Terms of Use </Text>
                </TouchableWithoutFeedback>
                and &nbsp;
                <TouchableWithoutFeedback
                  onPress={() =>
                    Linking.openURL('https://www.xl.co.id/en/privacy-policy')
                  }>
                  <Text style={inputHybridStyle.linkText}>Privacy Policy </Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
          <View style={inputHybridStyle.modalFooter}>
            <View style={inputHybridStyle.buttonContainer}>
              <TouchableOpacity
                onPress={logoutHandler}
                style={inputHybridStyle.buttonCancel}>
                <Text style={[inputHybridStyle.buttonText, {color: '#8D8D8D'}]}>
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submitHandler}
                style={inputHybridStyle.buttonNext}>
                <Text style={inputHybridStyle.buttonText}>I agree</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

ModalTermCondition.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.string,
};

export default ModalTermCondition;
