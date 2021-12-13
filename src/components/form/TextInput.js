import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import {TextInput} from 'react-native';
import Helper from '../../helpers/helper';

const TextInputComponent = (props) => {
  const {
    inputHandler,
    editable,
    value,
    placeholder,
    name,
    title,
    validation,
    validationType, // soon will develop this feature if necessary
    setValidationError,
  } = props;
  const onChangeHandler = (text) => {
    inputHandler(name, text);
    setValidationError(name, Helper.requiredValidation(title, text));
  };
  return (
    <TextInput
      onChangeText={onChangeHandler}
      style={[
        styles.textInputContainer,
        {backgroundColor: editable ? 'white' : '#e4e7ea'},
      ]}
      value={value}
      editable={editable || false}
      placeholder={placeholder}
    />
  );
};

TextInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setIsTouch: PropTypes.func,
  inputHandler: PropTypes.func,
  value: PropTypes.string,
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
  validation: PropTypes.bool,
  validationType: PropTypes.string,
  setValidationError: PropTypes.func,
};
TextInputComponent.defaultProps = {
  name: '',
  title: '',
  setIsTouch: () => {},
  inputHandler: () => {},
  value: '',
  editable: false,
  placeholder: '',
  validation: false,
  validationType: 'required',
  setValidationError: () => {},
};

export default TextInputComponent;
