import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import {View, Image} from 'react-native';

const ImagePreviewComponent = (props) => {
  const {image, bgColor} = props;
  return (
    <View style={[styles.imagePreviewContainer, {backgroundColor: bgColor}]}>
      <Image
        style={styles.imagePreview}
        source={{
          uri: `data:image/png;base64,${image}`,
        }}
      />
    </View>
  );
};

ImagePreviewComponent.defaultProps = {
  image: null,
  bgColor: '#fff',
};
ImagePreviewComponent.propTypes = {
  image: PropTypes.string,
  bgColor: PropTypes.string,
};

export default ImagePreviewComponent;
