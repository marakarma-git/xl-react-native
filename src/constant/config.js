import {Dimensions, Platform} from 'react-native';
const {width: device_width, height: device_height} = Dimensions.get('window');
const is_ios = Platform.OS === 'ios';
const default_header_height = 50;
const border_radius = 7;
const horizontal = 0;
const vertical = 0;
const regular_horizontal_padding = 10;
const title_font_size = 16;
const regular_vertical_padding = 10;
const height_keyboard = 43;
const reguler_font_size = 14;
const defaultHeightCell = 40;
const defaultWidthCell = 150;
const enterpriseParentId = 'a06e38ea-d871-4945-8126-44fab717180a';
export {
  device_height,
  device_width,
  is_ios,
  default_header_height,
  border_radius,
  horizontal,
  vertical,
  height_keyboard,
  reguler_font_size,
  regular_horizontal_padding,
  regular_vertical_padding,
  defaultHeightCell,
  defaultWidthCell,
  title_font_size,
  enterpriseParentId,
};
