import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import {TextInput, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../constant/color';

const TextSearchComponent = (props) => {
  const {inputHandler, value, placeholder, name, editable, onSubmit} = props;
  const [keyword, setKeyword] = useState('');
  const onChangeHandler = (text) => {
    inputHandler(name, text);
    setKeyword(text);
  };
  return (
    <View style={styles.textSearchContainer}>
      <View style={styles.textSearchIconContainer}>
        <FontAwesome5Icon name="search" color={colors.gray_400} size={18} />
      </View>
      <View style={{flex: 1}}>
        <TextInput
          onSubmitEditing={() => onSubmit(value)}
          onChangeText={onChangeHandler}
          style={[styles.textSearchInputContainer]}
          value={keyword}
          editable={editable || false}
          placeholder={placeholder}
          defaultValue={''}
        />
      </View>
    </View>
  );
};

TextSearchComponent.propTypes = {
  name: PropTypes.string.isRequired,
  inputHandler: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  editable: PropTypes.bool,
  onSubmit: PropTypes.func,
};
TextSearchComponent.defaultProps = {
  name: '',
  inputHandler: () => {},
  value: '',
  placeholder: '',
  editable: true,
  onSubmit: () => {},
};

export default TextSearchComponent;
