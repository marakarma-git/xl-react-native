import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Container from './container';
import {subscriptionStyle} from '../../style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constant/color';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const SearchHeader = (props) => {
  const {value, onChangeText} = props || {};
  const {navigation} = useNavigation();
  return (
    <Container style={subscriptionStyle.containerMargin}>
      <View style={subscriptionStyle.containerTextInput2}>
        <View style={subscriptionStyle.containerTextInput}>
          <FontAwesome
            style={{marginHorizontal: 8}}
            name={'search'}
            color={colors.gray_0}
            size={15}
          />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={{flex: 1, fontSize: 11}}
            placeholder={'Search with IMSI, MSISDN, ICCID, Detected IMEI'}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SubscriptionFilter')}>
          <MaterialCommunityIcon
            name={'filter'}
            size={26}
            color={colors.gray}
          />
        </TouchableOpacity>
        <View style={subscriptionStyle.spacer} />
        <TouchableOpacity>
          <Ionicons name={'settings-sharp'} size={22} color={colors.gray} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};
SearchHeader.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};
export default SearchHeader;
