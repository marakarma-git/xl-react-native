import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../constant/color';
import {border_radius} from '../../constant/config';
import lod from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
const LocalComponent = (props) => {
  const {type, title, onDelete} = props || '';
  return (
    <View
      style={{
        backgroundColor: colors.green_filter_text,
        marginRight: 8,
        borderRadius: border_radius,
        paddingVertical: 2,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={{flex: 1, color: 'white'}}>{`${type}: ${title}`}</Text>
      {/*<TouchableOpacity onPress={onDelete} style={{paddingLeft: 6}}>*/}
      {/*  <MaterialCommunityIcons*/}
      {/*    name={'close-circle'}*/}
      {/*    color={colors.gray}*/}
      {/*    size={18}*/}
      {/*  />*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};
const AppliedFilter = (props) => {
  const {data, onDelete} = props || {};
  return (
    <View style={{marginHorizontal: 16, marginVertical: 4}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.length > 0 &&
          data.map((value) => {
            const {
              typeInput,
              config,
              value: valueInput,
              selectedValue,
              isSelected,
            } = value || {};
            const {label: labelValue} = valueInput || {};
            const {label} = config || {};
            if (!lod.isEmpty(valueInput) || isSelected) {
              return (
                <LocalComponent
                  type={label}
                  title={
                    typeInput === 'DropDownType2'
                      ? `${valueInput} ${selectedValue.label || 'Bytes'}`
                      : typeInput === 'DateTimePicker'
                      ? dayjs(valueInput).format('DD-MM-YYYY')
                      : labelValue || valueInput
                  }
                  onDelete={() => onDelete(value)}
                />
              );
            } else {
              return null;
            }
          })}
      </ScrollView>
    </View>
  );
};
AppliedFilter.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
};
AppliedFilter.defaultProps = {
  data: [],
  onDelete: () => {},
};
export default AppliedFilter;
