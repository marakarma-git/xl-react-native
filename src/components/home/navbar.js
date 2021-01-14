import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {homeStyle} from '../../style/index';
import {burgerMenu} from '../../assets/images/index';
const NavbarComponent = (props) => {
  const {companyLogo, headerTitle} = props || null;
  return (
    <View style={[homeStyle.navbarContainer, props.customStyle]}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image source={burgerMenu} style={[homeStyle.navbarButton]} />
      </TouchableOpacity>
      {headerTitle && (
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontSize: 20,
          }}>
          {headerTitle}
        </Text>
      )}
      <Image source={{uri: companyLogo}} style={homeStyle.navbarCompanyImage} />
    </View>
  );
};
NavbarComponent.propTypes = {
  companyLogo: PropTypes.string,
};
export default NavbarComponent;
