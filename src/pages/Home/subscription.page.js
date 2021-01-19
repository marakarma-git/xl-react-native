import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../constant/color';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import {
  border_radius,
  device_height,
  device_width,
} from '../../constant/config';
const Container = (props) => {
  const {style, children} = props;
  return (
    <View
      style={[
        {
          elevation: 3,
          marginHorizontal: 16,
          backgroundColor: 'white',
          paddingVertical: 14,
          paddingHorizontal: 15,
          borderRadius: border_radius,
          marginBottom: 6,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
const LandingPage = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <HeaderContainer navigation={navigation} headerTitle={'Subscription'} />
      <ScrollView>
        <OverlayBackground />
        <Container style={{marginTop: 28}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Search</Text>
            <Ionicons
              name={'chevron-back-circle'}
              color={colors.gray}
              size={20}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.gray_0,
              borderRadius: border_radius,
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
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
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: device_width * 0.41,
                marginBottom: 15,
              }}>
              <Text style={{color: colors.gray_0}}>IMSI</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.gray_0,
                  borderRadius: border_radius,
                  marginTop: 5,
                  paddingHorizontal: 8,
                  height: device_height * 0.05,
                }}>
                <TextInput style={{padding: 5}} />
              </View>
            </View>

            <View
              style={{
                width: device_width * 0.41,
                marginBottom: 15,
              }}>
              <Text style={{color: colors.gray_0}}>State</Text>
              <TouchableOpacity
                style={{
                  height: device_height * 0.05,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.gray_0,
                  borderRadius: border_radius,
                  marginTop: 5,
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                }}>
                <Text style={{paddingVertical: 8, flex: 1}}>Please Select</Text>
                <MaterialCommunityIcons
                  name={'chevron-down'}
                  color={colors.gray}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: device_width * 0.41,
                marginBottom: 15,
              }}>
              <Text style={{color: colors.gray_0}}>First Activation Date</Text>
              <TouchableOpacity
                style={{
                  height: device_height * 0.05,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.gray_0,
                  borderRadius: border_radius,
                  marginTop: 5,
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                }}>
                <Text style={{paddingVertical: 8, flex: 1}}>Please Select</Text>
                <FontAwesome5
                  name={'calendar-alt'}
                  color={colors.gray}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: device_width * 0.41,
                marginBottom: 15,
              }}>
              <Text style={{color: colors.gray_0}}>Monthly Data</Text>
              <View
                style={{
                  height: device_height * 0.05,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: colors.gray_0,
                  borderRadius: border_radius,
                  marginTop: 5,
                  paddingHorizontal: 8,
                  flexDirection: 'row',
                }}>
                <TextInput style={{padding: 5, flex: 1}} />
                <TouchableOpacity
                  style={{
                    height: '100%',
                    flexDirection: 'row',
                    borderLeftWidth: 1,
                    alignItems: 'center',
                    borderColor: colors.gray,
                    borderTopLeftRadius: border_radius,
                    borderBottomLeftRadius: border_radius,
                  }}>
                  <Text
                    style={{
                      marginLeft: 9,
                    }}>
                    Unit
                  </Text>
                  <MaterialCommunityIcons
                    name={'chevron-down'}
                    color={colors.gray}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Container>
        <Modal
          animationType="slide"
          transparent
          visible={visible}
          onRequestClose={() => setVisible(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'black',
              opacity: 0.5,
            }}
          />
          <KeyboardAvoidingView
            enabled={false}
            style={{
              marginHorizontal: 32,
              marginVertical: 64,
              flex: 1,
              backgroundColor: 'white',
              padding: 12,
              borderRadius: border_radius,
              elevation: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.gray,
                  fontSize: 18,
                }}>
                State Lock
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <MaterialCommunityIcons
                  name={'close-circle-outline'}
                  color={colors.gray}
                  size={28}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: border_radius,
                borderColor: colors.gray,
                paddingHorizontal: 10,
                marginBottom: 7,
              }}>
              <TextInput placeholder={'Search state lock'} />
            </View>
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      backgroundColor:
                        item % 2 === 0 ? colors.gray_300 : colors.gray_200,
                      paddingHorizontal: 7,
                      paddingVertical: 14,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={{flex: 1}}>hello there +{item}</Text>
                    {item === 1 && (
                      <MaterialCommunityIcons
                        name={'check-bold'}
                        color={colors.green_check}
                        size={20}
                      />
                    )}
                  </View>
                );
              }}
            />
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default LandingPage;
