import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
} from 'victory-native';
import Orientation from '../../helpers/orientation';
import {LinearGradient, Svg, Stop} from 'react-native-svg';

const EmptyChartComponent = (props) => {
  return (
    <Svg>
      <VictoryChart width={Orientation.getWidth() - 20}>
        <VictoryAxis
          dependentAxis
          label={'Data volumes'}
          axisLabelComponent={<VictoryLabel dy={-10} />}
          standalone={true}
          fixLabelOverlap
          tickFormat={(t) => ''}
          tickLabelComponent={<VictoryLabel dx={5} style={{fontSize: 10}} />}
        />
        <VictoryAxis
          crossAxis
          axisLabelComponent={<VictoryLabel dy={10} />}
          standalone={false}
          tickFormat={(t) => ''}
          tickLabelComponent={<VictoryLabel dx={-10} style={{fontSize: 10}} />}
        />
        <LinearGradient
          id="colorUv"
          x1="0"
          y1="0.5"
          x2="0"
          y2="0.2"
          spreadMethod="pad">
          <Stop offset="20%" stopColor="#0E83F4" />
          <Stop offset="80%" stopColor="#2BC6DA" />
        </LinearGradient>
        <VictoryLegend
          y={260}
          x={Orientation.getWidth() / 2 - 140}
          title=""
          centerTitle
          orientation="horizontal"
          gutter={25}
          style={{labels: {fontSize: 11}}}
          data={[
            {
              name: 'Cumulative Month Values',
              symbol: {
                fill: 'white',
                stroke: '#0E83F4',
                strokeWidth: 2,
                symbol: 'round',
              },
            },
            {
              name: 'Day Volume',
              symbol: {fill: 'url(#colorUv)', type: 'square'},
            },
          ]}
        />
      </VictoryChart>
    </Svg>
  );
};

export default EmptyChartComponent;
