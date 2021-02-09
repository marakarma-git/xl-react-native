import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Container from './container';
import {subscriptionStyle} from '../../style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constant/color';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const SearchHeader = (props) => {
  const navigation = useNavigation();
  const {value, onChangeText, loading, onClickColumn} = props || {};
  return (
    <Container style={subscriptionStyle.containerMargin}>
      <View style={subscriptionStyle.containerTextInput2}>
        <View
          style={[
            subscriptionStyle.containerTextInput,
            {backgroundColor: loading ? colors.gray_button : null},
          ]}>
          <FontAwesome
            style={{marginHorizontal: 8}}
            name={'search'}
            color={colors.gray_0}
            size={15}
          />
          <TextInput
            value={value}
            editable={!loading}
            onChangeText={onChangeText}
            style={{flex: 1, fontSize: 11}}
            placeholder={'Search with IMSI, MSISDN, ICCID, Detected IMEI'}
          />
        </View>
        {loading ? (
          <ActivityIndicator size={26} color={colors.button_color_one} />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('SubscriptionFilter')}>
            <MaterialCommunityIcon
              name={'filter'}
              size={26}
              color={colors.gray}
            />
          </TouchableOpacity>
        )}
        <View style={subscriptionStyle.spacer} />
        {loading ? (
          <ActivityIndicator size={26} color={colors.button_color_one} />
        ) : (
          <TouchableOpacity onPress={onClickColumn}>
            <Ionicons name={'settings-sharp'} size={22} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
};
SearchHeader.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  loading: PropTypes.bool,
  onClickColumn: PropTypes.func,
};
SearchHeader.defaultProps = {
  showMenu: false,
  onChangeText: () => {},
  onClickColumn: () => {},
};
export default SearchHeader;
