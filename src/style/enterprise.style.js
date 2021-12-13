import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  textDescription: {
    fontSize: 12,
    color: '#707070',
    width: '95%',
    marginVertical: 5,
    marginHorizontal: '2.5%',
  },
});

export default styles;
