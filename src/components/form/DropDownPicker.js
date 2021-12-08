import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import DropDownPicker from 'react-native-dropdown-picker';
import Helper from '../../helpers/helper';

const DropDownPickerComponent = (props) => {
  const {
    name,
    editable,
    setValue,
    options,
    searchable,
    value,
    placeholder,
    title,
    validation,
    setValidationError,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (validation)
      setValidationError(name, Helper.requiredValidation(title, value));
  }, [value]);
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
  name: PropTypes.string,
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
  title: PropTypes.string,
  validation: PropTypes.bool,
  setValidationError: PropTypes.func,
};
DropDownPickerComponent.defaultProps = {
  name: '',
  disabled: false,
  setValue: () => {},
  isOpen: false,
  options: [],
  searchable: false,
  setOpen: () => {},
  value: '',
  title: '',
  validation: false,
  setValidationError: () => {},
};

export default DropDownPickerComponent;
