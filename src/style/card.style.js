import {colors} from '../constant/color';
import {title_font_size} from '../constant/config';

export default {
  containerRule: {
    flex: 1,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: colors.gray_0,
  },
  containerHeaderRule: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: title_font_size,
    color: 'white',
    marginVertical: 10,
  },
};
