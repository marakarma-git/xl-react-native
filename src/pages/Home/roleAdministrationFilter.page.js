import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Text from '../../components/global/text';
import {HeaderContainer, OverlayBackground} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {device_width} from '../../constant/config';
import roleAdministrationGetActiveEnterprise, {
  roleAdministrationDynamicOnChangeDropDown,
  roleAdministrationDynamicOnChangeTextInput,
  roleAdministrationGenerateParams,
  roleAdministrationResetAllValue,
} from '../../redux/action/role_administration_array_header_action';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import InputHybrid from '../../components/InputHybrid';
import lod from 'lodash';

const RoleAdministrationFilterPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [testWidth, setTestWidth] = useState(device_width * 0.41 - 1);
  const {dataRoleHeader} = useSelector(
    (state) => state.role_administration_array_header_reducer,
  );
  useEffect(() => {
    dispatch(roleAdministrationGetActiveEnterprise());
    const timer = setTimeout(() => {
      setTestWidth(device_width * 0.41);
    }, 100);
    return () => timer;
  }, [dispatch]);
  const sortedArray =
    lod.orderBy(dataRoleHeader, ['sort_by_filter', 'asc']) || [];
  return (
    <HeaderContainer headerTitle={'Role Administration'} backIcon={true}>
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
                  label={label}
                  onChange={(e) => {
                    if (typeInput === 'TextInput') {
                      dispatch(
                        roleAdministrationDynamicOnChangeTextInput({
                          formId: formId,
                          textInput: e,
                        }),
                      );
                    }
                    if (typeInput === 'DropDown') {
                      dispatch(
                        roleAdministrationDynamicOnChangeDropDown({
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
                      value === 'Clear' ? colors.gray_400 : colors.main_color,
                  },
                  subscriptionStyle.buttonStyle,
                ]}
                onPress={() => {
                  if (value === 'Clear') {
                    dispatch(roleAdministrationResetAllValue());
                  }
                  if (value === 'Find') {
                    dispatch(roleAdministrationGenerateParams());
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

export default RoleAdministrationFilterPage;
