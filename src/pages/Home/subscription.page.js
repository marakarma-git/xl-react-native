import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {device_width} from '../../constant/config';
import generateLink from '../../helpers/generateLink';
import lod from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import {subscriptionStyle} from '../../style';
import {Button} from 'react-native-elements';
import styles from '../../style/login.style';
const LandingPage = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const [localInput, setLocalInput] = useState(dynamicFilter);
  const [country, setCountry] = useState('');
  const onChangeText = (index, value) => {
    let newArray = lod.cloneDeep(localInput);
    newArray[index].value = value;
    setLocalInput(newArray);
  };
  return (
    <View>
      <HeaderContainer navigation={navigation} headerTitle={'Subscription'} />
      <ScrollView>
        <OverlayBackground />
        <View style={subscriptionStyle.container}>
          <View style={subscriptionStyle.searchContainer}>
            <Text style={subscriptionStyle.innerTextContainer}>Search</Text>
            <Ionicons name={'chevron-back-circle'} color={'black'} size={28} />
          </View>
          <TextInput
            placeholder={'Search with IMSI, MSSIDN, ICCID, Detected IMEI'}
            style={subscriptionStyle.textInput}
          />
          <Text style={subscriptionStyle.textTitle}>Filter</Text>
          <Text>{generateLink}</Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingTop: 12,
            borderColor: 'lightgray',
            flexGrow: 1,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: device_width * 0.5 - 40,
              marginBottom: 12,
            }}>
            <Text numberOfLines={1}>Text Input</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'lightgray',
                marginTop: 4,
              }}>
              <TextInput
                style={{
                  flex: 1,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: device_width * 0.5 - 40,
              marginBottom: 12,
            }}>
            <Text numberOfLines={1}>Text Input</Text>
            <DropDownPicker
              items={[
                {
                  label: 'UK',
                  value: 'uk',
                },
                {
                  label: 'France',
                  value: 'france',
                },
              ]}
              min={0}
              max={10}
              multiple={false}
              containerStyle={{
                height: 53,
                marginTop: 4,
              }}
              labelProps={{style: {color: 'black', flex: 1}}}
              placeholder={'hello world'}
              style={{
                width: device_width * 0.5 - 40,
                marginBottom: 12,
                borderColor: 'lightgray',
                borderWidth: 1,
                borderBottomEndRadius: 1,
                borderBottomLeftRadius: 1,
                borderTopLeftRadius: 1,
                borderTopRightRadius: 1,
              }}
              searchable={true}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: 'white',
              }}
              onChangeItem={(item) => setCountry(item)}
              searchablePlaceholder={'Cari sesuatu'}
            />
          </View>
          <View
            style={{
              width: device_width * 0.5 - 40,
              marginBottom: 12,
            }}>
            <Text numberOfLines={1}>Datepicker</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'lightgray',
                marginTop: 4,
              }}>
              <Text
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                }}>
                hello world
              </Text>
            </View>
          </View>
          <View
            style={{
              width: device_width * 0.5 - 40,
              marginBottom: 12,
            }}>
            <Text numberOfLines={1}>Text Input</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'lightgray',
                marginTop: 4,
              }}>
              <TextInput
                style={{
                  flex: 1,
                  paddingHorizontal: 12,
                  paddingBottom: 2,
                }}
              />
            </View>
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
    params: '&imsi=',
  },
  {
    title: 'Enterprise',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
    params: '&enterprise=',
  },
  {
    title: 'Fixed Ip',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&fixedIp=',
  },
];
