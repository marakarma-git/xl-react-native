import React from 'react-native';
import {
  border_radius,
  device_width,
  height_keyboard,
  reguler_font_size,
} from '../constant/config';
import {colors} from '../constant/color';
export default {
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageSize: {
    width: device_width * 0.6,
    height: device_width * 0.2,
  },
  textInputContainer: {
    height: height_keyboard,
    fontSize: reguler_font_size,
    borderRadius: border_radius,
    borderWidth: 1,
    borderColor: colors.border_color,
    backgroundColor: colors.background_color,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: colors.button_color_one,
    borderRadius: 5,
    height: 45,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
};
