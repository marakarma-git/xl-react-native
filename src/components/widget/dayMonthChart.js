import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryGroup,
  VictoryScatter,
  VictoryLegend,
} from 'victory-native';
import {View, Dimensions} from 'react-native';
import {Text} from '../index';
import Orientation from '../../helpers/orientation';
import {LinearGradient, Svg, Stop} from 'react-native-svg';

import PropTypes from 'prop-types';
import Helper from '../../helpers/helper';
import {NoDataText} from '..';
import {useNavigation} from '@react-navigation/native';

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
        return <VolumeChart dataSet={monthUsage} />;
      case 'cumulative':
        return <CumulativeMonthChart dataSet={cummulativeMonthUsage} />;
      case 'both':
        return (
          <BothChart
            volumeData={monthUsage}
            cumulativeData={cummulativeMonthUsage}
          />
        );

      default:
        return;
    }
  };

  const generateChart = () => (
    <View style={{position: 'relative', top: -20}}>
      {chartType(props.chartType)}
    </View>
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

const CustomLabel = (props) => {
  const {text, x, y} = props;

  let yPos = y - 10;
  let xPos = x - 80;

  return (
    <View
      style={{
        width: 160,
        position: 'absolute',
        top: yPos,
        left: xPos,
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 12, paddingLeft: 3}}>
        <Text style={{fontWeight: 'bold'}}>
          <Text style={{color: '#0266FF'}}>
            {String(text.x).replace('-', ' ')} :{' '}
          </Text>
          {Helper.tooltipConvertUnit(text.y)}
        </Text>
      </Text>
    </View>
  );
};

const VolumeChart = ({dataSet}) => {
  return (
    <>
      {dataSet.length > 0 ? (
        <Svg>
          <VictoryChart
            width={Orientation.getWidth() - 80}
            padding={{top: 30, left: 70, bottom: 70}}
            domain={[1, dataSet.length]}
            containerComponent={
              <VictoryZoomContainer
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
              label={'Data volume'}
              axisLabelComponent={<VictoryLabel dy={-30} />}
              standalone={true}
              fixLabelOverlap
              tickFormat={(t) => Helper.formatBytes(t)}
              tickLabelComponent={<VictoryLabel style={{fontSize: 10}} />}
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
                style={{
                  data: {fill: 'url(#colorUv)', stroke: '#0E83F4'},
                }}
                data={dataSet}
              />
              <VictoryScatter
                style={{
                  data: {fill: 'white', stroke: '#0E83F4', strokeWidth: 3},
                }}
                labels={({datum}) => datum.y}
                data={dataSet}
                labelComponent={<VictoryTooltip renderInPortal={false} />}
              />
            </VictoryGroup>
            <VictoryLegend
              y={260}
              x={Orientation.getWidth() / 2 - 180}
              title=""
              centerTitle
              orientation="horizontal"
              gutter={20}
              data={[
                {
                  name: 'Cumulative Month Values',
                  symbol: {
                    fill: 'white',
                    stroke: '#0E83F4',
                    strokeWidth: 3,
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
        <NoDataText />
      )}
    </>
  );
};

const CumulativeMonthChart = ({dataSet}) => {
  return (
    <>
      {dataSet.length > 0 ? (
        <Svg>
          <VictoryChart
            width={Orientation.getWidth() - 80}
            padding={{top: 30, left: 70, bottom: 70}}
            domain={[1, dataSet.length]}
            containerComponent={
              <VictoryZoomContainer
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
              label={'Data volume'}
              axisLabelComponent={<VictoryLabel dy={-30} />}
              standalone={true}
              fixLabelOverlap
              tickFormat={(t) => Helper.formatBytes(t)}
              tickLabelComponent={<VictoryLabel style={{fontSize: 10}} />}
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
                style={{
                  data: {strokeWidth: 2, stroke: '#0E83F4'},
                }}
                data={dataSet}
              />
              <VictoryScatter
                style={{
                  data: {fill: 'white', stroke: '#0E83F4', strokeWidth: 3},
                }}
                labels={({datum}) => datum.y}
                data={dataSet}
                labelComponent={<VictoryTooltip renderInPortal={false} />}
              />
            </VictoryGroup>
            <VictoryLegend
              y={260}
              x={Orientation.getWidth() / 2 - 180}
              title=""
              centerTitle
              orientation="horizontal"
              gutter={20}
              data={[
                {
                  name: 'Cumulative Month Values',
                  symbol: {
                    fill: 'white',
                    stroke: '#0E83F4',
                    strokeWidth: 1,
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
        <NoDataText />
      )}
    </>
  );
};

const BothChart = ({volumeData, cumulativeData}) => {
  return (
    <>
      {volumeData.length > 0 && cumulativeData.length > 0 ? (
        <Svg>
          <VictoryChart
            width={Orientation.getWidth() - 80}
            padding={{top: 30, left: 70, bottom: 70}}
            domain={[1, cumulativeData.length]}
            containerComponent={
              <VictoryZoomContainer
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
              label={'Data volume'}
              axisLabelComponent={<VictoryLabel dy={-30} />}
              standalone={true}
              fixLabelOverlap
              tickFormat={(t) => Helper.formatBytes(t)}
              tickLabelComponent={<VictoryLabel style={{fontSize: 10}} />}
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
                style={{
                  data: {strokeWidth: 2, stroke: '#0E83F4'},
                }}
                data={cumulativeData}
              />
              <VictoryScatter
                style={{
                  data: {fill: 'white', stroke: '#0E83F4', strokeWidth: 3},
                }}
                labels={({datum}) => datum.y}
                data={cumulativeData}
                labelComponent={<VictoryTooltip renderInPortal={false} />}
              />
              <VictoryArea
                style={{
                  data: {fill: 'url(#colorUv)', stroke: '#0E83F4'},
                }}
                data={volumeData}
              />
              <VictoryScatter
                style={{
                  data: {fill: 'white', stroke: '#0E83F4', strokeWidth: 3},
                }}
                labels={({datum}) => datum.y}
                data={volumeData}
                labelComponent={<VictoryTooltip renderInPortal={false} />}
              />
            </VictoryGroup>
            <VictoryLegend
              y={260}
              x={Orientation.getWidth() / 2 - 180}
              title=""
              centerTitle
              orientation="horizontal"
              gutter={20}
              data={[
                {
                  name: 'Cumulative Month Values',
                  symbol: {
                    fill: 'white',
                    stroke: '#0E83F4',
                    strokeWidth: 3,
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
        <NoDataText />
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
