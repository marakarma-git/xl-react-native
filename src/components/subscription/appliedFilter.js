import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../constant/color';
import {border_radius} from '../../constant/config';
const AppliedFilter = (props) => {
  const {data} = props || {};
  //please make sure the array object looks like this
  // {
  //   type:"filter type",
  //   title: 'value that applied in filter Type'
  // }
  return (
    <View style={{marginHorizontal: 16, marginVertical: 4}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((value) => {
          const {type, title} = value || {};
          return (
            <Text
              style={{
                backgroundColor: colors.green_filter_text,
                marginRight: 8,
                color: 'white',
                borderRadius: border_radius,
                paddingVertical: 2,
                paddingHorizontal: 6,
              }}>
              {`${type}: ${title}`}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
};
AppliedFilter.propTypes = {
  data: PropTypes.array,
};
export default AppliedFilter;
