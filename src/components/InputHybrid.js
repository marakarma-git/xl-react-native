import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
const InputHybrid = (props) => {
  const {} = props;
  return (
    <View>
      <Text>hai</Text>
    </View>
  );
};
InputHybrid.propTypes = {
  type: PropTypes.oneOf(['TextInput', 'DropDown', 'DateTimePicker']),
};
export default InputHybrid;
