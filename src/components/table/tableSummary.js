import {View} from 'react-native';
import {analyticStyle} from '../../style';
import Text from '../global/text';
import PropTypes from 'prop-types';
import React from 'react';

const TableSummary = (props) => {
  const {data} = props || {};
  return (
    <View style={{marginTop: 24}}>
      {data && data.length > 0 && (
        <View style={analyticStyle.containerTable}>
          <Text fontType={'bold'} style={{fontSize: 16}}>
            Productivity Level
          </Text>
          <Text>
            %{' '}
            <Text fontType={'bold'} style={{fontSize: 16}}>
              of Quota usage
            </Text>
          </Text>
        </View>
      )}
      {data &&
        data.length > 0 &&
        data.map(({label, value, color, percentage}) => {
          return (
            <View style={analyticStyle.containerTable}>
              <ProductivityTableLabel
                label={label}
                color={color}
                // percentage={percentage}
              />
              <View style={analyticStyle.textRight}>
                <Text>{value}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};
TableSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf({
      label: PropTypes.string,
      value: PropTypes.string,
      color: PropTypes.string,
    }),
  ),
};
export default TableSummary;
const ProductivityTableLabel = ({color, label, percentage}) => {
  return (
    <View style={analyticStyle.containerChild}>
      <View style={[analyticStyle.outerCircle, {backgroundColor: color}]}>
        <View style={analyticStyle.innerCircle} />
      </View>
      <Text style={{flex: 1}}>
        <Text fontType={'bold'}>{label}</Text>
        {percentage && ` (${percentage}%)`}
      </Text>
    </View>
  );
};
export {ProductivityTableLabel};
