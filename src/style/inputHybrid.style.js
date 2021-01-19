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
    backgroundColor: 'black',
    borderRadius: border_radius - 1,
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalTitleText: {
    fontWeight: 'bold',
    color: colors.gray,
    fontSize: 18,
  },
  modalTextInputContainer: {
    borderWidth: 1,
    borderRadius: border_radius,
    borderColor: colors.gray,
    paddingHorizontal: 10,
    marginBottom: 7,
  },
  modalItem: {
    paddingHorizontal: 7,
    paddingVertical: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
};
