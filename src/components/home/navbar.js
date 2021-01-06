import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { homeStyle } from '../../style/index';
import { burgerMenu, logoCompany } from '../../assets/images/index';

const NavbarComponent = (props) => {

  return (
    <View style={[homeStyle.navbarContainer, props.customStyle]}>
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}>
        <Image source={burgerMenu} style={homeStyle.navbarButton} />
      </TouchableOpacity>
      <Image
        source={logoCompany}
        style={homeStyle.navbarCompanyImage} />
    </View>
  );

}

export default NavbarComponent;