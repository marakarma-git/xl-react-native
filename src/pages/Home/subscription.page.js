import React, {useEffect} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../constant/color';
import {subscriptionStyle} from '../../style';
import InputHybrid from '../../components/InputHybrid';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {setSomethingToFilter} from '../../redux/action/dynamic_array_filter_action';
import {getStateLock} from '../../redux/action/get_state_lock_action';
import {getEnterpriseCorp} from '../../redux/action/get_enterprise_corp_action';
import {getStateCorp} from '../../redux/action/get_state_action';
import {getEnterprisePackageName} from '../../redux/action/get_enterprise_package_name_action';
const Container = (props) => {
  const {style, children} = props;
  return (
    <View style={[subscriptionStyle.localContainer, style]}>{children}</View>
  );
};
const LandingPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {array_filter} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
  const {
    data_enterprise_package_name,
    loading_enterprise_package_name,
  } = useSelector((state) => state.get_enterprise_package_name_reducer);
  useEffect(() => {
    dispatch(getStateCorp());
    dispatch(getEnterpriseCorp());
    dispatch(getStateLock());
  }, [dispatch]);
  return (
    <HeaderContainer navigation={navigation} headerTitle={'Subscription'}>
      <ScrollView>
        <OverlayBackground />
        <Container style={{marginTop: 28}}>
          <View style={subscriptionStyle.containerTitle}>
            <Text>Search</Text>
            <Ionicons
              name={'chevron-back-circle'}
              color={colors.gray}
              size={20}
            />
          </View>
          <View style={subscriptionStyle.containerTextInput}>
            <FontAwesome
              style={{marginHorizontal: 8}}
              name={'search'}
              color={colors.gray_0}
              size={15}
            />
            <TextInput
              style={{flex: 1}}
              placeholder={'Search with IMSI, MSISDN, ICCID, Detected IMEI'}
            />
          </View>
        </Container>
        <Container>
          <Text style={{marginBottom: 7}}>Filter</Text>
          <View style={subscriptionStyle.containerWrap}>
            {array_filter.length > 0 &&
              array_filter.map((e) => {
                const {
                  formId,
                  type,
                  value,
                  label,
                  loading,
                  data,
                  selectedValue,
                  disabled,
                  errorText,
                } = e;
                return (
                  <InputHybrid
                    onChange2={(e) =>
                      dispatch(
                        setSomethingToFilter([
                          {
                            formId: formId,
                            needs: `OnChange${type}`,
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
                              needs: `OnChange${type}`,
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
                            needs: `OnChange${type}`,
                            value: e,
                            selectedValue: selectedValue,
                          },
                        ]),
                      );
                    }}
                    errorText={errorText}
                    disabled={disabled}
                    type={type}
                    label={label}
                    value={value}
                    loading={loading}
                    data={data}
                    selectedValue={selectedValue}
                  />
                );
              })}
          </View>
        </Container>
      </ScrollView>
    </HeaderContainer>
  );
};

export default LandingPage;
