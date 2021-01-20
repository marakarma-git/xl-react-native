import React from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constant/color';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import InputHybrid from '../../components/InputHybrid';
import {subscriptionStyle} from '../../style';
import dayjs from 'dayjs';
const Container = (props) => {
  const {style, children} = props;
  return (
    <View style={[subscriptionStyle.localContainer, style]}>{children}</View>
  );
};
const LandingPage = ({navigation}) => {
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
            {dynamicFilter.map((e) => {
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
const dynamicFilter = [
  {
    label: 'IMSI',
    value: '',
    type: 'TextInput',
    params: '&imsi=',
  },
  {
    label: 'In Session',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&inSession=',
  },
  {
    label: 'ICCID',
    value: '',
    type: 'TextInput',
    params: '&iccid=',
  },
  {
    label: 'Detected IMEI',
    value: '',
    type: 'TextInput',
    params: '&imei=',
  },
  {
    label: 'Enterprise',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&enterprise=',
  },
  {
    label: 'Fixed IP',
    value: '',
    type: 'TextInput',
    params: '&fixedIP=',
  },
  {
    label: 'Label',
    value: '',
    type: 'TextInput',
    params: '&label=',
  },
  {
    label: 'State',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&label=',
  },
  {
    label: 'APN',
    value: '',
    type: 'TextInput',
    params: '&apn=',
  },
  {
    label: 'State Lock',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&state=',
  },
  {
    label: 'Subscription Package Name',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&subscriptionPackageName=',
  },
  {
    label: 'Specification ID',
    value: '',
    type: 'TextInput',
    params: '&specificationId=',
  },
  {
    label: 'First Activation Date',
    value: dayjs(),
    type: 'DateTimePicker',
    params: '&firstActivationDate=',
  },
  {
    label: 'PBR exit date',
    value: dayjs(),
    type: 'DateTimePicker',
    params: '&pbrExitDate=',
  },
  {
    label: 'Monthly Data',
    value: '',
    type: 'DropDownType2',
    params: '&monthlyData=',
    data: [],
    selectedValue: '',
  },
  {
    label: 'Monthly SMS',
    value: '',
    type: 'DropDownType2',
    params: '&monthlySms=',
    data: [],
    selectedValue: '',
  },
];
