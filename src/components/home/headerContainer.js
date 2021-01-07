import React from 'react';
import {View} from 'react-native';
import {Header, Navbar} from '../index';
import PropTypes from 'prop-types';
const homePageContainer = ({navigation, ...props}) => {
  const {companyLogo} = props || null;
  return (
    <View>
      <Header />
      <Navbar navigation={navigation} companyLogo={companyLogo} />
    </View>
  );
};
homePageContainer.propTypes = {
  navigation: PropTypes.any.isRequired,
  companyLogo: PropTypes.string,
};
export default homePageContainer;
