import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderContainer, OverlayBackground } from '../../components/index';
import { Button } from 'react-native-elements';
import { device_width } from '../../constant/config';

const LandingPage = ({ navigation }) => {
  return (
    <View>
      <HeaderContainer navigation={navigation} headerTitle={'Subscription'} />
      <ScrollView>
        <OverlayBackground />
        <View
          style={{
            top: -80,
            backgroundColor: 'white',
            padding: 10,
            marginHorizontal: 10,
            paddingBottom: 80,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Search</Text>
            <Ionicons name={'chevron-back-circle'} color={'black'} size={28} />
          </View>
          <TextInput
            placeholder={'Search with IMSI, MSSIDN, ICCID, Detected IMEI'}
            style={{
              marginTop: 6,
              borderWidth: 1,
              paddingHorizontal: 12,
              borderColor: 'lightgray',
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 24,
              marginBottom: 6,
            }}>
            Filter
          </Text>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 12,
              paddingTop: 12,
              borderColor: 'lightgray',
              flexGrow: 1,
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {dynamicFilter.map((value, index) => (
              <View
                key={index}
                style={{
                  width: device_width * 0.5 - 40,
                  marginBottom: 12,
                }}>
                <Text numberOfLines={1}>{value.title}</Text>
                <TextInput
                  style={{
                    flex: 1,
                    marginTop: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 0,
                    borderWidth: 1,
                    borderColor: 'lightgray',
                  }}
                />
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginTop: 12,
            }}>
            <Button
              title={'clear'}
              titleStyle={{ paddingHorizontal: 12 }}
              buttonStyle={{ marginRight: 12 }}
            />
            <Button title={'Find'} titleStyle={{ paddingHorizontal: 12 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LandingPage;
const dynamicFilter = [
  {
    title: 'IMSI',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'Enterprise',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
  },
  {
    title: 'In Session',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
    onChange: '',
  },
  {
    title: 'Fixed Ip',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'MSISDN',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'Label',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'ICCID',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'State',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
  },
  {
    title: 'Detected IMEI',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'APN',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'State Lock',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
  },
  {
    title: 'IMSI',
    type: 'Monthly Data',
    onChange: '',
    value: '',
    data: [],
  },
  {
    title: 'Subscription Package Name',
    type: 'Dropdown',
    data: [],
    loading: false,
    value: {},
  },
  {
    title: 'Monthly SMS',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'Specification ID',
    type: 'TextInput',
    value: '',
    onChange: '',
  },
  {
    title: 'First Activation Date',
    type: 'DateTimePicker',
    data: [],
    value: {},
    loading: false,
  },
  {
    title: 'PBR Exit Date',
    type: 'DateTimePicker',
    data: [],
    value: {},
    loading: false,
  },
];
