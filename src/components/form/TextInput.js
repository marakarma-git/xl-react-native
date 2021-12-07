import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import {TextInput} from 'react-native';

const TextInputComponent = (props) => {
  const {setIsTouch, inputHandler, editable, value, placeholder, name} = props;
  return (
    <TextInput
      onFocus={() => setIsTouch(true)}
      onChangeText={(text) => inputHandler(name, text)}
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
  setIsTouch: PropTypes.func,
  inputHandler: PropTypes.func,
  value: PropTypes.string,
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
};
TextInputComponent.defaultProps = {
  name: '',
  setIsTouch: () => {},
  inputHandler: () => {},
  value: '',
  editable: false,
  placeholder: '',
};

export default TextInputComponent;
