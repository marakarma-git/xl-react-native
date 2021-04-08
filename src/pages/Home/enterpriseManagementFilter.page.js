import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../components/global/text';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {device_width} from '../../constant/config';
import getCustomerType, {
  enterpriseManagementDynamicOnChangeDropDown,
  enterpriseManagementDynamicOnChangeTextInput,
  enterpriseManagementGenerateParams,
  enterpriseManagementResetAllValue,
} from '../../redux/action/enterprise_management_array_header_action';
import lod from 'lodash';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import InputHybrid from '../../components/InputHybrid';

const EnterpriseManagementFilterPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [testWidth, setTestWidth] = useState(device_width * 0.41 - 1);
  const {dataHeaderEnterprise} = useSelector(
    (state) => state.enterprise_management_header_array_reducer,
  );
  useEffect(() => {
    dispatch(getCustomerType());
    const timer = setTimeout(() => {
      setTestWidth(device_width * 0.41);
    }, 100);
    return () => timer;
  }, [dispatch]);
  const sortedArray =
    lod.orderBy(dataHeaderEnterprise, ['sort_by_filter', 'asc']) || [];
  return (
    <HeaderContainer headerTitle={'Enterprise Management'}>
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
              } = e || {};
              const {label} = config || {};
              return (
                <InputHybrid
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
                        enterpriseManagementDynamicOnChangeTextInput({
                          formId: formId,
                          textInput: e,
                        }),
                      );
                    }
                    if (typeInput === 'DropDown') {
                      dispatch(
                        enterpriseManagementDynamicOnChangeDropDown({
                          formId: formId,
                          dropDown: e,
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
                      value === 'Clear'
                        ? colors.gray_400
                        : colors.button_color_one,
                  },
                  subscriptionStyle.buttonStyle,
                ]}
                onPress={() => {
                  if (value === 'Clear') {
                    dispatch(enterpriseManagementResetAllValue());
                  }
                  if (value === 'Find') {
                    dispatch(enterpriseManagementGenerateParams());
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

export default EnterpriseManagementFilterPage;
