import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryLine,
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
import {View, Dimensions} from 'react-native';
import Orientation from '../../helpers/orientation';
import {LinearGradient, Svg, Stop} from 'react-native-svg';

import PropTypes from 'prop-types';
import Helper from '../../helpers/helper';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constant/color';
import EmptyChartComponent from '../chart/emptyChart';

const VictoryVoronoiZoomContainer = createContainer('voronoi', 'zoom');

const DayMonthChart = (props) => {
  const navigation = useNavigation();
  const {monthUsage, cummulativeMonthUsage} = useSelector(
    (state) => state.dashboard_reducer,
  );
  const [orientation, setOrientation] = useState('potrait');
  const [activeBarIndex, setActiveBarIndex] = useState(null);

  const chartType = (type) => {
    switch (type) {
      case 'day':
        return <VolumeChart dataSet={monthUsage} orientation={orientation} />;
      case 'cumulative':
        return (
          <CumulativeMonthChart
            dataSet={cummulativeMonthUsage}
            orientation={orientation}
          />
        );
      case 'both':
        return (
          <BothChart
            volumeData={monthUsage}
            cumulativeData={cummulativeMonthUsage}
            orientation={orientation}
          />
        );

      default:
        return;
    }
  };

  const generateChart = () => (
    <View style={{position: 'relative'}}>{chartType(props.chartType)}</View>
  );

  const generateView = () => {
    return (
      <View style={{paddingLeft: 10}}>{monthUsage && generateChart()}</View>
    );
  };

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      //
    });

    detectOrientation();

    return pageLoad;
  }, [navigation]);
  return <>{generateView()}</>;
};

const VolumeChart = ({dataSet, orientation}) => {
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
                <VictoryLabel dx={8} style={{fontSize: 10}} />
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

const CumulativeMonthChart = ({dataSet, orientation}) => {
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
                voronoiBlacklist={['line1']}
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
                <VictoryLabel dx={8} style={{fontSize: 10}} />
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
              <VictoryLine
                name="line1"
                style={{
                  data: {strokeWidth: 2, stroke: '#0E83F4'},
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

const BothChart = ({volumeData, cumulativeData, orientation}) => {
  return (
    <>
      {volumeData.length > 0 && cumulativeData.length > 0 ? (
        <Svg>
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 140 : 60)
            }
            padding={{top: 30, left: 70, bottom: 70}}
            domain={[1, cumulativeData.length]}
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
                      cumulativeData.map(function (o) {
                        return o.y + o.y / 5;
                      }),
                    ),
                  ],
                }}
                voronoiBlacklist={['line1', 'area1']}
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
                <VictoryLabel dx={8} style={{fontSize: 10}} />
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
            <VictoryLine
              name="line1"
              style={{
                data: {strokeWidth: 2, stroke: '#0E83F4'},
              }}
              data={cumulativeData}
            />
            <VictoryScatter
              style={{
                data: {fill: 'white', stroke: '#0E83F4', strokeWidth: 3},
              }}
              labels={({datum}) => datum.tooltipValue}
              data={cumulativeData}
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
            <VictoryArea
              name="area1"
              style={{
                data: {fill: 'url(#colorUv)', stroke: '#0E83F4'},
              }}
              data={volumeData}
            />
            <VictoryScatter
              style={{
                data: {fill: 'white', stroke: '#0E83F4', strokeWidth: 3},
              }}
              labels={({datum}) => datum.tooltipValue}
              data={volumeData}
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

DayMonthChart.propTypes = {
  chartType: PropTypes.string,
};
DayMonthChart.defaultProps = {
  chartType: 'day',
};

export default DayMonthChart;
