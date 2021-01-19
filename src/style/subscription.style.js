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
};
