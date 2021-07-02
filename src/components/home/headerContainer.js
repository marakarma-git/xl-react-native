import React, {useState, useEffect, useCallback} from 'react';
import {Header, Navbar} from '../index';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import Orientation from '../../helpers/orientation';
import {Dimensions} from 'react-native';

const HomePageContainer = (props) => {
  const navigation = useNavigation();
  const [orientation, setOrientation] = useState('potrait');
  const {companyLogo, headerTitle, children, backIcon} = props || null;

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      detectOrientation();
    });
    return pageLoad;
  }, [navigation]);
  return (
    <>
      <Header notifications={true} />
      <Navbar
        orientation={orientation}
        navigation={navigation}
        companyLogo={companyLogo}
        headerTitle={headerTitle}
        backIcon={backIcon}
      />
      {children}
    </>
  );
};
HomePageContainer.propTypes = {
  orientation: PropTypes.string,
  companyLogo: PropTypes.string,
  headerTitle: PropTypes.string,
};
export default HomePageContainer;
