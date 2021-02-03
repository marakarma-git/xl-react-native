import {colors} from '../constant/color';
import {border_radius} from '../constant/config';

export default {
  tableFooterWrapper: {
    marginHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
    paddingRight: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontColor: {
    color: colors.font_gray,
  },
  pageOptionWrapper: {
    flexDirection: 'row',
    paddingLeft: 6,
    borderRadius: border_radius,
    borderWidth: 1,
    borderColor: colors.gray_0,
  },
  textInputPaging: {
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: colors.gray_0,
    paddingHorizontal: 8,
  },
};
