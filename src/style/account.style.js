import {colors} from '../constant/color';
export default {
  avatarContainer: {
    width: 152,
    height: 152,
    borderRadius: 100,
    backgroundColor: '#B4B4B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    bottom: -5,
    color: '#707070',
  },
  editIconCard: {
    position: 'relative',
    top: 3,
    color: '#707070',
  },
  accountPlaceholder: {
    flexDirection: 'row',
    width: '70%',
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 18,
    color: '#707070',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  usernameText: {
    fontSize: 14,
    color: colors.main_color_overlay,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  basicContainer: {
    flexDirection: 'row',
    width: '90%',
    minHeight: 200,
    paddingBottom: 10,
  },
  cardTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },
  formContainer: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
  },
  formGroup: {
    width: '90%',
    paddingVertical: 5,
  },
  label: {
    fontSize: 12,
    color: '#707070',
  },
  textInputContainer: {
    height: 40,
    fontSize: 12,
    // borderRadius: border_radius,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    color: '#707070',
  },
  linkText: {
    fontSize: 14,
    color: colors.main_color,
    paddingHorizontal: 15,
  },
  footer: {
    width: '90%',
    alignItems: 'flex-end',
    marginVertical: 15,
  },
  logoutButton: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#707070',
  },
  blockButton: {
    width: 100,
    backgroundColor: colors.main_color,
    borderRadius: 5,
    height: 35,
    marginLeft: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordRulesContainer: {
    width: '90%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginVertical: 20,
  },
  passwordInputWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 40,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    marginVertical: 10,
    color: '#707070',
    justifyContent: 'space-between',
  },
  passwordInput: {
    width: '80%',
    height: '100%',
    paddingLeft: 10,
  },
  buttonShowHide: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    width: 150,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBlock: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerText: {
    textAlign: 'left',
    width: '90%',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  documentPickerContainer: {
    height: 40,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
  },
  buttonPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    height: '100%',
    backgroundColor: colors.main_color,
    borderRadiusTopLeft: 5,
    borderRadiusBottomLeft: 5,
  },
  buttonPickerText: {
    fontSize: 12,
    color: 'white',
  },
  pickerPlaceholderContainer: {
    width: '65%',
    height: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  pickerPlaceholderText: {
    fontSize: 12,
    color: '#707070',
  },
};
