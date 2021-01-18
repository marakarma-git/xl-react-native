import {device_width} from '../constant/config';

export default {
  HybridOuterContainer: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    borderColor: 'lightgray',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  HybridInnerContainer: {
    width: device_width * 0.5 - 40,
    marginBottom: 12,
  },
  TextInputStyle: {
    flex: 1,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
};
