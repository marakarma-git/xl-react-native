import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '../../components/global/text';
import {
  getActiveEnterprise,
  getActiveRole,
  userAdministrationDynamicOnchangeDropDown,
  userAdministrationDynamicOnchangeTextInput,
  userAdministrationGenerateParams,
  userAdministrationResetAllValue,
} from '../../redux/action/user_administration_array_header_action';
import {HeaderContainer, OverlayBackground} from '../../components';
import {subscriptionStyle} from '../../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import {Container} from './subscriptionFilter.page';
import {useNavigation} from '@react-navigation/native';
import InputHybrid from '../../components/InputHybrid';
import lod from 'lodash';
import {device_width} from '../../constant/config';

const UserAdministrationFilterPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [testWidth, setTestWidth] = useState(device_width * 0.41 - 1);
  const {dataHeader} = useSelector(
    (state) => state.user_administration_array_header_reducer,
  );
  useEffect(() => {
    dispatch(getActiveRole());
    dispatch(getActiveEnterprise());
    const timer = setTimeout(() => {
      setTestWidth(device_width * 0.41);
    }, 100);
    return () => timer;
  }, [dispatch]);
  const sortedArray = lod.orderBy(dataHeader, ['sort_by_filter', 'asc']) || [];
  return (
    <HeaderContainer headerTitle={'User Administration'} backIcon={true}>
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
              } = e || {};
              const {label} = config || {};
              return (
                <InputHybrid
                  customStyle={{width: testWidth}}
                  type={typeInput}
                  value={value}
                  loading={loading}
                  data={data}
                  errorText={errorText}
                  disabled={errorText}
                  label={label}
                  onChange={(e) => {
                    if (typeInput === 'TextInput') {
                      dispatch(
                        userAdministrationDynamicOnchangeTextInput({
                          formId: formId,
                          textInput: e,
                        }),
                      );
                    }
                    if (typeInput === 'DropDown') {
                      dispatch(
                        userAdministrationDynamicOnchangeDropDown({
                          formId: formId,
                          dropDown: e,
                        }),
                      );
                      if (formId === 'organizations-hard-code') {
                        const {value} = e || {};
                        dispatch(
                          getActiveRole({
                            thisEnterprise: value,
                          }),
                        );
                      }
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
                    dispatch(userAdministrationResetAllValue());
                  }
                  if (value === 'Find') {
                    dispatch(userAdministrationGenerateParams());
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

export default UserAdministrationFilterPage;
