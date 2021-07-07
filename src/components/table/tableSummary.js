import {View} from 'react-native';
import {analyticStyle} from '../../style';
import Text from '../global/text';
import PropTypes from 'prop-types';
import React from 'react';

const TableSummary = (props) => {
  const {data} = props || {};
  return (
    <>
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
      {data &&
        data.length > 0 &&
        data.map(({label, value}) => {
          return (
            <View style={analyticStyle.containerTable}>
              <View style={analyticStyle.containerChild}>
                <View style={analyticStyle.outerCircle}>
                  <View style={analyticStyle.innerCircle} />
                </View>
                <Text style={{flex: 1}} fontType={'bold'}>
                  {label}
                </Text>
              </View>
              <View style={analyticStyle.textRight}>
                <Text>{value}</Text>
              </View>
            </View>
          );
        })}
    </>
  );
};
TableSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOf({
      label: PropTypes.string,
      value: PropTypes.string,
      color: PropTypes.string,
    }),
  ),
};
export default TableSummary;
