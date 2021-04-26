import React from 'react';
import PropTypes from 'prop-types';
import {Text} from '../index';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';

import styles from '../../style/create.style';

const CustomRadioButtonComponent = (props) => {
  return(
      <View style={[styles.radioButtonContainer, props.style]}>
        <RadioButton
          value={props.radioValue}
          status={props.status}
        />
          <Text style={{ fontSize: 14 }}>{props.label}</Text>
      </View>
  );
}

CustomRadioButtonComponent.propTypes = {
  label: PropTypes.string,
  radioValue: PropTypes.string,
  status: PropTypes.string,
  style: PropTypes.object
};

CustomRadioButtonComponent.defaultProps = {
  label: "",
  radioValue: "",
  status: "unchecked",
  style: {}
}

export default CustomRadioButtonComponent;