import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../constant/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tableFooter from '../../style/tableFooter.style';
const TableFooter = (props) => {
  return (
    <View style={tableFooter.tableFooterWrapper}>
      <View style={tableFooter.row}>
        <Text style={tableFooter.fontColor}>View: </Text>
        <TouchableOpacity style={tableFooter.pageOptionWrapper}>
          <Text style={tableFooter.fontColor}>20</Text>
          <MaterialCommunityIcons
            name={'chevron-down'}
            color={colors.gray}
            size={20}
          />
        </TouchableOpacity>
        <Text style={tableFooter.fontColor}> per page</Text>
      </View>
      <View style={tableFooter.row}>
        <TouchableOpacity>
          <MaterialIcons name={'skip-previous'} color={colors.gray} size={28} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name={'chevron-left'}
            color={colors.gray}
            size={28}
          />
        </TouchableOpacity>
        <TextInput style={tableFooter.textInputPaging} />
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
  );
};
TableFooter.propTypes = {};
export default TableFooter;
