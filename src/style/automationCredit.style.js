import {colors} from '../constant/color';

export default {
  containerFooter: {
    flex: 1,
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperOneLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginTop: 12,
  },
  wrapperTwoContainer: {
    marginHorizontal: 0,
    borderWidth: 0,
    marginTop: 10,
  },
  wrapperTwoInnerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.disabled_table,
    paddingHorizontal: '3%',
    paddingVertical: 6,
    alignItems: 'center',
  },
  wrapperTitle: {
    fontSize: 14,
    color: 'black',
    marginLeft: 8,
  },
};
