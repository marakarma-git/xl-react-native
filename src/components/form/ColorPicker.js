import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import {View, TouchableOpacity, TextInput, Touchable} from 'react-native';
import {ModalColorPallete} from '..';

const ColorPickerComponent = (props) => {
  const {value, inputHandler, name} = props;
  const [showColorPallet, setShowColorPallete] = useState(false);
  const setCurrentColor = (color) => {
    inputHandler(name, color);
  };
  return (
    <View style={styles.colorPickerContainer}>
      <TextInput
        onChangeText={(text) => setCurrentColor(text)}
        style={styles.textInputColorPicker}
        value={value}
      />
      <TouchableOpacity
        onPress={() => setShowColorPallete(true)}
        style={styles.buttonColorPicker}>
        <View
          style={[styles.buttonColorPreview, {backgroundColor: value}]}></View>
      </TouchableOpacity>
      {showColorPallet && (
        <ModalColorPallete
          currentColor={value}
          setCurrentColor={setCurrentColor}
          showModal={showColorPallet}
          closeModal={() => setShowColorPallete(false)}
          title="Color Picker"
        />
      )}
    </View>
  );
};

ColorPickerComponent.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  inputHandler: PropTypes.func,
};
ColorPickerComponent.defaultProps = {
  value: '#fff',
  name: '',
  inputHandler: () => {},
};

export default ColorPickerComponent;
