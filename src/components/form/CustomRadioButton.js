import React from 'react';
import PropTypes from 'prop-types';
import {Text} from '../index';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';

import styles from '../../style/create.style';
import {colors} from '../../constant/color';

const CustomRadioButtonComponent = (props) => {
  const {color, fontType, disabled} = props || {};
  return (
    <View style={[styles.radioButtonContainer, props.style]}>
      <RadioButton
        disabled={disabled}
        color={color || colors.tab_edit}
        onPress={() => props.onPressRadio(props)}
        value={props.radioValue}
        status={props.status}
      />
      <Text style={{fontSize: 14}} fontType={fontType || ''}>
        {props.label}
      </Text>
    </View>
  );
};

CustomRadioButtonComponent.propTypes = {
  label: PropTypes.string,
  radioValue: PropTypes.string,
  status: PropTypes.string,
  style: PropTypes.object,
  onPressRadio: PropTypes.func,
  disabled: PropTypes.bool,
};

CustomRadioButtonComponent.defaultProps = {
  label: '',
  radioValue: '',
  status: 'unchecked',
  style: {},
  onPressRadio: () => {},
};

export default CustomRadioButtonComponent;
