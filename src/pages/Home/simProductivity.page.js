import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderContainer} from '../../components';
import {
  StackActions,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';

const SimProductivityPage = () => {
  const pushAction = StackActions.push('Subscription', {key: true});
  const navigation = useNavigation();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  return (
    <HeaderContainer
      headerTitle={'Sim Productivity'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <Text onPress={() => navigation.navigate('Subscription', {key: true})}>
        Ke subscription
      </Text>
    </HeaderContainer>
  );
};

export default SimProductivityPage;
