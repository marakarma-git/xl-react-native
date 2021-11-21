import {
  device_width,
  device_height,
  regular_horizontal_padding,
} from '../constant/config';
import {colors} from '../constant/color';
import Orientation from '../helpers/orientation';
export default {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: regular_horizontal_padding,
    width: '100%',
    height: 60,
    backgroundColor: colors.main_color,
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
    height: 100,
    backgroundColor: colors.main_color_overlay,
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
    width: Orientation.getWidth() - 50,
    height: Orientation.getHeight() - 350,
    resizeMode: 'contain',
  },
  imageCellItemLandscape: {
    width: Orientation.getWidth() - 50,
    height: Orientation.getHeight() - 50,
    resizeMode: 'contain',
  },
  //end of don't know why
  notificationContainer: {
    flex: 1,
    backgroundColor: 'white',
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
    marginVertical: 5,
    marginHorizontal: '3%',
    borderWidth: 0.8,
    borderColor: '#8D8D8D',
  },
  tradeMark: {
    paddingVertical: 2,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 0.3,
    borderTopColor: 'gray',
  },
  cardWrapper: {
    width: '95%',
    backgroundColor: 'white',
    marginTop: 20,
    borderColor: '#8D8D8D',
    borderWidth: 0.8,
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
    paddingHorizontal: 10,
  },
  legendIcon: {
    fontSize: 16,
    paddingRight: 5,
  },
  largeText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
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
    flex: 1,
    backgroundColor: colors.main_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutTitle: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 5,
  },
  aboutText: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    fontSize: 14,
  },
  notifCircle: {
    height: 15,
    width: 15,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    backgroundColor: colors.delete,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifText: {
    fontSize: 10,
    color: 'white',
  },
  notifCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  formStepContainer: {
    flex: 1,
  },
  cancelButtonFormStep: {
    paddingVertical: 5,
    width: 100,
    backgroundColor: '#CbC9C9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  navigationButtonFormStep: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    backgroundColor: colors.main_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  formStepHeader: {
    flexDirection: 'row',
  },
  formStepHeaderText: {
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  formStepHeaderTextTitle: {
    fontSize: 18,
    paddingBottom: 5,
  },
  formStepHeaderTextBody: {
    fontSize: 12,
    color: '#707070',
    width: '90%',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    paddingVertical: 5,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#00F',
  },
};
