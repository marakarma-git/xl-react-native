import React from 'react';
import PropTypes from 'prop-types';
import {Text as MyText} from 'react-native';

const Text = (props) => {
  const fontWeight = () => {
    switch (props.fontType) {
      case 'bold':
        return {fontFamily: 'OpenSans-Bold'};
      case 'bold-italic':
        return {fontFamily: 'OpenSans-BoldItalic'};
      case 'extra-bold':
        return {fontFamily: 'OpenSans-ExtraBold'};
      case 'extra-bold-italic':
        return {fontFamily: 'OpenSans-ExtraBoldItalic'};
      case 'italic':
        return {fontFamily: 'OpenSans-Italic'};
      case 'light':
        return {fontFamily: 'OpenSans-Light'};
      case 'light-italic':
        return {fontFamily: 'OpenSans-LightItalic'};
      case 'regular':
        return {fontFamily: 'OpenSans-Regular'};
      case 'semi-bold':
        return {fontFamily: 'OpenSans-SemiBold'};
      case 'semi-bold-italic':
        return {fontFamily: 'OpenSans-SemiBoldItalic'};
      default:
        return {fontFamily: 'OpenSans-Regular'};
    }
  };

  return (
    <MyText
      style={[props.style, fontWeight()]}
      ellipsizeMode="tail"
      numberOfLines={1}
      {...props}>
      {props.children}
    </MyText>
  );
};

Text.propTypes = {
  style: PropTypes.object,
  fontType: PropTypes.oneOf([
    'bold',
    'bold-italic',
    'extra-bold',
    'extra-bold-italic',
    'italic',
    'light',
    'light-italic',
    'regular',
    'semi-bold',
    'semi-bold-italic',
  ]),
  children: PropTypes.element.isRequired,
};

export default Text;
