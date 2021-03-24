import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../constant/color';
import {subscriptionStyle} from '../../style';
import {
  generateArrayFilterParams,
  resetDataFilter,
  resetGeneratedParams,
  setSomethingToFilter,
} from '../../redux/action/dynamic_array_filter_action';
import {device_width} from '../../constant/config';
import InputHybrid from '../../components/InputHybrid';
import {getStateCorp} from '../../redux/action/get_state_action';
import {getStateLock} from '../../redux/action/get_state_lock_action';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getEnterpriseCorp} from '../../redux/action/get_enterprise_corp_action';
import {getEnterprisePackageName} from '../../redux/action/get_enterprise_package_name_action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import lod from 'lodash';
import Text from '../../components/global/text';
const Container = (props) => {
  const {style, children} = props;
  return (
    <View style={[subscriptionStyle.localContainer, style]}>{children}</View>
  );
};
const SubscriptionFilter = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [testWidth, setWidth] = useState(device_width * 0.41 - 1);
  const {array_filter, loading_array_filter, generatedParams} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
  useEffect(() => {
    dispatch(getStateCorp(navigation));
    dispatch(getEnterpriseCorp(navigation));
    dispatch(getStateLock(navigation));
  }, [dispatch, navigation]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(device_width * 0.41);
    }, 100);
    return () => timer;
  });
  useEffect(() => {
    console.log(JSON.stringify(generatedParams, null, 2));
  }, [generatedParams]);
  let array = lod.orderBy(array_filter, ['sort_by_filter', 'asc']) || [];
  return (
    <HeaderContainer navigation={navigation} headerTitle={'Subscription'}>
      <ScrollView
        style={{backgroundColor: 'white'}}
        removeClippedSubviews={false}>
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
          <View
            style={subscriptionStyle.containerWrap}
            removeClippedSubviews={false}>
            {array.map((e) => {
              const {
                formId,
                typeInput,
                value,
                config,
                loading,
                data,
                selectedValue,
                disabled,
                errorText,
                isSelected,
              } = e || {};
              const {label} = config || {};
              return (
                <InputHybrid
                  customStyle={{width: testWidth}}
                  isSelected={isSelected}
                  onChange2={(e) =>
                    dispatch(
                      setSomethingToFilter([
                        {
                          formId: formId,
                          needs: `OnChange${typeInput}`,
                          value: value,
                          selectedValue: e,
                        },
                      ]),
                    )
                  }
                  onChange={(e) => {
                    if (formId === 'enterprise-hard-code') {
                      dispatch(getEnterprisePackageName(e.value));
                      dispatch(
                        setSomethingToFilter([
                          {
                            formId: formId,
                            needs: `OnChange${typeInput}`,
                            value: e,
                            selectedValue: selectedValue,
                          },
                        ]),
                      );
                    }
                    dispatch(
                      setSomethingToFilter([
                        {
                          formId: formId,
                          needs: `OnChange${typeInput}`,
                          value: e,
                          selectedValue: selectedValue,
                        },
                      ]),
                    );
                  }}
                  errorText={errorText}
                  disabled={disabled}
                  type={typeInput}
                  label={label}
                  value={value}
                  loading={loading}
                  data={data}
                  selectedValue={selectedValue}
                />
              );
            })}
          </View>
          {loading_array_filter && (
            <View
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <ActivityIndicator color="#002DBB" size="large" />
            </View>
          )}
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
                    dispatch(resetGeneratedParams());
                    dispatch(resetDataFilter());
                  }
                  if (value === 'Find') {
                    dispatch(generateArrayFilterParams());
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

export default SubscriptionFilter;
