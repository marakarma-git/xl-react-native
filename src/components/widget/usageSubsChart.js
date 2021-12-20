import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Helper from '../../helpers/helper';
import styles from '../../style/usageAnalytics.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Orientation from '../../helpers/orientation';
import {View} from 'react-native';
import {NoDataText, Text} from '../index';
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
  createContainer,
} from 'victory-native';
import {colors} from '../../constant/color';
import {TouchableOpacity, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

const UsageSubsChart = (props) => {
  const dataSet =
    useSelector((state) => state.dashboard_reducer.subsAnalytics) || [];
  const [chartDetail, setChartDetail] = useState(null);
  const [isActiveSubsVisible, setIsActiveSubsVisible] = useState(true);
  const [isUsageVisible, setIsUsageVisible] = useState(true);
  const [orientation, setOrientation] = useState('potrait');
  // Create Custom Chart Container
  const VictoryVoronoiZoomContainer = createContainer('voronoi', 'zoom');
  const legendData = [
    {
      name: 'Active Subs',
      symbol: {
        fill: 'white',
        stroke: colors.chart_line_blue,
        strokeWidth: 3,
        symbol: 'round',
      },
      onClick: () => setIsActiveSubsVisible(!isActiveSubsVisible),
      isVisible: isActiveSubsVisible,
    },
    {
      name: 'Usage (GB)',
      symbol: {
        fill: 'white',
        stroke: colors.chart_line_red,
        strokeWidth: 3,
        symbol: 'round',
      },
      onClick: () => setIsUsageVisible(!isUsageVisible),
      isVisible: isUsageVisible,
    },
  ];
  // Call Function
  const _callDailyChart = (param) => {
    props.getDailyChart(props.dailyWidget[0], {
      param3: Helper.monthlyUsageParams(param),
    });
    setChartDetail(null);
  };

  //Normalize Function
  const maxima = dataSet.map((dataset) => Math.max(...dataset.map((d) => d.y)));
  const _showChartDetail = (data) => {
    const {childName, x, y} = data;
    let title = 'Usage (GB)';
    let xValue = Helper.convertUnit(y);
    let baseColor = colors.chart_line_red;
    if (childName === 'actSubs') {
      title = 'Active Sub';
      xValue = y;
      baseColor = colors.chart_line_blue;
    }
    if (dataSet[0].length <= 13) {
      setChartDetail({
        title,
        month: x,
        value: xValue,
        baseColor,
      });
    }
  };
  const manipulateValue = (datum, normalize) => {
    let normalizeVal = normalize > 0 ? normalize : 1;
    if (datum.y > 0) {
      return datum?.y / normalizeVal;
    } else {
      return null;
    }
  };

  // Render Function
  const _generateView = () => (
    <View
      style={{
        width: '95%',
        alignItems: 'center',
        marginLeft: '6%',
      }}>
      <CustomChartLegend legendList={legendData} />
      {dataSet && renderChart()}
      {chartDetail && (
        <View
          style={[styles.detailContainer, {borderColor: colors.card_border}]}>
          <View style={styles.detailLeftWrapper}>
            <Text fontType="bold" style={styles.detailChartTitle}>
              {chartDetail?.title || '-'}
            </Text>
            <Text style={styles.detailChartText}>
              {chartDetail?.month || '-'}: {chartDetail?.value || '-'}
            </Text>
          </View>
          <View style={styles.detailRightWrapper}>
            <TouchableOpacity
              onPress={() => _callDailyChart(chartDetail?.month)}
              style={[
                styles.buttonDaily,
                {backgroundColor: chartDetail?.baseColor},
              ]}>
              <Text style={styles.buttonText}>View Daily</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
  const _generateActiveSubs = () => {
    return (
      <>
        {dataSet.length > 0 ? (
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 120 : 30)
            }
            containerComponent={
              <VictoryVoronoiZoomContainer
                allowZoom={true}
                zoomDimension="x"
                zoomDomain={{x: [1, 6]}}
                voronoiBlacklist={['line1', 'line2']}
                onActivated={(points) => _showChartDetail(points[0])}
              />
            }>
            <VictoryAxis
              dependentAxis
              offsetX={
                orientation === 'landscape'
                  ? Orientation.getWidth() -
                    (orientation === 'landscape' ? 170 : 30)
                  : 330
              }
              label={`Total Active Subscribers`}
              standalone={true}
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[1] === 0 && [0]}
              axisLabelComponent={<VictoryLabel angle dy={-110} />}
              tickFormat={(t) => Helper.formatAmount(t * maxima[1])}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabel: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -15},
                tickLabels: {
                  fill: colors.gray,
                  textAnchor: 'start',
                  fontSize: 10,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              offsetX={50}
              label={`Usage (GB)`}
              standalone={true}
              tickFormat={(t) => ''}
              axisLabelComponent={
                <VictoryLabel angle dy={-110} style={{fontSize: 9}} />
              }
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[0] === 0 && [0]}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabels: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -8},
                tickLabels: {fill: colors.gray, fontSize: 9},
              }}
            />
            <VictoryAxis
              crossAxis
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                tickLabels: {fill: 'grey', fontSize: 10},
              }}
              t
              tickLabelComponent={
                <VictoryLabel dx={-10} angle={-15} style={{fontSize: 10}} />
              }
            />
            <VictoryLine
              name="line1"
              style={{
                data: {strokeWidth: 1, stroke: colors.chart_line_blue},
              }}
              data={dataSet[1]}
              y={(datum) => manipulateValue(datum, maxima[1])}
            />
            <VictoryScatter
              name="actSubs"
              style={{
                data: {
                  fill: 'white',
                  stroke: colors.chart_line_blue,
                  strokeWidth: 3,
                },
              }}
              data={dataSet[1]}
              y={(datum) => manipulateValue(datum, maxima[1])}
              labels={(datum) =>
                `Active Subs\n ${datum.data[datum.index].x}: ${
                  datum.data[datum.index].y
                }`
              }
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  renderInPortal={false}
                  orientation={'left'}
                  flyoutStyle={{
                    fill: 'white',
                    stroke: colors.chart_line_blue,
                    strokeWidth: 1,
                    fontSize: 9,
                  }}
                  labelComponent={<VictoryLabel style={{fontSize: 10}} />}
                />
              }
            />
          </VictoryChart>
        ) : (
          <NoDataText />
        )}
      </>
    );
  };
  const _generateEmptyChart = () => {
    return (
      <>
        {dataSet.length > 0 ? (
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 120 : 30)
            }
            containerComponent={
              <VictoryVoronoiZoomContainer
                allowZoom={true}
                zoomDimension="x"
                zoomDomain={{x: [1, 6]}}
                voronoiBlacklist={['line1', 'line2']}
                onActivated={(points) => _showChartDetail(points[0])}
              />
            }>
            <VictoryAxis
              dependentAxis
              offsetX={
                orientation === 'landscape'
                  ? Orientation.getWidth() -
                    (orientation === 'landscape' ? 170 : 30)
                  : 330
              }
              label={`Total Active Subscribers`}
              standalone={true}
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[1] === 0 && [0]}
              axisLabelComponent={<VictoryLabel angle dy={-110} />}
              tickFormat={(t) => ''}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabel: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -15},
                tickLabels: {
                  fill: colors.gray,
                  textAnchor: 'start',
                  fontSize: 10,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              offsetX={50}
              label={`Usage (GB)`}
              standalone={true}
              tickFormat={(t) => ''}
              axisLabelComponent={
                <VictoryLabel angle dy={-110} style={{fontSize: 9}} />
              }
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[0] === 0 && [0]}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabels: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -8},
                tickLabels: {fill: colors.gray, fontSize: 9},
              }}
            />
            <VictoryAxis
              crossAxis
              tickFormat={(t) => ''}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                tickLabels: {fill: 'grey', fontSize: 10},
              }}
              t
              tickLabelComponent={
                <VictoryLabel dx={-10} angle={-15} style={{fontSize: 10}} />
              }
            />
          </VictoryChart>
        ) : (
          <NoDataText />
        )}
      </>
    );
  };
  const _generateUsageChart = () => {
    return (
      <>
        {dataSet.length > 0 ? (
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 120 : 30)
            }
            containerComponent={
              <VictoryVoronoiZoomContainer
                allowZoom={true}
                zoomDimension="x"
                zoomDomain={{x: [1, 6]}}
                voronoiBlacklist={['line1', 'line2']}
                onActivated={(points) => _showChartDetail(points[0])}
              />
            }>
            <VictoryAxis
              dependentAxis
              offsetX={50}
              label={`Usage (GB)`}
              standalone={true}
              tickFormat={(t) => Helper.convertUnit(t * maxima[0])}
              axisLabelComponent={
                <VictoryLabel angle dy={-110} style={{fontSize: 9}} />
              }
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[0] === 0 && [0]}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabels: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -8},
                tickLabels: {fill: colors.gray, fontSize: 9},
              }}
            />
            <VictoryAxis
              dependentAxis
              offsetX={
                orientation === 'landscape'
                  ? Orientation.getWidth() -
                    (orientation === 'landscape' ? 170 : 30)
                  : 330
              }
              label={`Total Active Subscribers`}
              standalone={true}
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[1] === 0 && [0]}
              axisLabelComponent={<VictoryLabel angle dy={-110} />}
              tickFormat={(t) => ''}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabel: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -15},
                tickLabels: {
                  fill: colors.gray,
                  textAnchor: 'start',
                  fontSize: 9,
                },
              }}
            />
            <VictoryAxis
              crossAxis
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                tickLabels: {fill: 'grey', fontSize: 10},
              }}
              t
              tickLabelComponent={
                <VictoryLabel dx={-10} angle={-15} style={{fontSize: 10}} />
              }
            />
            <VictoryLine
              name="line2"
              style={{
                data: {strokeWidth: 1, stroke: colors.chart_line_red},
              }}
              data={dataSet[0]}
              y={(datum) => manipulateValue(datum, maxima[0])}
            />
            <VictoryScatter
              name="usage"
              style={{
                data: {
                  fill: 'white',
                  stroke: colors.chart_line_red,
                  strokeWidth: 3,
                },
              }}
              data={dataSet[0]}
              y={(datum) => manipulateValue(datum, maxima[0])}
              labels={(datum) =>
                `Usage (GB)\n ${
                  datum.data[datum.index].x
                }: ${Helper.convertUnit(datum.data[datum.index].y)}`
              }
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  renderInPortal={false}
                  flyoutStyle={{
                    width: 100,
                    fill: 'white',
                    stroke: colors.chart_line_red,
                    strokeWidth: 1,
                  }}
                  labelComponent={<VictoryLabel style={{fontSize: 10}} />}
                />
              }
            />
          </VictoryChart>
        ) : (
          <NoDataText />
        )}
      </>
    );
  };
  const _generateChart = () => {
    return (
      <>
        {dataSet.length > 0 ? (
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 120 : 30)
            }
            containerComponent={
              <VictoryVoronoiZoomContainer
                allowZoom={true}
                zoomDimension="x"
                zoomDomain={{x: [1, 6]}}
                voronoiBlacklist={['line1', 'line2']}
                onActivated={(points) => _showChartDetail(points[0])}
              />
            }>
            <VictoryAxis
              dependentAxis
              offsetX={50}
              label={`Usage (GB)`}
              standalone={true}
              tickFormat={(t) => Helper.convertUnit(t * maxima[0])}
              axisLabelComponent={
                <VictoryLabel angle dy={-110} style={{fontSize: 9}} />
              }
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[0] === 0 && [0]}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabels: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -8},
                tickLabels: {fill: colors.gray, fontSize: 9},
              }}
            />
            <VictoryAxis
              dependentAxis
              offsetX={
                orientation === 'landscape'
                  ? Orientation.getWidth() -
                    (orientation === 'landscape' ? 170 : 30)
                  : 330
              }
              label={`Total Active Subscribers`}
              standalone={true}
              domain={{y: [0.5, 1.5]}}
              tickValues={maxima[1] === 0 && [0]}
              axisLabelComponent={<VictoryLabel angle dy={-110} />}
              tickFormat={(t) => Helper.formatAmount(t * maxima[1])}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabel: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -15},
                tickLabels: {
                  fill: colors.gray,
                  textAnchor: 'start',
                  fontSize: 9,
                },
              }}
            />
            <VictoryAxis
              crossAxis
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                tickLabels: {fill: 'grey', fontSize: 10},
              }}
              t
              tickLabelComponent={
                <VictoryLabel dx={-10} angle={-15} style={{fontSize: 10}} />
              }
            />
            <VictoryLine
              name="line1"
              style={{
                data: {strokeWidth: 1, stroke: colors.chart_line_blue},
              }}
              data={dataSet[1]}
              y={(datum) => manipulateValue(datum, maxima[1])}
            />
            <VictoryScatter
              name="actSubs"
              style={{
                data: {
                  fill: 'white',
                  stroke: colors.chart_line_blue,
                  strokeWidth: 3,
                },
              }}
              data={dataSet[1]}
              y={(datum) => manipulateValue(datum, maxima[1])}
              labels={(datum) =>
                `Active Subs\n ${datum.data[datum.index].x}: ${
                  datum.data[datum.index].y
                }`
              }
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  renderInPortal={false}
                  flyoutStyle={{
                    fill: 'white',
                    stroke: colors.chart_line_blue,
                    strokeWidth: 1,
                    fontSize: 10,
                  }}
                  labelComponent={<VictoryLabel style={{fontSize: 10}} />}
                />
              }
            />
            <VictoryLine
              name="line2"
              style={{
                data: {strokeWidth: 1, stroke: colors.chart_line_red},
              }}
              data={dataSet[0]}
              y={(datum) => manipulateValue(datum, maxima[0])}
            />
            <VictoryScatter
              name="usage"
              style={{
                data: {
                  fill: 'white',
                  stroke: colors.chart_line_red,
                  strokeWidth: 3,
                },
              }}
              data={dataSet[0]}
              y={(datum) => manipulateValue(datum, maxima[0])}
              labels={(datum) =>
                `Usage (GB)\n ${
                  datum.data[datum.index].x
                }: ${Helper.convertUnit(datum.data[datum.index].y)}`
              }
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  renderInPortal={false}
                  flyoutStyle={{
                    width: 100,
                    fill: 'white',
                    stroke: colors.chart_line_red,
                    strokeWidth: 1,
                  }}
                  labelComponent={<VictoryLabel style={{fontSize: 10}} />}
                />
              }
            />
          </VictoryChart>
        ) : (
          <NoDataText />
        )}
      </>
    );
  };
  // End Render Function
  const renderChart = () => {
    if (isUsageVisible && isActiveSubsVisible) return _generateChart();
    else if (!isUsageVisible && isActiveSubsVisible)
      return _generateActiveSubs();
    else if (isUsageVisible && !isActiveSubsVisible)
      return _generateUsageChart();
    else return _generateEmptyChart();
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
    detectOrientation();
  }, []);

  return <>{_generateView()}</>;
};

const CustomChartLegend = ({legendList = []}) => {
  return (
    <View style={styles.customChartContainer}>
      {legendList.map((legend) => (
        <TouchableOpacity
          onPress={() => {
            legend.onClick();
          }}
          style={styles.legendWrapper}>
          <FontAwesome
            name="circle-o"
            size={11}
            color={legend.isVisible ? legend.symbol.stroke : 'gray'}
          />
          <Text
            style={{
              paddingLeft: 5,
              fontSize: 11,
              color: legend.isVisible ? 'black' : 'gray',
            }}>
            {legend.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

UsageSubsChart.defaultProps = {
  getDailyChart: () => {},
  dailyWidget: [],
};
UsageSubsChart.propTypes = {
  getDailyChart: PropTypes.func,
  dailyWidget: PropTypes.array,
};

export default UsageSubsChart;
