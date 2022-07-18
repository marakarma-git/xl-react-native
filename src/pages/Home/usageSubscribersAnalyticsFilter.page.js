import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import Text from '../../components/global/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import {
  simGetEnterprise,
  simGetEnterprisePackage,
  usageSubscribersAnalyticsDynamicOnchangeDropDown,
  usageSubscribersAnalyticsDynamicResetSelectedValue,
  usageSubscribersAnalyticsGenerateParams,
  usageSubscribersAnalyticsResetAllValue,
} from '../../redux/action/usage_subscribers_analytics_filter_action';
import {useDispatch, useSelector} from 'react-redux';
import {device_width} from '../../constant/config';
import lod from 'lodash';
import InputHybrid from '../../components/InputHybrid';

const UsageAnalyticsFilterPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [testWidth, setTestWidth] = useState(device_width * 0.41 - 1);
  const {dataHeader, appliedFilter} = useSelector(
    (state) => state.usage_subscribers_analytics_filter_reducer,
  );
  useEffect(() => {
    dispatch(simGetEnterprise());
    const timer = setTimeout(() => {
      setTestWidth(device_width * 0.41);
    }, 100);
    return () => timer;
  }, [dispatch]);
  const sortedArray = lod.orderBy(dataHeader, ['sort_by_filter', 'asc']) || [];
  return (
    <HeaderContainer
      headerTitle={'Usage & Subscribers Analytics'}
      backIcon={true}>
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
                    if (
                      formId ===
                      'usage-subscribers-analytics-enterprise-hard-code'
                    ) {
                      dispatch(
                        usageSubscribersAnalyticsDynamicResetSelectedValue({
                          formId:
                            'usage-subscribers-analytics-package-name-hard-code',
                        }),
                      );
                      dispatch(
                        simGetEnterprisePackage({enterpriseId: e?.toPackage}),
                      );
                    }
                    dispatch(
                      usageSubscribersAnalyticsDynamicOnchangeDropDown({
                        formId: formId,
                        dropDown: e,
                      }),
                    );
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
                    dispatch(usageSubscribersAnalyticsResetAllValue());
                  }
                  if (value === 'Find') {
                    dispatch(usageSubscribersAnalyticsGenerateParams());
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

export default UsageAnalyticsFilterPage;
