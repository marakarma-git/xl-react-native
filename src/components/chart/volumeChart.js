import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryGroup,
  VictoryScatter,
  VictoryLegend,
  createContainer,
} from 'victory-native';
import {NoDataText} from '../index';
import Orientation from '../../helpers/orientation';
import {LinearGradient, Svg, Stop} from 'react-native-svg';
import {colors} from '../../constant/color';
import Helper from '../../helpers/helper';
import EmptyChartComponent from './emptyChart';

const VictoryVoronoiZoomContainer = createContainer('voronoi', 'zoom');

const VolumeChartComponent = (props) => {
  const {dataSet, orientation} = props;
  return (
    <>
      {dataSet.length > 0 ? (
        <Svg>
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 140 : 60)
            }
            padding={{top: 30, left: 70, bottom: 70}}
            domain={[1, dataSet.length]}
            containerComponent={
              <VictoryVoronoiZoomContainer
                allowZoom={false}
                zoomDimension="x"
                zoomDomain={{
                  x: [1, 7],
                  y: [
                    0,
                    Math.max.apply(
                      Math,
                      dataSet.map(function (o) {
                        return o.y + o.y / 5;
                      }),
                    ),
                  ],
                }}
                voronoiBlacklist={['area']}
              />
            }>
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
            <VictoryAxis
              dependentAxis
              label={'Data volumes'}
              axisLabelComponent={<VictoryLabel dy={-30} />}
              standalone={true}
              fixLabelOverlap
              tickFormat={(t) => Helper.formatBytes(t)}
              tickLabelComponent={
                <VictoryLabel dx={5} style={{fontSize: 10}} />
              }
            />
            <VictoryAxis
              crossAxis
              axisLabelComponent={<VictoryLabel dy={10} />}
              standalone={false}
              tickFormat={(t) => t.split('-')[2] + '.' + t.split('-')[1]}
              tickLabelComponent={
                <VictoryLabel dx={-10} style={{fontSize: 10}} />
              }
            />
            <VictoryGroup
              animate={{
                duration: 2000,
                onLoad: {duration: 1000},
              }}
              style={{
                data: {strokeWidth: 1},
              }}>
              <VictoryArea
                name="area"
                style={{
                  data: {fill: 'url(#colorUv)', stroke: '#0E83F4'},
                }}
                data={dataSet}
              />
              <VictoryScatter
                style={{
                  data: {fill: 'white', stroke: '#0E83F4', strokeWidth: 3},
                }}
                labels={({datum}) => datum.tooltipValue}
                data={dataSet}
                labelComponent={
                  <VictoryTooltip
                    constrainToVisibleArea
                    renderInPortal={false}
                    style={[
                      {fill: '#0E83F4', fontSize: 10},
                      {fill: 'black', fontSize: 10},
                      {fill: 'black', fontSize: 10},
                    ]}
                    flyoutStyle={{
                      fill: 'white',
                      stroke: colors.gray,
                      strokeWidth: 1,
                      fontSize: 10,
                      textAlign: 'left',
                    }}
                    flyoutPadding={{left: 10, right: 10}}
                  />
                }
              />
            </VictoryGroup>
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
      ) : (
        <EmptyChartComponent />
      )}
    </>
  );
};

VolumeChartComponent.propTypes = {
  dataSet: PropTypes.array,
  orientation: PropTypes.string,
};
VolumeChartComponent.defaultProps = {
  dataSet: [],
  orientation: 'potrait',
};

export default VolumeChartComponent;
