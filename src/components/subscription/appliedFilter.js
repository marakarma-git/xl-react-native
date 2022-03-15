import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Text from '../global/text';
import PropTypes from 'prop-types';
import {colors} from '../../constant/color';
import {border_radius} from '../../constant/config';
import lod from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon';
const LocalComponent = (props) => {
  const {type, title, onDelete, isRemoveDeleteIcon} = props || '';
  return (
    <View
      style={{
        backgroundColor: colors.checked_box,
        marginRight: 8,
        borderRadius: border_radius,
        paddingVertical: 2,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={{flex: 1, color: 'white'}}>{`${type}: ${title}`}</Text>
      {isRemoveDeleteIcon !== true && (
        <TouchableOpacity onPress={onDelete} style={{paddingLeft: 6}}>
          <MaterialCommunityIcons
            name={'close-circle'}
            color={'white'}
            size={18}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const AppliedFilter = (props) => {
  const {
    data,
    onDelete,
    withFilterButton,
    onPressFilter,
    isRemoveDeleteIcon,
    removeFilterButton,
  } = props || {};
  return (
    <View
      style={{
        marginHorizontal: !withFilterButton ? 16 : 0,
        marginVertical: 4,
        flexDirection: withFilterButton && 'row',
      }}>
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
                  isRemoveDeleteIcon={isRemoveDeleteIcon}
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
      {withFilterButton && !removeFilterButton && (
        <TouchableOpacity onPress={onPressFilter}>
          <MaterialCommunityIcon
            name={'filter'}
            size={26}
            color={colors.gray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
AppliedFilter.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  isRemoveDeleteIcon: PropTypes.bool, //only true for remove the button

  withFilterButton: PropTypes.bool,
  removeFilterButton: PropTypes.bool,
  onPressFilter: PropTypes.func,
};
AppliedFilter.defaultProps = {
  data: [],
  onDelete: () => {},

  onPressFilter: () => {},
};
export default AppliedFilter;
