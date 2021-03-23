import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import {homeStyle} from '../../style/index';
import {burgerMenu} from '../../assets/images/index';
import Orientation from '../../helpers/orientation';

const NavbarComponent = (props) => {
  const {companyLogo, headerTitle, orientation} = props || null;
  return (
    <View style={[homeStyle.navbarContainer, props.customStyle]}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image
          source={burgerMenu}
          style={[
            homeStyle.navbarButton,
            {
              width:
                orientation === 'landscape'
                  ? Orientation.getWidth() * 0.03
                  : Orientation.getWidth() * 0.05,
            },
          ]}
        />
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
