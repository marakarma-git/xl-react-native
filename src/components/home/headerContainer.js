import React from 'react';
import { View } from 'react-native';
import { Header, Navbar } from '../index';

const homePageContainer = ({ navigation }) => {
  return (
    <View>
      <Header />
      <Navbar
        navigation={navigation} />
    </View>
  )
}

export default homePageContainer;