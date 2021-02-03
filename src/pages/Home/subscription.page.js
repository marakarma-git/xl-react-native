import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {subscriptionStyle} from '../../style';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../constant/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {updateDataSearchText} from '../../redux/action/dynamic_array_filter_action';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {border_radius} from '../../constant/config';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = (props) => {
  const {style, children} = props;
  return (
    <View style={[subscriptionStyle.localContainer, style]}>{children}</View>
  );
};
const Subscription = ({navigation}) => {
  const dispatch = useDispatch();
  const {searchText} = useSelector(
    (state) => state.dynamic_array_filter_reducer,
  );
  return (
    <HeaderContainer navigation={navigation} headerTitle={'Subscription'}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <OverlayBackground />
        <Container style={{marginTop: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
                style={{flex: 1, fontSize: 11}}
                placeholder={'Search with IMSI, MSISDN, ICCID, Detected IMEI'}
              />
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcon
                name={'filter'}
                size={26}
                color={colors.gray}
              />
            </TouchableOpacity>
            <View
              style={{
                height: '50%',
                width: 1,
                backgroundColor: colors.gray,
                marginHorizontal: 8,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('SubscriptionFilter')}>
              <Ionicons name={'settings-sharp'} size={22} color={colors.gray} />
            </TouchableOpacity>
          </View>
        </Container>
        <View
          style={{
            marginHorizontal: 16,
            paddingVertical: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: border_radius,
              borderWidth: 1,
              borderColor: colors.gray,
              flexDirection: 'row',
            }}>
            <Text style={{paddingVertical: 4, paddingHorizontal: 16}}>
              Actions
            </Text>
            <View
              style={{
                backgroundColor: colors.gray_0,
                borderRadius: border_radius - 1,
                justifyContent: 'center',
                paddingHorizontal: 4,
              }}>
              <MaterialCommunityIcons
                name={'chevron-down'}
                color={colors.gray}
                size={26}
              />
            </View>
          </TouchableOpacity>
          <Text style={{color: colors.font_gray, flex: 1, marginLeft: 12}}>
            Total: 50.000 | Filtered: 5 | Selected: 1
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'tomato'}}>
          <ScrollView>
            <Text>tengah</Text>
          </ScrollView>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 6,
            paddingRight: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: colors.font_gray}}>View: </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingLeft: 6,
                borderRadius: border_radius,
                borderWidth: 1,
                borderColor: colors.gray_0,
              }}>
              <Text style={{color: colors.font_gray}}>20</Text>
              <MaterialCommunityIcons
                name={'chevron-down'}
                color={colors.gray}
                size={20}
              />
            </TouchableOpacity>
            <Text style={{color: colors.font_gray}}> per page</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <MaterialIcons
                name={'skip-previous'}
                color={colors.gray}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={'chevron-left'}
                color={colors.gray}
                size={28}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                paddingVertical: 0,
                borderWidth: 1,
                borderColor: colors.gray_0,
                paddingHorizontal: 8,
              }}
            />
            <Text style={{color: colors.font_gray}}> of 50.000</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={'chevron-right'}
                color={colors.gray}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name={'skip-next'} color={colors.gray} size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </HeaderContainer>
  );
};
export default Subscription;
