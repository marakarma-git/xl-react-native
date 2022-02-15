import {
  VictoryLabel,
  VictoryPie,
  VictoryVoronoiContainer,
} from 'victory-native';
import {analyticStyle} from '../../style';
import Svg from 'react-native-svg';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
const SimChart = (props) => {
  const [localBool, setLocalBool] = useState(false);
  const [dataDatum, setDataDatum] = useState({});
  const {widthChart, onPressPie, data, dataColor} = props || {};
  const isNoUsage = data[0].label === 'No Usage' && data.length === 1;
  useEffect(() => {
    if (localBool === true) {
      onPressPie(dataDatum);
    }
  }, [dataDatum]);
  const _onPressPie = (thisData) => {
    setLocalBool(true);
    setDataDatum({
      ...thisData,
    });
    return {
      active: undefined,
    };
  };
  const _onLongPress = (a) => {
    setLocalBool(false);
    return {
      active: true,
    };
  };
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
                    target: 'labels',
                    mutation: _onPressPie,
                  },
                ];
              },
              onPressOut: () => {
                return [
                  {
                    target: 'labels',
                    mutation: () => {
                      return {
                        active: undefined,
                      };
                    },
                  },
                ];
              },
              onLongPress: () => {
                return [
                  {
                    target: 'labels',
                    eventKey: 'all',
                    mutation: _onLongPress,
                  },
                ];
              },
            },
          },
        ]}
        data={!isNoUsage ? data : [{y: 100}]}
        labelComponent={
          <VictoryLabel
            dy={15}
            dx={10}
            text={({datum}) => [`${datum.label}`, `(${datum.percentage}%)  `]}
            verticalAnchor={'middle'}
            style={analyticStyle.labelChart}
          />
        }
        containerComponent={
          <VictoryVoronoiContainer
            labelComponent={
              <VictoryLabel
                dy={15}
                dx={10}
                text={({datum}) => [
                  `${datum.label}`,
                  `(${datum.percentage}%)  `,
                ]}
                verticalAnchor={'middle'}
                style={analyticStyle.labelChart}
              />
            }
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
