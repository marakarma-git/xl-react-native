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
import {useDispatch, useSelector} from 'react-redux';
import {authFailed} from '../../redux/action/auth_action';
import {device_width} from '../../constant/config';
import {colors} from '../../constant/color';
const ModalMapOnly = (props) => {
  const dispatch = useDispatch();
  const {onClose, mapData} = props || {};
  const {inventoryId, msisdn, lastActivity, city, province} = mapData || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [longLat, setLongLat] = useState({longitude: '0.1', latitude: '0.1'});
  const [mapType, setMapType] = useState('standard');
  const {access_token} = useSelector((state) => state.auth_reducer?.data) || {};
  useEffect(() => {
    setError(false);
    setErrorMessage('');
    setLoading(true);
    axios
      .get(`${base_url}/dcp/sim/getSimLocation?inventoryId=${inventoryId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({data}) => {
        console.log(JSON.stringify(data, null, 2));
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
        // dispatch(authFailed(e.response.data));
      });
  }, [dispatch, mapData]);
  const toggleMapView = (type) => {
    setMapType(type);
  };
  return (
    <Modal animationType="slide" transparent onRequestClose={onClose}>
      <View style={inputHybridStyle.modalBackdrop} />
      <View style={[inputHybridStyle.modalContainer, {padding: 0}]}>
        <View
          style={[
            inputHybridStyle.modalTitleContainer,
            inputHybridStyle.additionalTitleContainer,
          ]}>
          <Text
            style={[inputHybridStyle.modalTitleText, {color: 'white'}]}
            numberOfLines={1}>
            MSISDN: {msisdn || ''}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons
              name={'close-circle'}
              color={'white'}
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            mapType={mapType ?? 'standard'}
            zoomControlEnabled
            region={{
              latitude: parseFloat(longLat.latitude) || 0,
              longitude: parseFloat(longLat.longitude) || 0,
              latitudeDelta: 0.07,
              longitudeDelta: 0.001,
            }}>
            <Circle
              strokeColor={'rgba(62, 153, 237, 1)'}
              fillColor={'rgba(62, 153, 237, 0.3)'}
              strokeWidth={3}
              center={{
                latitude: parseFloat(longLat.latitude) || 0,
                longitude: parseFloat(longLat.longitude) || 0,
                latitudeDelta: 0.07,
                longitudeDelta: 0.001,
              }}
              radius={1500}
            />
          </MapView>
          <View
            style={{
              position: 'absolute',
              top: 20,
              bottom: 0,
              right: 12,
              left: 12,
            }}>
            <View style={styles.info}>
              <TouchableOpacity
                style={[styles.mapBtn, styles.mapBtnContainer]}
                onPress={() => toggleMapView('standard')}>
                <Text style={styles.mapBtnLabel}>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sateliteBtn, styles.sateliteBtnContainer]}
                onPress={() => toggleMapView('satellite')}>
                <Text style={styles.sateliteBtnLabel}>Satelite</Text>
              </TouchableOpacity>
            </View>
          </View>
          {(loading || !!error) && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {loading && !errorMessage && (
                <ActivityIndicator color={colors.main_color} size={'large'} />
              )}
              {!!error && errorMessage && (
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
                    style={[
                      inputHybridStyle.buttonStyle,
                      {flex: 0, paddingHorizontal: '10%'},
                    ]}>
                    <Text style={{color: 'white'}}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
          <View style={styles.additionalInfoMap}>
            <View style={{...styles.info, marginBottom: 8}}>
              <Text style={styles.infoTitle}>Location:</Text>
              <Text>{city && province ? city + ', ' + province : '-'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Last Network Activity:</Text>
              <Text>{lastActivity ?? '-'}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = {
  additionalInfoMap: {
    display: 'flex',
    backgroundColor: colors.white,
    padding: 8,
  },
  info: {
    flexDirection: 'row',
    display: 'flex',
  },
  infoTitle: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  mapBtn: {
    backgroundColor: colors.main_color,
    width: '50%',
  },
  sateliteBtn: {
    width: '50%',
    backgroundColor: colors.white,
  },
  mapBtnLabel: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 6.5,
  },
  sateliteBtnLabel: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 6.5,
  },
  mapBtnContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
  },
  sateliteBtnContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
  },
};
ModalMapOnly.propTypes = {
  onClose: PropTypes.func,
  mapData: PropTypes.object,
};
ModalMapOnly.defaultProps = {
  onClose: () => {},
};
export default ModalMapOnly;
