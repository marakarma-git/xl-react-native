import {
  VictoryChart,
  VictoryContainer,
  VictoryPie,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';
import {analyticStyle} from '../../style';
import Svg from 'react-native-svg';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {colors} from '../../constant/color';
import {View} from 'react-native';
import {Text} from '..';
import Helper from '../../helpers/helper';
const SimChart = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [afterLongPress, setAfterLongPress] = useState(false);
  const {widthChart, onPressPie, data, dataColor} = props || {};
  const isNoUsage = data[0]?.label === 'No Usage' && data.length === 1;
  const _onPressIn = (thisData) => {
    setActiveIndex(thisData?.index);
    return {active: undefined};
  };

  const _onPressPie = (thisData) => {
    if (!afterLongPress) {
      onPressPie(thisData);
    }
    setAfterLongPress(false);
    return {
      active: undefined,
    };
  };
  const _onLongPress = (props) => {
    setAfterLongPress(true);
    return {
      active: props?.index === activeIndex && !props?.active ? true : undefined,
    };
  };
  return (
    <Svg width={widthChart - widthChart * 0.1} height={widthChart}>
      <VictoryPie
        standalone={false}
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
                    mutation: _onPressIn,
                  },
                ];
              },
              onPressOut: () => {
                return [
                  {
                    target: 'labels',
                    mutation: _onPressPie,
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
        containerComponent={<VictoryVoronoiContainer />}
        labelComponent={
          <VictoryTooltip
            constrainToVisibleArea
            orientation={'top'}
            renderInPortal={true}
            flyoutStyle={{stroke: colors.main_color, fill: 'white'}}
            flyoutHeight={40}
            flyoutWidth={120}
            labelComponent={<CustomLabel />}
          />
        }
      />
    </Svg>
  );
};
const CustomLabel = (props) => {
  const {text, datum, y, x} = props;
  return (
    <View style={[analyticStyle.customTooltip, {top: y - 15, left: x - 60}]}>
      <Text style={analyticStyle.customTooltipText}>{text}</Text>
      <Text style={analyticStyle.customTooltipText}>
        {Helper.numberFormat(datum.rest.value, '.')} :{' '}
        <Text fontType="semi-bold">{datum.percentage}%</Text>
      </Text>
    </View>
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
