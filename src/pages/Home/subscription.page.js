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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity>
              <FontAwesome5 name={'columns'} size={24} color={colors.gray} />
            </TouchableOpacity>
            <View
              style={{
                height: '100%',
                width: 2,
                backgroundColor: colors.gray,
                marginHorizontal: 12,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('SubscriptionFilter')}>
              <FontAwesome5 name={'filter'} size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>
        </Container>
        <View
          style={{
            marginHorizontal: 16,
            paddingVertical: 4,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{color: colors.font_gray}}>
            Total: 50.000 | Showing: 10
          </Text>
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
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
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
    </HeaderContainer>
  );
};
export default Subscription;
