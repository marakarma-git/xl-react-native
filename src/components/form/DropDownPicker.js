import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownPickerComponent = (props) => {
  const {editable, setValue, options, searchable, value, placeholder} = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropDownPicker
      mode="BADGE"
      disabled={editable}
      setValue={setValue}
      open={isOpen}
      items={options}
      style={[styles.textInputContainer, {marginBottom: isOpen ? -2 : 10}]}
      dropDownDirection="TOP"
      dropDownContainerStyle={{borderRadius: 3}}
      searchable={searchable}
      setOpen={() => setIsOpen(!isOpen)}
      value={value}
      placeholder={placeholder}
      placeholderStyle={{
        color: '#A8A8A8',
      }}
    />
  );
};

DropDownPickerComponent.propTypes = {
  disabled: PropTypes.bool,
  setValue: PropTypes.func,
  isOpen: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  searchable: PropTypes.bool,
  setOpen: PropTypes.func,
  value: PropTypes.string,
};
DropDownPickerComponent.defaultProps = {
  disabled: false,
  setValue: () => {},
  isOpen: false,
  options: [],
  searchable: false,
  setOpen: () => {},
  value: '',
};

export default DropDownPickerComponent;
