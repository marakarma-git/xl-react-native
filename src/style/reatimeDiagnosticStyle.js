import {StyleSheet} from 'react-native';
import {colors, color_theme_one} from '../constant/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchCriteriaHeader: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: colors.main_color,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  searchCriteriaContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchCriteriaText: {
    fontSize: 13,
    color: 'white',
  },
  simInformationContainer: {
    width: '95%',
    marginHorizontal: '2.5%',
    marginVertical: 10,
    minHeight: 50,
  },
  listWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  listTitle: {
    fontSize: 12,
  },
  loadBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    elevation: 1,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInformationContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewInformationList: {
    flexDirection: 'row',
    width: '50%',
    paddingVertical: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderBottomColor: colors.card_border,
    borderBottomWidth: 1,
    flexWrap: 'wrap',
  },
  viewInformationListFull: {
    width: '100%',
    justifyContent: 'space-between',
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.card_border,
  },
  viewInformationTitle: {
    fontSize: 12,
    paddingLeft: 5,
  },
  viewInformationIcon: {
    width: 30,
    height: 30,
  },
  viewInformationText: {
    fontSize: 11,
    paddingHorizontal: 5,
  },
  buttonFixContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonFixTextContainer: {
    width: '80%',
  },
  arrowButton: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    height: 30,
    borderWidth: 2,
    borderColor: '#aaa',
  },
  actionText: {
    fontSize: 12,
    paddingLeft: 5,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: '100%',
    borderLeftWidth: 2,
    borderLeftColor: '#aaa',
  },
});

export default styles;
