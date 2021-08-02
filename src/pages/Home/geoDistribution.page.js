import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {analyticStyle, geoDistributionStyle} from '../../style';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {debounce} from 'lodash/function';
import getGeoProvince, {
  geoDistributionSetDataGeoMarker,
} from '../../redux/action/geo_distribution_filter_action';
import Helper from '../../helpers/helper';
import Loading from '../../components/loading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const defaultLatDelta = {
  longitudeDelta: 50.37650607526302,
  latitudeDelta: 69.40814405209241,
  longitude: 117.71991703659296,
  latitude: -1.6825827274869631,
};
const levelHighOrDeep = 7;

const GeoDistributionPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const [rootOfMap, setRootOfMap] = useState(true);
  const [latDelta, setLatDelta] = useState(defaultLatDelta);
  const [firstRender, setFirstRender] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [infoDetail, setInfoDetail] = useState({
    data_label: [],
    data_dll: {},
  });
  const levelCall = useCallback(
    debounce(({calculateLevel, region}) => {
      setRootOfMap(calculateLevel < levelHighOrDeep);
      setLatDelta(region);
    }, 100),
    [],
  );
  const {
    dataHeader,
    loading,
    errorText,
    appliedFilter,
    generatedParams,
    dataGeoMarker,
    dataGeoMarkerApi,
  } = useSelector((state) => state.geo_distribution_filter_reducer);
  useEffect(() => {
    if (!firstRender) {
      dispatch(getGeoProvince(rootOfMap));
    } else {
      setFirstRender(false);
    }
  }, [generatedParams, dispatch]);
  useEffect(() => {
    if (dataGeoMarkerApi.length > 0) {
      if (rootOfMap) {
        const changeData = Helper.findRedundantObject(
          dataGeoMarkerApi,
          'province',
        );
        dispatch(
          geoDistributionSetDataGeoMarker({
            geoMaker: changeData,
          }),
        );
      }
      if (!rootOfMap) {
        dispatch(
          geoDistributionSetDataGeoMarker({
            geoMaker: dataGeoMarkerApi,
          }),
        );
      }
    }
  }, [dispatch, rootOfMap]);
  const handleToSubscription = () => {
    navigation.navigate('Subscription', {
      navigationFrom: 'GeoDistribution',
      dataNavigation: {
        arrayNavigation: [
          ...dataHeader,
          {
            formIdTo: 'geoLocation-location-params-only-drop-down',
            value: {
              label: infoDetail?.data_dll?.city,
              value: infoDetail?.data_dll?.city,
            },
          },
        ],
      },
    });
  };
  return (
    <HeaderContainer
      navigation={navigation}
      headerTitle={'Geo Distribution'}
      companyLogo={imageBase64}>
      <View style={geoDistributionStyle.outerContainer}>
        <OverlayBackground />
        <View
          style={[geoDistributionStyle.afterOverLay, analyticStyle.container]}>
          <View style={{flex: 1}}>
            <AppliedFilter
              withFilterButton
              onPressFilter={() =>
                navigation.navigate('GeoDistributionFilterPage')
              }
              style={{marginLeft: 0}}
              data={appliedFilter}
              isRemoveDeleteIcon={true}
            />
            {errorText ? (
              <Text>{`Error: ${errorText}`}</Text>
            ) : (
              <React.Fragment />
            )}
            <MapView
              provider={PROVIDER_GOOGLE}
              style={geoDistributionStyle.map}
              onRegionChange={(region) => {
                const calculateLevel =
                  Math.round(
                    Math.log(360 / region.longitudeDelta) / Math.LN2,
                  ) || null;
                levelCall({
                  calculateLevel,
                  region,
                });
              }}
              region={{
                latitude: latDelta?.latitude,
                longitude: latDelta?.longitude,
                latitudeDelta: latDelta?.latitudeDelta,
                longitudeDelta: latDelta?.longitudeDelta,
              }}>
              {dataGeoMarker &&
                !loading &&
                dataGeoMarker.length > 0 &&
                dataGeoMarker.map((value) => {
                  const {latitude, longitude, province, total, city} = value;
                  return (
                    <Marker
                      coordinate={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                      }}
                      title={province}
                      description={`Total Active: ${total}`}
                      onPress={(e) => {
                        const {coordinate} = e.nativeEvent || {};
                        const {
                          latitude: thisLatitude,
                          longitude: thisLongitude,
                        } = coordinate;
                        setShowInfo(true);
                        setLatDelta({
                          longitudeDelta: 3.5,
                          latitudeDelta: 4,
                          longitude: parseFloat(thisLongitude),
                          latitude: parseFloat(thisLatitude),
                        });
                        setInfoDetail((state) => ({
                          ...state,
                          data_label: [
                            {
                              title: 'Province',
                              description: province,
                            },
                            {
                              title: city,
                              description: city,
                            },
                            {
                              title: 'Total Active',
                              description: total,
                            },
                          ],
                          data_dll: value,
                        }));
                      }}
                    />
                  );
                })}
            </MapView>
            {showInfo && (
              <View style={geoDistributionStyle.infoContainer}>
                <View style={geoDistributionStyle.containerTitle}>
                  <Text fontType={'bold'} style={{flex: 1, color: 'white'}}>
                    Detail Info
                  </Text>
                  <MaterialCommunityIcons
                    onPress={() => setShowInfo(false)}
                    name={'close-circle'}
                    size={24}
                    color={'white'}
                  />
                </View>
                {infoDetail.data_label &&
                  infoDetail.data_label.length > 0 &&
                  infoDetail.data_label.map(({title, description}) => {
                    return (
                      <View style={geoDistributionStyle.infoContainerText}>
                        <Text fontType={'bold'} style={{flex: 1}}>
                          {title}
                        </Text>
                        <Text style={{flex: 1}}>{description}</Text>
                      </View>
                    );
                  })}
                <TouchableOpacity
                  onPress={() => handleToSubscription()}
                  style={geoDistributionStyle.infoButton}>
                  <Text fontType={'bold'} style={{color: 'white'}}>
                    Open Subscription
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {loading && <Loading />}
      </View>
    </HeaderContainer>
  );
};

export default GeoDistributionPage;
