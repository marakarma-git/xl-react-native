import {StyleSheet} from 'react-native';

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
    borderColor: '#8D8D8D',
    borderWidth: 0.8,
    borderRadius: 3,
  },
  cardSection: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: '2%',
    borderWidth: 0.8,
    borderColor: '#8D8D8D',
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
  filterContainer: {
    width: '100%',
    minHeight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterLabelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
  },
  link: {
    paddingHorizontal: 1,
  },
  linkText: {
    fontSize: 14,
    color: '#20A8D8',
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
    backgroundColor: '#002DBB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default styles;
