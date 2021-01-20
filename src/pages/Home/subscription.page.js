import React from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {colors} from '../../constant/color';
import {subscriptionStyle} from '../../style';
import InputHybrid from '../../components/InputHybrid';
import {HeaderContainer, OverlayBackground} from '../../components/index';

const Container = (props) => {
  const {style, children} = props;
  return (
    <View style={[subscriptionStyle.localContainer, style]}>{children}</View>
  );
};
const LandingPage = ({navigation}) => {
  const {array_filter} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
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
                const {type, value, label, loading, data, selectedValue} = e;
                return (
                  <InputHybrid
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
