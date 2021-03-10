import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import {inputHybridStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {base_url} from '../../constant/connection';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {authFailed} from '../../redux/action/auth_action';
import {device_width} from '../../constant/config';
import {colors} from '../../constant/color';
const ModalMapOnly = (props) => {
  const dispatch = useDispatch();
  const {onClose, mapData} = props || {};
  const {inventoryId, msisdn} = mapData || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [longLat, setLongLat] = useState({longitude: '0', latitude: '0'});
  useEffect(() => {
    axios
      .get(`${base_url}/dcp/sim/getSimLocation?inventoryId=${inventoryId}`)
      .then(({data}) => {
        const {statusCode, statusDescription, result} = data || {};
        if (statusCode === 0) {
          const {longitude, latitude} = result || '0';
          setLongLat({
            longitude: longitude,
            latitude: latitude,
          });
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
          setErrorMessage(statusDescription);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        setErrorMessage(e.message);
        dispatch(authFailed(e.response.data));
      });
  }, [dispatch, inventoryId]);
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
            MSIDN: {msisdn || ''}
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
          {loading ? (
            <ActivityIndicator color={colors.button_color_one} size={'large'} />
          ) : !error ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{flex: 1}}
              region={{
                latitude: parseInt(longLat.latitude),
                longitude: parseInt(longLat.longitude),
                latitudeDelta: 0.07,
                longitudeDelta: 0.001,
              }}>
              <Circle
                strokeColor={'rgba(62, 153, 237, 1)'}
                fillColor={'rgba(62, 153, 237, 0.3)'}
                strokeWidth={3}
                center={{
                  latitude: parseInt(longLat.latitude),
                  longitude: parseInt(longLat.longitude),
                }}
                radius={1500}
              />
            </MapView>
          ) : (
            <>
              <View
                style={{
                  width: device_width * 0.7,
                  height: device_width * 0.7,
                }}>
                <Image
                  source={require('../../assets/images/404/location-not-found.png')}
                  style={{
                    flex: 1,
                    resizeMode: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
              <Text style={{fontWeight: 'bold'}}>
                Sorry, the location could not be displayed
              </Text>
              <Text style={{marginVertical: 4}}>{errorMessage}</Text>
              <TouchableOpacity
                onPress={onClose}
                style={inputHybridStyle.buttonStyle}>
                <Text style={{color: 'white'}}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
ModalMapOnly.propTypes = {
  onClose: PropTypes.bool,
  mapData: PropTypes.objectOf({
    msisdn: PropTypes.string,
    inventoryId: PropTypes.string,
  }),
};
ModalMapOnly.defaultProps = {
  onClose: () => {},
};
export default ModalMapOnly;
