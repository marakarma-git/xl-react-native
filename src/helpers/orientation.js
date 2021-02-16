import {Dimensions, PixelRatio} from 'react-native';

// Font Scaling
const {width: SCREEN_WIDTH} = Dimensions.get('window');

class Orientation {
  /**
   * Returns true if the screen is in portrait mode
   */
  static isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  /**
   * Returns true of the screen is in landscape mode
   */
  static isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  };

  static getWidth = () => {
    return Dimensions.get('window').width;
  };

  static getHeight = () => {
    return Dimensions.get('window').height;
  };
}

export default Orientation;
