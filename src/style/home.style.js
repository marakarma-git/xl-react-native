import {
  border_radius,
  device_width,
  height_keyboard,
  reguler_font_size,
  regular_horizontal_padding,
  regular_vertical_padding
} from '../constant/config';
import {
  colors
} from '../constant/color';


export default {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: regular_horizontal_padding,
    width: device_width,
    height: 60,
    backgroundColor: colors.button_color_one
  },
  headerImage: {
    width: device_width * 0.38,
    resizeMode: 'contain'
  },
  headerButton: {
    width: device_width * 0.1,
    resizeMode: 'contain'
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: regular_horizontal_padding * 2,
    width: device_width,
    height: 60,
    backgroundColor: 'white'
  },
  navbarButton: {
    width: device_width * 0.05,
    resizeMode: 'contain'
  },
  navbarCompanyImage: {
    width: device_width * 0.2,
    resizeMode: 'contain'
  },
  overlayContainer: {
    width: device_width,
    height: 100,
    backgroundColor: colors.background_overlay
  }
}
