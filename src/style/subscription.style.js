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
  },
  containerTextInput: {
    borderWidth: 1,
    borderColor: colors.gray_0,
    borderRadius: border_radius,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
};
