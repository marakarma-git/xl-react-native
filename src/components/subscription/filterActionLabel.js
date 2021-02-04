import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import {subscriptionStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constant/color';
const FilterActionLabel = (props) => {
  return (
    <View style={subscriptionStyle.wrapperMenuOption}>
      <TouchableOpacity style={subscriptionStyle.menuOption}>
        <Text style={subscriptionStyle.textOption}>Actions</Text>
        <View style={subscriptionStyle.menuOptionChevronDown}>
          <MaterialCommunityIcons
            name={'chevron-down'}
            color={colors.gray}
            size={26}
          />
        </View>
      </TouchableOpacity>
      <Text style={subscriptionStyle.textMenuTotal}>
        Total: 50.000 | Filtered: 5 | Selected: 1
      </Text>
    </View>
  );
};
FilterActionLabel.propTypes = {};
export default FilterActionLabel;
