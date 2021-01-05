import {
  Dimensions,
  Platform
} from 'react-native';
const {
  width: device_width,
  height: device_height
} = Dimensions.get('window')

const api_link = ""
const is_ios = Platform.OS === 'ios'
const default_header_height = 50
const border_radius = 0
const horizontal = 0
const vertical = 0

export{
  device_height,
  device_width,
  api_link,
  is_ios,
  default_header_height,
  border_radius,
  horizontal,
  vertical
}


