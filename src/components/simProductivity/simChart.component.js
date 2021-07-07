import {VictoryLabel, VictoryPie} from 'victory-native';
import {analyticStyle} from '../../style';
import Svg from 'react-native-svg';
import React from 'react';
import PropTypes from 'prop-types';
const SimChart = (props) => {
  const {widthChart, onPressPie, data, dataColor} = props || {};
  return (
    <Svg width={widthChart - widthChart * 0.1} height={widthChart}>
      <VictoryPie
        colorScale={dataColor}
        width={widthChart - widthChart * 0.1}
        height={widthChart}
        padding={analyticStyle.paddingChart}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPressIn: () => {
                return [
                  {
                    target: 'data',
                    mutation: ({slice, ...props}) => {
                      onPressPie(props);
                      return null;
                    },
                  },
                ];
              },
            },
          },
        ]}
        data={data}
        labelComponent={
          <VictoryLabel
            dy={15}
            dx={10}
            text={({datum}) => [`${datum.label}`, `(${datum.percentage}%)  `]}
            verticalAnchor={'middle'}
            style={analyticStyle.labelChart}
          />
        }
      />
    </Svg>
  );
};
SimChart.propTypes = {
  widthChart: PropTypes.number.isRequired,
  onPressPie: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.objectOf({
      y: PropTypes.number.isRequired,
      label: PropTypes.string,
      percentage: PropTypes.string,
      ...PropTypes.any,
    }),
  ),
  dataColor: PropTypes.arrayOf(PropTypes.string),
};
SimChart.defaultProps = {
  onPressPie: () => {},
};
export default SimChart;
