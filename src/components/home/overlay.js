import React from 'react';
import {View} from 'react-native';
import {homeStyle} from '../../style/index';

const OverlayComponent = ({ height = 100 }) => <View style={[homeStyle.overlayContainer, { height }]} />;

export default OverlayComponent;
