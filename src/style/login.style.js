import React from 'react-native';
import {
  border_radius,
  device_height,
  device_width,
  height_keyboard,
  reguler_font_size,
} from '../constant/config';
import { colors } from '../constant/color';
export default {
  container: {
    backgroundColor: 'transparent'
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  imageSize: {
    width: device_width * 0.5,
    height: device_width * 0.2,
    resizeMode: 'contain'
  },
  iotImage: {
    width: '100%',
    resizeMode: 'contain'
  },
  textInputContainer: {
    height: 40,
    fontSize: 14,
    // borderRadius: border_radius,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    color: '#707070',
  },
  loginButton: {
    width: '90%',
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
    paddingHorizontal: 20
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
  },
  footerTitleVersion: {
    position: 'absolute',
    top: device_height - 20
  },
  forgetPasswordForm: {
    height: device_height * 0.75,
    alignItems: 'center',
    marginTop: 10
  },
  loginContainer: {
    width: '85%',
    marginHorizontal: '7.5%',
    marginTop: 20,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  loginContainerHeader: { 
    width: '80%', 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 10 
  },
  formGroup: {
    width: '90%',
    paddingVertical: 5,
  },
  buttonBlock: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  loginSettingWrapper: { 
    flexDirection: 'row', 
    width: '90%', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  loginSetting: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  label: {
    fontSize: 12,
    color: '#707070',
  },
};
