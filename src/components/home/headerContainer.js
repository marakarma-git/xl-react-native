import React from 'react';
import {Header, Navbar} from '../index';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
const homePageContainer = (props) => {
  const navigation = useNavigation();
  const {companyLogo, headerTitle, children} = props || null;
  return (
    <>
      <Header notifications={true} />
      <Navbar
        navigation={navigation}
        companyLogo={companyLogo}
        headerTitle={headerTitle}
      />
      {children}
    </>
  );
};
homePageContainer.propTypes = {
  navigation: PropTypes.any.isRequired,
  companyLogo: PropTypes.string,
  headerTitle: PropTypes.string,
};
export default homePageContainer;
