import React from 'react-native';
import {device_height, device_width} from '../constant/config';
import {colors} from '../constant/color';
export default {
  container: {
    backgroundColor: 'transparent',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imageSize: {
    width: device_width * 0.5,
    height: device_width * 0.2,
    resizeMode: 'contain',
  },
  imageSizeLandscape: {
    width: device_width * 0.4,
    height: device_width * 0.15,
    resizeMode: 'contain',
  },
  iotImage: {
    resizeMode: 'contain',
  },
  textInputContainer: {
    height: 40,
    fontSize: 14,
    // borderRadius: border_radius,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    paddingLeft: 10,
    marginVertical: 10,
    color: '#707070',
  },
  textInputContainerLandscape: {
    height: 35,
    fontSize: 10,
    // borderRadius: border_radius,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    paddingLeft: 10,
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
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  normalText: {
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 5,
  },
  linkText: {
    fontSize: 11,
    color: '#20A8D8',
    textAlign: 'center',
    paddingVertical: 5,
  },
  footer: {
    width: device_width,
    position: 'relative',
    alignItems: 'center',
  },
  keyboardContainer: {
    height: device_height - 100,
  },
  keyboardContainerLandscape: {
    height: 350,
  },
  footerTitleVersion: {
    position: 'absolute',
    top: device_height - 20,
  },
  forgetPasswordForm: {
    height: device_height * 0.75,
    alignItems: 'center',
    marginTop: 10,
  },
  loginContainer: {
    width: '85%',
    marginHorizontal: '7.5%',
    marginTop: 10,
    borderWidth: 0.8,
    paddingVertical: 10,
    borderColor: '#8D8D8D',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginContainerHeader: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    width: '90%',
    paddingVertical: 5,
  },
  buttonBlock: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#002DBB'
  },
  buttonBlockLandscape: {
    width: '90%',
    height: 35,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002DBB'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  loginSettingWrapper: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginSetting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#707070',
  },
  loginDesc: {
    color: 'black',
    fontWeight: 'bold',
  },
  labelLoading: {
    color: 'black',
    fontSize: 14,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  tcText: {
    fontSize: 12, 
    position: 'relative', 
    top: 3, 
    color: '#949494'
  },
  tcBox: {
    width: '80%',
    paddingVertical: 15,
    borderWidth: 0.8,
    borderColor: '#8D8D8D',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  buttonContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonCancel: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderWidth: 1,
    borderColor: '#8D8D8D',
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 3
  },
  buttonNext: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 5,
    backgroundColor: colors.button_color_one,
    marginHorizontal: 3
  },
  containerDropDown: {
    width: 200, 
    color: "#707070",
    borderRadius: 0,
    zIndex: 5000
  },
  dropDownStyle: {
    height: 30,
    width: 230, 
    borderRadius: 0, 
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#707070',
    color: "#707070",
  }
};
