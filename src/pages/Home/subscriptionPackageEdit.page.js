import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import {colors} from '../../constant/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputHybrid from '../../components/InputHybrid';
import {useNavigation} from '@react-navigation/native';

const currencyFormatter = (value = '') => {
  // const onlyAllowOneComma = value.replace(/^[^0-9,]*,[^,]*$/, '');
  // console.log('Before: ' + onlyAllowOneComma);
  // const convertThousandSeparator = onlyAllowOneComma.replace(
  //   /(\d)(?=(\d{3})+(?!\d))/g,
  //   '$1.',
  // );
  // console.log('after: ' + convertThousandSeparator);
  const test = value.replace(/^[^0-9,]*,(\d)(?=(\d{3})+(?!\d))/, '$1.');
  return test;
};

const SubscriptionPackageEdit = ({route}) => {
  const navigation = useNavigation();
  const {params} = route || {};
  const {positionTableIndex} = params || {};
  const [dummyArray, _] = useState([0]);
  const [currency, setCurrency] = useState(0);

  useEffect(() => {
    if (positionTableIndex || positionTableIndex === 0) {
      // console.log(positionTableIndex);
      // alert(positionTableIndex);
    }
  }, [positionTableIndex]);

  const handlingBack = () => {
    navigation.setParams({
      positionTableIndex: undefined,
    });
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => handlingBack());
  }, []);
  return (
    <HeaderContainer headerTitle={'Subscription Package'} backIcon={true}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <OverlayBackground />
        <Container style={{marginTop: 16}}>
          <View style={subscriptionStyle.containerTitle}>
            <Text style={{fontSize: 16}}>Edit</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name={'chevron-back-circle'}
                color={colors.gray}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={subscriptionStyle.containerWrap}>
            {dummyArray.map(() => {
              return (
                <InputHybrid
                  fullWidthInput={true}
                  disabled={false}
                  type={'TextInput'}
                  value={currency}
                  loading={false}
                  data={[]}
                  errorText={''}
                  label={'label'}
                  onChange={(e) => {
                    setCurrency(currencyFormatter(e));
                  }}
                  onChange2={() => {}}
                  placeholder={'0'}
                  constantLabelLeft={'IDR'}
                />
              );
            })}
          </View>
        </Container>
        <View style={subscriptionStyle.buttonContainer}>
          {['Cancel', 'Submit'].map((value) => {
            return (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor:
                      value === 'Cancel' ? colors.gray_400 : colors.main_color,
                  },
                  subscriptionStyle.buttonStyle,
                ]}
                onPress={() => {
                  if (value === 'Cancel') {
                    handlingBack();
                  }
                }}>
                <Text
                  fontType={'bold'}
                  style={{
                    color: value === 'Cancel' ? 'black' : 'white',
                  }}>
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </HeaderContainer>
  );
};

export default SubscriptionPackageEdit;
