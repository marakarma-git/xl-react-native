import {StyleSheet} from 'react-native';
import {colors, color_theme_one} from '../constant/color';

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 130,
  },
  cardContainer: {
    height: '100%',
    alignItems: 'center',
  },
  cardWrapper: {
    width: '95%',
    backgroundColor: 'white',
    marginTop: 20,
    borderColor: colors.card_border,
    borderWidth: 0.8,
    borderRadius: 3,
  },
  cardSection: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: '2%',
    borderWidth: 0.8,
    borderColor: colors.card_border,
  },
  cardContentWrapper: {
    marginBottom: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    width: '100%',
    height: 30,
  },
  dropdownPicker: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 20,
    marginRight: 5,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterContainer: {
    width: '100%',
    minHeight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterLabelContainer: {
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'space-around',
  },
  link: {
    paddingHorizontal: 1,
  },
  linkText: {
    fontSize: 14,
    color: color_theme_one.cyan,
  },
  dropdownPickerText: {
    fontSize: 12,
    color: 'black',
  },
  filterText: {
    paddingHorizontal: 3,
  },
  cardTitleText: {
    fontSize: 12,
    color: 'black',
  },
  monthText: {
    fontSize: 12,
    color: '#0266ff',
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
  navigationButtonFormStep: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginHorizontal: 3,
    backgroundColor: colors.main_color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '95%',
    borderColor: colors.gray,
    borderRadius: 3,
    borderWidth: 1,
    height: 60,
  },
  detailLeftWrapper: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  detailRightWrapper: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
  },
  detailChartTitle: {
    fontSize: 12,
  },
  detailChartText: {
    fontSize: 11,
  },
  buttonDaily: {
    backgroundColor: colors.gray,
    height: 30,
    paddingHorizontal: 2,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
  },
  customChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: 30,
  },
  legendWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescriptionText: {
    fontSize: 12,
    color: colors.gray,
    marginRight: 10,
    marginLeft: 10,
  },
  customTable: {
    width: '95%',
    marginHorizontal: '2.5%',
    borderWidth: 1,
    borderColor: '#A8A8A8',
  },
});

export default styles;
