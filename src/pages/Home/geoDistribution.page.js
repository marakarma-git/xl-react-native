import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {HeaderContainer, OverlayBackground} from '../../components';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import {analyticStyle} from '../../style';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {debounce} from 'lodash/function';
import {colors} from '../../constant/color';

const GeoDistributionPage = () => {
  const navigation = useNavigation();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const [levelMap, setLevelMap] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const levelCall = useCallback(
    debounce((v) => {
      if (v !== levelMap) {
        setLevelMap(v);
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    if (!firstRender) {
      // call fetch api from the enterprise parameter
    } else {
      setFirstRender(false);
    }
  }, []);
  useEffect(() => {
    // this useEffect for only tracking changes on map level
  }, [levelMap]);

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
              data={[{config: {label: 'hai'}, value: 'abcasdasdsad'}]}
              // onDelete={(e) => {}}
            />
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{flex: 1, marginTop: 12}}
              onRegionChange={(region) => {
                const calculateLevel =
                  Math.round(
                    Math.log(360 / region.longitudeDelta) / Math.LN2,
                  ) || null;
                levelCall(calculateLevel);
              }}
              region={{
                latitude: -6.000000019900122,
                longitude: 105.999999884516,
                latitudeDelta: 0.07,
                longitudeDelta: 0.001,
              }}>
              {/*<Circle*/}
              {/*  strokeColor={'rgba(62, 153, 237, 1)'}*/}
              {/*  fillColor={'rgba(62, 153, 237, 0.3)'}*/}
              {/*  strokeWidth={3}*/}
              {/*  center={{*/}
              {/*    latitude: -6.000000019900122,*/}
              {/*    longitude: 105.999999884516,*/}
              {/*  }}*/}
              {/*  radius={1500}*/}
              {/*/>*/}
            </MapView>
            <View style={{position: 'absolute', bottom: 10, right: 10}}>
              <ActivityIndicator size={24} color={colors.button_color_one} />
            </View>
          </View>
        </View>
      </View>
    </HeaderContainer>
  );
};

export default GeoDistributionPage;
