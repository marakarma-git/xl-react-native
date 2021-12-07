import React, {useState} from 'react';
import styles from '../../style/account.style';
// import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../index';
import Feather from 'react-native-vector-icons/Feather';

const DocumentPickerComponent = (props) => {
  const {name, type} = props;
  const pickDocument = async () => {
    // try {
    //   const res = await DocumentPicker.pick();
    //   console.log('RES ', res);
    // } catch (error) {
    //   if (DocumentPicker.isCancel(error)) {
    //     console.log('Cancel by user');
    //   } else {
    //     throw error;
    //   }
    // }
  };
  return (
    <View style={styles.documentPickerContainer}>
      <TouchableOpacity onPress={pickDocument} style={styles.buttonPicker}>
        <Text fontType="semi-bold" style={styles.buttonPickerText}>
          <Feather name="download" color="white" size={16} />
          &nbsp; Choose a file
        </Text>
      </TouchableOpacity>
      <View style={styles.pickerPlaceholderContainer}>
        <Text style={styles.pickerPlaceholderText}>
          lorem ipsum dolor amet.png
        </Text>
      </View>
    </View>
  );
};

DocumentPickerComponent.propTypes = {
  name: PropTypes.string,
  type: PropTypes.array,
};
DocumentPickerComponent.defaultProps = {
  name: '',
  type: ['image/png'],
};

export default DocumentPickerComponent;
