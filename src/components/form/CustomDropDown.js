import React from 'react';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../style/login.style';

const CustomDropDownPicker = (props) => {
  return (
    <DropDownPicker
      textStyle={{fontSize: 10, width: 180}}
      dropDownDirection="BOTTOM"
      style={[styles.toolbarDropDown, {width: props.width}]}
      dropDownContainerStyle={styles.containerDropDown}
      customItemContainerStyle={{height: 30}}
      open={props.open}
      value={props.value}
      items={props.items}
      setOpen={props.setOpen}
      setValue={props.setValue}
      setItems={props.setItems}
      badgeColors="#707070"
    />
  );
};

CustomDropDownPicker.propTypes = {
  open: PropTypes.bool,
  width: PropTypes.number,
  value: PropTypes.string,
  items: PropTypes.array,
  setOpen: PropTypes.func,
  setValue: PropTypes.func,
  setItems: PropTypes.func,
};
CustomDropDownPicker.defaultProps = {
  open: false,
  width: 100,
  value: '',
  items: [],
  setOpen: () => {},
  setValue: () => {},
  setItems: () => {},
};

export default CustomDropDownPicker;
