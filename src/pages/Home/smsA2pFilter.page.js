import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../components/global/text';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {device_width} from '../../constant/config';
import smsA2pGetActiveEnterprise, {
  smsA2pDynamicOnchangeDateTime,
  smsA2pDynamicOnChangeDropDown,
  smsA2pDynamicOnChangeTextInput,
  smsA2pGenerateParams,
  smsA2pResetAllValue,
} from '../../redux/action/sms_a2p_array_header_action';
import lod from 'lodash';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import InputHybrid from '../../components/InputHybrid';

const SmsA2pFilter = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [testWidth, setTestWidth] = useState(device_width * 0.41 - 1);
  const {dataSmsHeader} = useSelector(
    (state) => state.sms_a2p_array_header_reducer,
  );
  useEffect(() => {
    dispatch(smsA2pGetActiveEnterprise());
    const timer = setTimeout(() => {
      setTestWidth(device_width * 0.41);
    }, 100);
    return () => timer;
  }, [dispatch]);
  const sortedArray =
    lod.orderBy(dataSmsHeader, ['sort_by_filter', 'asc']) || [];
  return (
    <HeaderContainer headerTitle={'SMS A2P Configuration'}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <OverlayBackground />
        <Container style={{marginTop: 16}}>
          <View style={subscriptionStyle.containerTitle}>
            <Text style={{fontSize: 16}}>Filter</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name={'chevron-back-circle'}
                color={colors.gray}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={subscriptionStyle.containerWrap}>
            {sortedArray.map((e) => {
              const {
                formId,
                typeInput,
                value,
                config,
                loading,
                data,
                errorText,
                disabled,
                isSelected,
              } = e || {};
              const {label} = config || {};
              return (
                <InputHybrid
                  isSelected={isSelected}
                  disabled={disabled}
                  customStyle={{width: testWidth}}
                  type={typeInput}
                  value={value}
                  loading={loading}
                  data={data}
                  errorText={errorText}
                  label={label}
                  onChange={(e) => {
                    if (typeInput === 'TextInput') {
                      dispatch(
                        smsA2pDynamicOnChangeTextInput({
                          formId: formId,
                          textInput: e,
                        }),
                      );
                    }
                    if (typeInput === 'DropDown') {
                      dispatch(
                        smsA2pDynamicOnChangeDropDown({
                          formId: formId,
                          dropDown: e,
                        }),
                      );
                    }
                    if (typeInput === 'DateTimePicker') {
                      dispatch(
                        smsA2pDynamicOnchangeDateTime({
                          formId: formId,
                          dateTime: e,
                        }),
                      );
                    }
                  }}
                />
              );
            })}
          </View>
        </Container>
        <View style={subscriptionStyle.buttonContainer}>
          {['Clear', 'Find'].map((value) => {
            return (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor:
                      value === 'Clear' ? colors.gray_400 : colors.main_color,
                  },
                  subscriptionStyle.buttonStyle,
                ]}
                onPress={() => {
                  if (value === 'Clear') {
                    dispatch(smsA2pResetAllValue());
                  }
                  if (value === 'Find') {
                    dispatch(smsA2pGenerateParams());
                    navigation.goBack();
                  }
                }}>
                <Text
                  fontType={'bold'}
                  style={{
                    color: value === 'Clear' ? 'black' : 'white',
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
//2021-05-03t05:24:38.069Z
export default SmsA2pFilter;
