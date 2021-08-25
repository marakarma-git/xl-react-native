import {border_radius, device_height, device_width} from '../constant/config';
import {colors} from '../constant/color';

export default {
  containerInput: {
    width: device_width * 0.41,
    marginBottom: 15,
  },
  innerContainerInput: {
    borderWidth: 1,
    borderColor: colors.gray_0,
    borderRadius: border_radius,
    marginTop: 5,
    paddingHorizontal: 8,
    height: device_height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputStyle: {
    padding: 5,
    flex: 1,
  },
  disableInput: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.gray_300,
    borderRadius: border_radius - 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  titleInput: {
    color: colors.gray_0,
  },
  subSelect: {
    height: '100%',
    flexDirection: 'row',
    borderLeftWidth: 1,
    alignItems: 'center',
    borderColor: colors.gray,
    borderTopLeftRadius: border_radius,
    borderBottomLeftRadius: border_radius,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  modalContainer: {
    marginHorizontal: 32,
    marginVertical: 64,
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: border_radius,
    elevation: 4,
  },
  customModalContainer: {
    marginTop: 200,
    marginHorizontal: 32,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: border_radius,
    elevation: 4,
  },
  multiSessionModal: {
    width: '80%',
    backgroundColor: 'white',
    elevation: 4,
  },
  newModalContainer: {
    width: '80%',
    height: '55%',
    backgroundColor: 'white',
    elevation: 4,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  additionalTitleContainer: {
    backgroundColor: colors.button_color_one,
    borderTopLeftRadius: border_radius,
    borderTopRightRadius: border_radius,
    marginBottom: 0,
    padding: 12,
  },
  tcTitleContainer: {
    backgroundColor: colors.button_color_one,
    marginBottom: 0,
    padding: 12,
  },
  modalTitleText: {
    fontWeight: 'bold',
    color: colors.gray,
    fontSize: 18,
  },
  modalTextInputContainer: {
    borderBottomWidth: 1,
    borderRadius: border_radius,
    borderColor: colors.gray_border_input,
    paddingHorizontal: 10,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalItem: {
    paddingHorizontal: 7,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
    borderRadius: border_radius,
    margin: 4,
    elevation: 3,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  contentWrapper: {
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  tcText: {
    fontSize: 14,
    // letterSpacing: 1,
    // fontFamily: 'segoeui',
  },
  linkText: {
    fontSize: 14,
    color: '#20A8D8',
    textAlign: 'center',
    paddingVertical: 5,
    // fontFamily: 'segoeui',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancel: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderWidth: 1,
    borderColor: '#8D8D8D',
    backgroundColor: 'white',
    marginHorizontal: 3,
  },
  buttonNext: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    backgroundColor: colors.button_color_one,
    marginHorizontal: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  customStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  customStyleText: {
    width: '15%',
    marginRight: 14,
  },
  customStyleInnerContainer: {
    flex: 1,
  },
  fullWidthInput: {
    width: '100%',
    marginTop: 16,
    marginBottom: 0,
  },
};
