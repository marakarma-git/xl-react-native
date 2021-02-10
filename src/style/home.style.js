import { device_width, device_height, regular_horizontal_padding } from '../constant/config';
import { colors } from '../constant/color';
import Orientation from '../helpers/orientation';
export default {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: regular_horizontal_padding,
    width: '100%',
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
    width: '100%',
    height: 60,
    backgroundColor: 'white',
  },
  navbarButton: {
    width: device_width * 0.05,
    height: '100%',
    resizeMode: 'center',
  },
  navbarCompanyImage: {
    width: device_width * 0.2,
    height: '80%',
    resizeMode: 'contain',
    paddingVertical: 4,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
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
  //don't know why but this kind of apporachment not work
  imageCellItemPotrait: { 
    width: Orientation.getWidth()- 50, 
    height:Orientation.getHeight() - 350,
    resizeMode: 'contain'
  },
  imageCellItemLandscape: {
    width: Orientation.getWidth()-50, 
    height:Orientation.getHeight()-50,
    resizeMode: 'contain'
  },
  //end of don't know why
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
    marginTop: 30,
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
    borderColor: 'white',
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
  legendContainer: {
    width: '90%',
    height: 30,
    backgroundColor: 'white',
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  legendIcon: {
    fontSize: 16,
    paddingRight: 5
  },
  largeText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  textInput: {
    height: device_height * 0.05,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    color: '#707070',
  },
  carouselWrapper: {
<<<<<<< HEAD
    flex: 1,
    // height: device_height - 100,
=======
>>>>>>> deb6c94cc8d57553847cfb7b563455489ddd7a0a
    backgroundColor: '#002DBB',
    alignItems: 'center',
    justifyContent: 'center',
  }
};
