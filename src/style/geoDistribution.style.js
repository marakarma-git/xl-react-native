import {border_radius} from '../constant/config';
import {colors} from '../constant/color';

export default {
  outerContainer: {
    flex: 1,
    backgroundColor: '#E4E2E24D',
  },
  afterOverLay: {
    flex: 1,
    margin: 16,
    padding: 8,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
    marginTop: 12,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: border_radius,
  },
  containerTitle: {
    width: '100%',
    backgroundColor: colors.main_color,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderTopRightRadius: border_radius - 2,
    borderTopLeftRadius: border_radius - 2,
  },
  infoContainerText: {
    flexDirection: 'row',
    width: '100%',
    padding: 8,
  },
  infoButton: {
    marginHorizontal: '20%',
    marginVertical: 8,
    padding: 8,
    borderRadius: border_radius,
    flex: 1,
    backgroundColor: colors.main_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
// {loading === true && (
//   <View style={{position: 'absolute', bottom: 10, right: 10}}>
//     <ActivityIndicator size={24} color={colors.main_color} />
//   </View>
// )}
