import {border_radius} from '../constant/config';
import {colors} from '../constant/color';

export default {
  localContainer: {
    elevation: 3,
    marginHorizontal: 16,
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: border_radius,
    marginBottom: 6,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  containerTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray_0,
    borderRadius: border_radius,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  containerWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 40,
    marginRight: 15,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft: 15,
    marginVertical: 5,
    elevation: 3,
    borderRadius: border_radius,
  },
  containerBackground: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerMargin: {
    marginTop: 16,
  },
  containerTextInput2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 1,
    backgroundColor: colors.gray,
    marginHorizontal: 8,
  },
  wrapperMenuOption: {
    marginHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuOption: {
    borderRadius: border_radius,
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
  },
  textOption: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  menuOptionChevronDown: {
    backgroundColor: colors.gray_0,
    borderRadius: border_radius - 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  textMenuTotal: {
    color: colors.font_gray,
    flex: 1,
  },
  headerButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  headerButtonCreate: {
    paddingVertical: 10,
    backgroundColor: '#002DBB',
    width: 150,
    marginTop: 15,
  },
  headerButtonCreateText: {
    color: 'white',
    textAlign: 'center',
  },
  createButton: {
    flex: 1,
    backgroundColor: colors.button_color_one,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginRight: 8,
    borderRadius: border_radius,
  },
  wrapperMenuOptionTypeTwo: {
    justifyContent: 'space-between',
  },
  onlyForTypeOne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};
