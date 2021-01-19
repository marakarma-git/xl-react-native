import React from 'react-native';
import {
  border_radius,
  device_height,
  device_width,
  height_keyboard,
  reguler_font_size,
} from '../constant/config';
import {colors} from '../constant/color';
export default {
  container: {
    backgroundColor: 'white'
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  imageSize: {
    width: device_width * 0.6,
    height: device_width * 0.2,
  },
  textInputContainer: {
    height: height_keyboard,
    fontSize: reguler_font_size,
    // borderRadius: border_radius,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_color,
    backgroundColor: 'white',
    paddingLeft: 10,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: colors.button_color_one,
    borderRadius: 5,
    height: 45,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    paddingTop: 10,
  },
  normalText: {
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 5,
  },
  linkText: {
    fontSize: 12,
    color: colors.button_color_one,
    textAlign: 'center',
    paddingVertical: 5,
  },
  footer: {
    width: device_width,
    position: 'relative',
    alignItems: 'center',
  },
  keyboardContainer: {
    height: device_height - 80,
    backgroundColor: 'transparent'
  }
};
