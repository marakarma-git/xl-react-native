import React, {useEffect} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../constant/color';
import {HeaderContainer, OverlayBackground} from '../../components/index';
import InputHybrid from '../../components/InputHybrid';
import {subscriptionStyle} from '../../style';
import {Button} from 'react-native-elements';
import {resetDataFilter} from '../../redux/action/dynamic_array_filter_action';
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
  useEffect(() => {
    console.log('useEffectArray: ' + JSON.stringify(array_filter, null, 2));
  }, [array_filter]);
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
          <Button
            title={'reset coba'}
            onPress={() => dispatch(resetDataFilter(array_filter))}
          />
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
