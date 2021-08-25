import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, ScrollView, Dimensions, Image} from 'react-native';
import Text from '../../components/global/text';
import {Card} from 'react-native-paper';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import style from '../../style/home.style';
import styles from '../../style/login.style';
import Orientation from '../../helpers/orientation';
import {loginBrand, xlBusolInverted} from '../../assets/images/index';
import {getTitleVersion} from '../../redux/action/auth_action';

const AboutPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {titleVersion} = useSelector((state) => state.auth_reducer);
  const [orientation, setOrientation] = useState('potrait');
  const versionLabel = titleVersion
    ? titleVersion?.appsTitle + ' ' + titleVersion?.versionNumber
    : '-';

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
      dispatch(getTitleVersion());
      detectOrientation();
    });

    return pageLoad;
  }, [navigation]);

  return (
    <HeaderContainer
      navigation={navigation}
      companyLogo={imageBase64}
      headerTitle={'About'}>
      <ScrollView>
        <OverlayBackground />
        <Card style={[style.cardSection, {marginTop: '5%', borderWidth: 0}]}>
          <Card.Content style={{marginBottom: 20, alignItems: 'center'}}>
            <View style={[styles.loginContainerHeader]}>
              <Image
                source={loginBrand}
                resizeMode="contain"
                style={
                  orientation === 'landscape' ? {width: '80%'} : {width: '100%'}
                }
              />
            </View>
            <Text style={style.aboutText}>
              Smart Connectivity Dashboard Monitoring Application for you to
              manage your IoT Devices in easy way, available in Mobile & Web
              Application. Provide lot of features from Summary Dashboard,
              Subscription Inventory Management with Custom Label & Geo Location
              Map, Report & Analytics, Automation / Trigger Management and
              Real-time Diagnostics.
            </Text>
            <Text fontType={'bold'} style={style.aboutTitle}>
              Powered by:
            </Text>
            <View
              style={[
                styles.imageContainer,
                {height: 70, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Image
                resizeMode="contain"
                style={{
                  width:
                    Orientation.getWidth() *
                    (orientation === 'potrait' ? 0.4 : 0.3),
                  height:
                    Orientation.getHeight() *
                    (orientation === 'potrait' ? 0.2 : 0.15),
                }}
                source={xlBusolInverted}
              />
            </View>
            <Text fontType={'bold'} style={style.aboutTitle}>
              Application Version
            </Text>
            <Text fontType={'bold'} style={style.aboutTitle}>
              {versionLabel}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </HeaderContainer>
  );
};

export default AboutPage;
