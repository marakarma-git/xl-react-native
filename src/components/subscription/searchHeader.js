import React, {useState, useEffect} from 'react';
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
import Text from '../global/text';
import {border_radius} from '../../constant/config';
const SearchHeader = (props) => {
  const navigation = useNavigation();
  const [refreshWidth, setRefreshWidth] = useState('99%');
  const [changeText, setChangeText] = useState('');
  const {
    value,
    placeholder,
    onChangeText,
    onSubmitEditing,
    loading,
    onClickColumn,
    navigateTo,
    swapWithButton,
    onPressButton,
  } = props || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      setRefreshWidth('100%');
    }, 100);
    return () => timer;
  });
  return (
    <Container style={subscriptionStyle.containerMargin}>
      <View style={subscriptionStyle.containerTextInput2}>
        {!swapWithButton ? (
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
            <View style={{flex: 1}}>
              <TextInput
                value={changeText}
                editable={!loading}
                onChangeText={(e) => setChangeText(e)}
                onSubmitEditing={() => onSubmitEditing(changeText)}
                style={{fontSize: 12, width: refreshWidth}}
                placeholder={value || placeholder || ''}
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={subscriptionStyle.createButton}
            onPress={onPressButton}>
            <Text fontType={'bold'} style={{color: 'white'}}>
              Create
            </Text>
          </TouchableOpacity>
        )}
        {loading ? (
          <ActivityIndicator size={26} color={colors.button_color_one} />
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
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
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  navigateTo: PropTypes.string.isRequired,
  swapWithButton: PropTypes.bool,
  onPressButton: PropTypes.func,
};
SearchHeader.defaultProps = {
  showMenu: false,
  onChangeText: () => {},
  onClickColumn: () => {},
  onSubmitEditing: () => {},
  navigateTo: '',
  onPressButton: () => {},
};
export default SearchHeader;
