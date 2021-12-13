import React, {useState} from 'react';
import styles from '../../style/account.style';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import Helper from '../../helpers/helper';
import {useToastHooks} from '../../customHooks/customHooks';

const GridTextInputComponent = (props) => {
  const showToast = useToastHooks();
  const {
    value,
    onChangeText,
    color,
    dataId,
    fontSize,
    isEditable,
    keyName,
    placeholder,
    isRequired,
    setFormValidation,
  } = props;
  const formValidation = (text) => {
    const title = Helper.makeCamelCaseToTitle(keyName);
    const errorValidation = Helper.requiredValidation(title, text);
    if (errorValidation) {
      showToast({
        title: title,
        type: 'error',
        message: errorValidation,
        duration: 3000,
        showToast: true,
        position: 'top',
      });
      setFormValidation((prevState) => [
        ...prevState,
        {errorMsg: errorValidation, id: dataId},
      ]);
    } else {
      setFormValidation((prevState) =>
        [...prevState].filter((error) => error.id !== dataId),
      );
    }
  };
  return (
    <TextInput
      style={[styles.tableTextInput, {fontSize: fontSize, color: color}]}
      onChangeText={(text) => {
        onChangeText(dataId, keyName, text);
        if (isRequired) {
          formValidation(text);
        }
      }}
      editable={isEditable}
      value={value}
      placeholder={isEditable ? placeholder : ''}
    />
  );
};

GridTextInputComponent.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  color: PropTypes.string,
  dataId: PropTypes.string,
  fontSize: PropTypes.number,
  isEditable: PropTypes.bool,
  keyName: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  setFormValidation: PropTypes.func,
};
GridTextInputComponent.defaultProps = {
  value: '',
  onChangeText: () => {},
  color: 'black',
  dataId: '',
  fontSize: 12,
  isEditable: true,
  keyName: '',
  placeholder: '',
  isRequired: false,
  setFormValidation: () => {},
};

export default GridTextInputComponent;
