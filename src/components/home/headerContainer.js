import React from 'react';
import {Header, Navbar} from '../index';
import PropTypes from 'prop-types';
const homePageContainer = ({navigation, ...props}) => {
  const {companyLogo, headerTitle, children} = props || null;
  return (
    <>
      <Header />
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
