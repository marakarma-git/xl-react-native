import {device_width, regular_horizontal_padding} from '../constant/config';
import {colors} from '../constant/color';

export default {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: regular_horizontal_padding,
    width: device_width,
    height: 60,
    backgroundColor: colors.button_color_one,
  },
  headerImage: {
    width: device_width * 0.38,
    resizeMode: 'contain',
  },
  headerButton: {
    width: device_width * 0.1,
    resizeMode: 'contain',
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: regular_horizontal_padding * 2,
    width: device_width,
    height: 60,
    backgroundColor: 'white',
  },
  navbarButton: {
    width: device_width * 0.05,
    resizeMode: 'contain',
  },
  navbarCompanyImage: {
    width: device_width * 0.2,
    height: '80%',
    resizeMode: 'contain',
    paddingVertical: 4,
  },
  overlayContainer: {
    width: device_width,
    height: 100,
    backgroundColor: colors.background_overlay,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'black',
  },
  cellItem: {
    borderRadius: 5,
    margin: 0,
    padding: 0,
  },
  imageCellItem: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 2,
    paddingHorizontal: 20,
  },
  cardSection: {
    flex: 1,
    top: -80,
    margin: 10,
  },
  tradeMark: {
    paddingVertical: 2,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 0.3,
    borderTopColor: 'gray',
  },
  cardContentWrapper: {
    marginBottom: 10,
    paddingVertical: 10,
  },
  cardContentRow: {
    flex: 1,
    justifyContent: 'space-around',
  },
  itemSeparatorCard: {
    alignItems: 'center',
    flex: 1,
    borderColor: 'gray',
  },
  containerPie: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  aggregateList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
};
