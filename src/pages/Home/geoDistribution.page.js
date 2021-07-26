import React, {useState} from 'react';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {HeaderContainer} from '../../components';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Modal, Text} from 'react-native';

const geoDistributionPage = () => {
  const navigation = useNavigation();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const [aa, setAa] = useState({long: 0, lat: 0});
  console.log('kena render geo');
  return (
    <HeaderContainer
      navigation={navigation}
      headerTitle={'Usage Analytics'}
      companyLogo={imageBase64}>
      <Text
        style={{fontWeight: 'bold'}}
        onPress={() =>
          setAa({
            long: 105.999999884516,
            lat: -6.000000019900122,
          })
        }>
        Set Long lat to
      </Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: -6.000000019900122,
          longitude: 105.999999884516,
          latitudeDelta: 0.07,
          longitudeDelta: 0.001,
        }}>
        <Circle
          strokeColor={'rgba(62, 153, 237, 1)'}
          fillColor={'rgba(62, 153, 237, 0.3)'}
          strokeWidth={3}
          center={{
            latitude: -6.000000019900122,
            longitude: 105.999999884516,
          }}
          radius={1500}
        />
      </MapView>
    </HeaderContainer>
  );
};

export default geoDistributionPage;
