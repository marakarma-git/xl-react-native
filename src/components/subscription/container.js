import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {subscriptionStyle} from '../../style';
const Container = (props) => {
  const {style, children} = props;
  return (
    <View style={[subscriptionStyle.localContainer, style]}>{children}</View>
  );
};
Container.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
export default Container;
