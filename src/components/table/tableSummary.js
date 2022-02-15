import {TouchableOpacity, View} from 'react-native';
import {analyticStyle} from '../../style';
import Text from '../global/text';
import PropTypes from 'prop-types';
import React from 'react';

const TableSummary = (props) => {
  const {data, onPress} = props || {};
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
            <TouchableOpacity
              style={analyticStyle.containerTable}
              onPress={() => onPress({label, value, color, percentage})}>
              <ProductivityTableLabel
                label={label}
                color={color}
                percentage={percentage === 0 ? '0' : percentage}
              />
              <View style={analyticStyle.textRight}>
                <Text>{value}</Text>
              </View>
            </TouchableOpacity>
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
  onPress: PropTypes.func,
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
