import React from 'react';
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
  manualLogout,
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
    dispatch(manualLogout());
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
                  PT XL Axiata Tbk.{' '}
                  <Text fontType="bold" style={inputHybridStyle.tcText}>
                    (“XL Axiata”)
                  </Text>{' '}
                  is a part of Axiata Group Berhad (here in after shall be
                  referred to as “XL Axiata”, “us” or “we” or “our”). Respecting
                  and protecting your privacy is an integral part of our
                  business and we do not view this as an obligation, but rather
                  as a commitment to maintain your confidence and trust. Our
                  Privacy Position can be summarized by our below guiding
                  Privacy and Data Protection principles:
                </Text>
                <Text style={[inputHybridStyle.tcText, {paddingVertical: 10}]}>
                  <Text fontType="bold" style={inputHybridStyle.tcText}>
                    TRANSPARENT
                  </Text>
                  : We are TRANSPARENT about what, why and how we collect and
                  protect YOUR PERSONAL DATA so that YOU can make informed
                  decisions.
                </Text>
                <Text style={[inputHybridStyle.tcText, {paddingVertical: 10}]}>
                  <Text fontType="bold" style={inputHybridStyle.tcText}>
                    RIGHTS
                  </Text>
                  : We respect YOUR RIGHTS as individuals, so YOU are in control
                  of YOUR PERSONAL DATA.
                </Text>
                <Text style={[inputHybridStyle.tcText, {paddingVertical: 10}]}>
                  <Text fontType="bold" style={inputHybridStyle.tcText}>
                    USE
                  </Text>
                  : We USE YOUR PERSONAL DATA for specific and stated purposes
                  and keep it for as long as required only.
                </Text>
                <Text style={[inputHybridStyle.tcText, {paddingVertical: 10}]}>
                  <Text fontType="bold" style={inputHybridStyle.tcText}>
                    SECURITY
                  </Text>
                  : We have established robust CYBER SECURITY PRACTICES in line
                  with leading industry standards to protect YOUR PERSONAL DATA
                  that YOU have shared with us.
                </Text>
                <Text style={[inputHybridStyle.tcText, {paddingVertical: 10}]}>
                  <Text fontType="bold" style={inputHybridStyle.tcText}>
                    TRANSFER
                  </Text>
                  : We take due care when TRANSFERRING YOUR PERSONAL DATA to
                  third parties such as vendors, contractors, business partners
                  and government authorities.us.
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
