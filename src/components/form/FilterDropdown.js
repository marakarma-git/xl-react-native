import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/usageAnalytics.style';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Text} from '../index';
import {TouchableOpacity} from 'react-native';

const FilterDropdown = (props) => {
  const {setShowToggle, dropdownText, dropDownTitle} = props;
  return (
    <TouchableOpacity
      style={styles.dropdownPicker}
      onPress={() => setShowToggle(true)}>
      <Text style={styles.dropdownPickerText}>
        {dropDownTitle}:{' '}
        {dropdownText.length > 15
          ? `${dropdownText.substring(0, 15)}...`
          : dropdownText}
        &nbsp;&nbsp;
        <AntDesign name="caretdown" size={12} />
      </Text>
    </TouchableOpacity>
  );
};

FilterDropdown.defaultProps = {
  setShowToggle: () => {},
  dropdownText: '',
  dropDownTitle: 'Picker Title',
};
FilterDropdown.propTypes = {
  setShowToggle: PropTypes.func,
  dropdownText: PropTypes.string,
  dropDownTitle: PropTypes.string,
};

export default FilterDropdown;
