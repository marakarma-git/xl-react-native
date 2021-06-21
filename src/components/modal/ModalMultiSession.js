import React from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  View,
  KeyboardAvoidingView
} from 'react-native';
import {inputHybridStyle} from '../../style';
import {Text} from '../index';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { authLogin, resetMultiSessionDetected } from '../../redux/action/auth_action';

const ModalMultiSession = (props) => {
    const dispatch = useDispatch();
    const {loading, isErricson} = useSelector((state) => state.auth_reducer);

    const loginHandler = () => {
      if(isErricson){
        cancelHandler();
      }else{
          dispatch(authLogin(props.data?.username, props.data?.password, props.data?.loginDropDownValue));
      }  
    }

    const cancelHandler = () => {
      props.setLocalLoading(false);
      dispatch(resetMultiSessionDetected());
    }

    return(
    <Modal animationType="slide" 
        transparent 
        visible={props.showModal} 
        onRequestClose={props.closeModal}>
        <View style={inputHybridStyle.modalBackdrop} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAvoidingView style={inputHybridStyle.multiSessionModal}>
                <View style={inputHybridStyle.tcTitleContainer}>
                    <Text style={inputHybridStyle.modalTitleText, { color: 'white' }}>{props.title}</Text>
                </View>
                <View style={{ padding: 15 }}>
                    <Text style={inputHybridStyle.tcText}>
                      {props.text}
                    </Text>
                </View>
                <View style={inputHybridStyle.modalFooter}>
                    <View style={inputHybridStyle.buttonContainer}>
                        <TouchableOpacity
                            onPress={cancelHandler} 
                            style={inputHybridStyle.buttonCancel}>
                            <Text style={[inputHybridStyle.buttonText, { color: '#8D8D8D' }]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                                disabled={loading}
                                onPress={loginHandler}
                                style={inputHybridStyle.buttonNext}>
                            <Text style={inputHybridStyle.buttonText}>
                                {loading ? "Loading..." : "Use here"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    </Modal>
    );
}

ModalMultiSession.propTypes = {
    data: PropTypes.object,
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.string,
    setLocalLoading: PropTypes.func
}

ModalMultiSession.defaultProps = {
  data: {},
  showModal: false,
  title: "",
  text: "",
  closeModal: () => {},
  setLocalLoading: () => {}
}

export default ModalMultiSession;