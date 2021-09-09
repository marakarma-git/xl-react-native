import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import {homeStyle} from '../../style/index';
import {burgerMenu} from '../../assets/images/index';
import Orientation from '../../helpers/orientation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NavbarComponent = (props) => {
  const {companyLogo, headerTitle, orientation, backIcon, onPressBack} =
    props || null;
  return (
    <View style={[homeStyle.navbarContainer, props.customStyle]}>
      {backIcon === true ? (
        <TouchableOpacity
          onPress={() => {
            if (!onPressBack) {
              props.navigation.goBack();
            } else {
              onPressBack();
            }
          }}>
          <MaterialCommunityIcons
            name={'arrow-left'}
            color={'black'}
            size={24}
          />
        </TouchableOpacity>
      ) : (
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
      )}
      {headerTitle && (
        <Text
          style={{
            flex: 1,
            paddingLeft: 20,
            fontSize: 16,
          }}
          fontType="bold">
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
