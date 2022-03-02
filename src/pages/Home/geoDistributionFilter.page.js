import React, {useEffect, useState} from 'react';
import {HeaderContainer, OverlayBackground} from '../../components';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {subscriptionStyle} from '../../style';
import Text from '../../components/global/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import InputHybrid from '../../components/InputHybrid';
import {Container} from './subscriptionFilter.page';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import lod from 'lodash';
import {
  geoDistributionDynamicOnchangeDropDown,
  geoDistributionGenerateParams,
  getEnterpriseGeo,
} from '../../redux/action/geo_distribution_filter_action';

const GeoDistributionFilterPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {dataHeader} = useSelector(
    (state) => state.geo_distribution_filter_reducer,
  );
  const sortedArray = lod.orderBy(dataHeader, ['sort_by_filter', 'asc']) || [];
  useEffect(() => {
    dispatch(getEnterpriseGeo());
  }, [dispatch]);
  return (
    <HeaderContainer headerTitle={'Geo Distribution'} backIcon={true}>
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
                  type={typeInput}
                  value={value}
                  loading={loading}
                  data={data}
                  errorText={errorText}
                  label={label}
                  fullWidthInput={true}
                  onChange={(e) => {
                    dispatch(
                      geoDistributionDynamicOnchangeDropDown({
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
          {['Cancel', 'Find'].map((value) => {
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
                  if (value === 'Find') {
                    dispatch(geoDistributionGenerateParams());
                    navigation.goBack();
                  }
                  if (value === 'Cancel') {
                    navigation.goBack();
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

export default GeoDistributionFilterPage;
