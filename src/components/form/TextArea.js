import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import {TextInput} from 'react-native';

const TextAreaInputComponent = (props) => {
  const {setIsTouch, inputHandler, editable, value, placeholder, name} = props;
  return (
    <TextInput
      onFocus={() => setIsTouch(true)}
      onChangeText={(text) => inputHandler(name, text)}
      style={[
        styles.textInputContainer,
        {
          backgroundColor: editable ? 'white' : '#e4e7ea',
          height: 80,
          textAlignVertical: 'top',
        },
      ]}
      value={value}
      numberOfLines={3}
      editable={editable || false}
      placeholder={placeholder}
    />
  );
};

TextAreaInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  setIsTouch: PropTypes.func,
  inputHandler: PropTypes.func,
  value: PropTypes.string,
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
};
TextAreaInputComponent.defaultProps = {
  name: '',
  setIsTouch: () => {},
  inputHandler: () => {},
  value: '',
  editable: false,
  placeholder: '',
};

export default TextAreaInputComponent;
