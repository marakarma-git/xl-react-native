import React, {useState} from 'react';
import styles from '../../style/account.style';
import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../index';
import Feather from 'react-native-vector-icons/Feather';
import {useToastHooks} from '../../customHooks/customHooks';
import Helper from '../../helpers/helper';

const DocumentPickerComponent = (props) => {
  const showToast = useToastHooks();
  const {inputHandler, type, name} = props;
  const [fileName, setFileName] = useState('');
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: type,
      });
      const isAvailableSize = Helper.imageSizeValidation(res.size, 1024000);
      if (isAvailableSize) {
        setFileName(res.name);
        inputHandler(name, res.uri);
      } else {
        showToast({
          title: 'Upload Image',
          type: 'warning',
          message: 'Max image size 1mb',
          duration: 3000,
          showToast: true,
          position: 'top',
        });
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Cancel by user');
      } else {
        showToast({
          title: 'Upload Image',
          type: 'error',
          message: 'Error when upload image',
          duration: 4000,
          showToast: true,
          position: 'top',
        });
        throw error;
      }
    }
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
          {fileName.length > 20 ? fileName.substring(0, 25) + '...' : fileName}
        </Text>
      </View>
    </View>
  );
};

DocumentPickerComponent.propTypes = {
  inputHandler: PropTypes.func,
  type: PropTypes.array,
  name: PropTypes.string,
};
DocumentPickerComponent.defaultProps = {
  inputHandler: () => {},
  type: ['image/png'],
  name: '',
};

export default DocumentPickerComponent;
