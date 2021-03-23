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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
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
              Application version
            </Text>
            <Text fontType={'bold'} style={style.aboutTitle}>
              {titleVersion || '-'}
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </HeaderContainer>
  );
};

export default AboutPage;
