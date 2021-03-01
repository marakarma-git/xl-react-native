import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  View,
  KeyboardAvoidingView
} from 'react-native';
import {inputHybridStyle} from '../../style';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {authLogout} from '../../redux/action/auth_action';

const ModalTermCondition = (props) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        props.closeModal();
        dispatch(authLogout());
    }

    return(
    <Modal animationType="slide" 
        transparent 
        visible={props.showModal} 
        onRequestClose={props.closeModal}>
        <View style={inputHybridStyle.modalBackdrop} />
        <KeyboardAvoidingView style={inputHybridStyle.newModalContainer}>
            <View style={inputHybridStyle.tcTitleContainer}>
                <Text style={inputHybridStyle.modalTitleText, { color: 'white' }}>{props.title}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={inputHybridStyle.contentWrapper}>
                    <Text style={inputHybridStyle.tcText}>
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                    </Text>
                    <Text style={{ paddingBottom: 20, fontSize: 14 }}>
                        Read more in our
                        <TouchableWithoutFeedback
                            onPress={() => Linking.openURL('https://www.xl.co.id/en/terms-and-conditions')}>
                            <Text style={inputHybridStyle.linkText}> Terms of use </Text>
                        </TouchableWithoutFeedback>
                            and &nbsp;
                        <TouchableWithoutFeedback
                            onPress={() => Linking.openURL('https://www.xl.co.id/en/privacy-policy')}>
                            <Text style={inputHybridStyle.linkText}>Privacy Policy </Text>
                        </TouchableWithoutFeedback>
                    </Text>
                </View>
            </ScrollView>
            <View style={inputHybridStyle.modalFooter}>
                <View style={inputHybridStyle.buttonContainer}>
                    <TouchableOpacity
                        onPress={logoutHandler} 
                        style={inputHybridStyle.buttonCancel}>
                        <Text style={[inputHybridStyle.buttonText, { color: '#8D8D8D' }]}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={inputHybridStyle.buttonNext}>
                        <Text style={inputHybridStyle.buttonText}>
                            I agree
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </Modal>
    );
}

ModalTermCondition.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string
}

export default ModalTermCondition;