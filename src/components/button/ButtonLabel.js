import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text} from '../index';
import {colors} from '../../constant/color';
import {subscriptionStyle} from '../../style';

const ButtonLabelComponent = (props) => {
  const {
    buttonText,
    buttonColor,
    textColor,
    buttonStyle,
    buttonWidth,
    textStyle,
    buttonAction,
    isLoading,
    total,
    filtered,
    selected,
    typeTwo,
  } = props;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {(total || filtered || selected) && (
        <Text
          fontType={'bold'}
          style={[
            subscriptionStyle.textMenuTotal,
            {marginTop: typeTwo ? 6 : 0, marginLeft: typeTwo ? 0 : 12},
          ]}>
          {`${total ? `Total: ${total}` : ''} ${
            filtered ? `| Filtered: ${filtered}` : ''
          } ${selected ? `| Selected: ${selected}` : ''}`}
        </Text>
      )}
      <TouchableOpacity
        disabled={isLoading}
        style={[
          styles.button,
          {...buttonStyle},
          {
            backgroundColor: isLoading ? colors.gray_200 : buttonColor,
            width: buttonWidth,
            height: 30,
          },
        ]}
        onPress={buttonAction}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.main_color} />
        ) : (
          <Text
            fontType="bold"
            style={[styles.text, {...textStyle}, {color: textColor}]}>
            {buttonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

ButtonLabelComponent.propTypes = {
  buttonText: PropTypes.string,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  buttonStyle: PropTypes.object,
  buttonWidth: PropTypes.number,
  textStyle: PropTypes.object,
  buttonAction: PropTypes.func,
  isLoading: PropTypes.bool,
  total: PropTypes.string,
  filtered: PropTypes.string,
};
ButtonLabelComponent.defaultProps = {
  buttonText: 'Label',
  buttonColor: colors.main_color,
  textColor: 'white',
  buttonStyle: {},
  buttonWidth: 100,
  textStyle: {},
  buttonAction: () => {},
  isLoading: false,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
});

export default ButtonLabelComponent;
