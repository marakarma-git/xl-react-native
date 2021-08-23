import React from 'react';
import {colors} from '../../constant/color';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../../components';

// Undestruct
import PropTypes from 'prop-types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterLabelComponent = (props) => {
  return (
    <View
      style={{
        backgroundColor: colors.green_filter_text,
        height: 20,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 7,
        paddingVertical: 2,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white'}}>{`${props.title}: ${props.value}`}</Text>
      <TouchableOpacity style={{paddingLeft: 6}}>
        <MaterialCommunityIcon
          name={'close-circle'}
          color={'white'}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
};

FilterLabelComponent.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};
FilterLabelComponent.defaultProps = {
  title: '',
  value: '',
};

export default FilterLabelComponent;
