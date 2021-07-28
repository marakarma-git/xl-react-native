import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import {analyticStyle} from '../../style';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {debounce} from 'lodash/function';
import {colors} from '../../constant/color';
import getGeoProvince from '../../redux/action/geo_distribution_filter_action';

const GeoDistributionPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const [levelMap, setLevelMap] = useState(3);
  const [latDelta, setLatDelta] = useState({
    longitudeDelta: 50.37650607526302,
    latitudeDelta: 69.40814405209241,
    longitude: 117.71991703659296,
    latitude: -1.6825827274869631,
  });
  const [firstRender, setFirstRender] = useState(true);
  const levelCall = useCallback(
    debounce(({calculateLevel, region}) => {
      if (calculateLevel !== levelMap) {
        setLevelMap(calculateLevel);
        setLatDelta(region);
      }
    }, 500),
    [],
  );
  const {
    dataHeader,
    loading,
    errorText,
    appliedFilter,
    generatedParams,
  } = useSelector((state) => state.geo_distribution_filter_reducer);

  useEffect(() => {
    if (!firstRender) {
      dispatch(getGeoProvince());
    } else {
      setFirstRender(false);
    }
  }, [generatedParams]);

  const handleToSubscription = () => {
    navigation.navigate('Subscription', {
      navigationFrom: 'GeoDistribution',
      dataNavigation: {
        arrayNavigation: dataHeader,
      },
    });
  };
  console.log('render: geoDistribution.js');
  return (
    <HeaderContainer
      navigation={navigation}
      headerTitle={'Geo Distribution'}
      companyLogo={imageBase64}>
      <View style={{flex: 1, backgroundColor: '#E4E2E24D'}}>
        <OverlayBackground />
        <View
          style={[
            {flex: 1, margin: 16, padding: 8, backgroundColor: 'white'},
            analyticStyle.container,
          ]}>
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
              style={{flex: 1, marginTop: 12}}
              onRegionChange={(region) => {
                console.log('test push');
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
              <Marker
                coordinate={{
                  latitude: -6.000000019900122,
                  longitude: 105.999999884516,
                }}
                title={'title'}
                description={'description'}
                onPress={() => alert('hai there')}
              />
            </MapView>
            {loading === true && (
              <View style={{position: 'absolute', bottom: 10, right: 10}}>
                <ActivityIndicator size={24} color={colors.button_color_one} />
              </View>
            )}
          </View>
        </View>
      </View>
    </HeaderContainer>
  );
};

export default GeoDistributionPage;
