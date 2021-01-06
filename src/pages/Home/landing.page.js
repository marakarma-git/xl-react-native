import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { HeaderContainer, OverlayBackground } from '../../components/index';

const LandingPage = ({ navigation }) => {
  return (
    <View>
      <HeaderContainer
        navigation={navigation} />
      <ScrollView>
        <View style={{ height: 800 }}>
          <OverlayBackground />
          <Text style={{ textAlign: 'center' }}>Home Page Content Here</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default LandingPage;