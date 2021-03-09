import React from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import {inputHybridStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ModalMapOnly = (props) => {
  const {onClose, mapId} = props || {};
  return (
    <Modal animationType="slide" transparent onRequestClose={onClose}>
      <View style={inputHybridStyle.modalBackdrop} />
      <KeyboardAvoidingView
        enabled={false}
        style={[inputHybridStyle.modalContainer, {padding: 0}]}>
        <View
          style={[
            inputHybridStyle.modalTitleContainer,
            inputHybridStyle.additionalTitleContainer,
          ]}>
          <Text
            style={[inputHybridStyle.modalTitleText, {color: 'white'}]}
            numberOfLines={1}>
            MSIDN: {mapId || ''}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons
              name={'close-circle'}
              color={'white'}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={inputHybridStyle.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.07,
              longitudeDelta: 0.001,
            }}>
            <Circle
              strokeColor={'rgba(62, 153, 237, 1)'}
              fillColor={'rgba(62, 153, 237, 0.3)'}
              strokeWidth={3}
              center={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              radius={1500}
            />
          </MapView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
ModalMapOnly.propTypes = {
  onClose: PropTypes.bool,
  mapId: PropTypes.string,
};
ModalMapOnly.defaultProps = {
  onClose: () => {},
};
export default ModalMapOnly;
