import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../constant/color';
import {subscriptionStyle} from '../../style';
import {
  generateArrayFilterParams,
  resetDataFilter,
  setSomethingToFilter,
  updateDataSearchText,
} from '../../redux/action/dynamic_array_filter_action';
import InputHybrid from '../../components/InputHybrid';
import {getStateCorp} from '../../redux/action/get_state_action';
import {getStateLock} from '../../redux/action/get_state_lock_action';
import {getCustomLabel} from '../../redux/action/get_custom_label_action';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {getEnterpriseCorp} from '../../redux/action/get_enterprise_corp_action';
import {getEnterprisePackageName} from '../../redux/action/get_enterprise_package_name_action';

const Container = (props) => {
  const {style, children} = props;
  return (
    <View style={[subscriptionStyle.localContainer, style]}>{children}</View>
  );
};
const LandingPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    array_filter,
    loading_array_filter,
    generatedParams,
    searchText,
  } = useSelector((state) => state.dynamic_array_filter_reducer);
  useEffect(() => {
    dispatch(getStateCorp(navigation));
    dispatch(getEnterpriseCorp(navigation));
    dispatch(getStateLock(navigation));
    dispatch(getCustomLabel(navigation));
  }, [dispatch, navigation]);
  return (
    <HeaderContainer navigation={navigation} headerTitle={'Subscription'}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <OverlayBackground />
        <Text>params: {JSON.stringify(generatedParams)}</Text>
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
              value={searchText}
              onChangeText={(e) => dispatch(updateDataSearchText(e))}
              style={{flex: 1}}
              placeholder={'Search with IMSI, MSISDN, ICCID, Detected IMEI'}
            />
          </View>
        </Container>
        <Container style={{marginTop: 12}}>
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
                  isSelected,
                } = e;
                return (
                  <InputHybrid
                    isSelected={isSelected}
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
                    dispatch(resetDataFilter());
                  }
                  if (value === 'Find') {
                    dispatch(generateArrayFilterParams());
                  }
                }}>
                <Text
                  style={{
                    color: value === 'Clear' ? 'black' : 'white',
                    fontWeight: 'bold',
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

export default LandingPage;
