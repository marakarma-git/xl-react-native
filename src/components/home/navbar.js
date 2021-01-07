import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {homeStyle} from '../../style/index';
import {burgerMenu} from '../../assets/images/index';
const NavbarComponent = (props) => {
  const {companyLogo} = props || null;
  return (
    <View style={[homeStyle.navbarContainer, props.customStyle]}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image source={burgerMenu} style={homeStyle.navbarButton} />
      </TouchableOpacity>
      <Image source={{uri: companyLogo}} style={homeStyle.navbarCompanyImage} />
    </View>
  );
};
NavbarComponent.propTypes = {
  companyLogo: PropTypes.string,
};
export default NavbarComponent;
