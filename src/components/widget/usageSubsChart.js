import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Helper from '../../helpers/helper';
import Orientation from '../../helpers/orientation';
import styles from '../../style/usageAnalytics.style';

import {View} from 'react-native';
import {NoDataText, Text} from '../index';
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
  VictoryLegend,
  createContainer,
} from 'victory-native';
import {colors} from '../../constant/color';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

// Dummy data
const data = [
  [
    {
      x: 'Sep-2020',
      y: 0,
    },
    {
      x: 'Oct-2020',
      y: 0,
    },
    {
      x: 'Nov-2020',
      y: 0,
    },
    {
      x: 'Dec-2020',
      y: 0,
    },
    {
      x: 'Jan-2021',
      y: 2781275254330,
    },
    {
      x: 'Feb-2021',
      y: 2409133579080,
    },
    {
      x: 'Mar-2021',
      y: 2442418645359,
    },
    {
      x: 'Apr-2021',
      y: 3574872171231,
    },
    {
      x: 'May-2021',
      y: 4134711742554,
    },
    {
      x: 'Jun-2021',
      y: 2620960428109,
    },
    {
      x: 'Jul-2021',
      y: 3483071671449,
    },
    {
      x: 'Aug-2021',
      y: 0,
    },
    {
      x: 'Sep-2021',
      y: 0,
    },
  ],
  [
    {
      x: 'Sep-2020',
      y: 0,
    },
    {
      x: 'Oct-2020',
      y: 0,
    },
    {
      x: 'Nov-2020',
      y: 0,
    },
    {
      x: 'Dec-2020',
      y: 144093,
    },
    {
      x: 'Jan-2021',
      y: 149661,
    },
    {
      x: 'Feb-2021',
      y: 157042,
    },
    {
      x: 'Mar-2021',
      y: 161979,
    },
    {
      x: 'Apr-2021',
      y: 166488,
    },
    {
      x: 'May-2021',
      y: 165771,
    },
    {
      x: 'Jun-2021',
      y: 0,
    },
    {
      x: 'Jul-2021',
      y: 0,
    },
    {
      x: 'Aug-2021',
      y: 0,
    },
    {
      x: 'Sep-2021',
      y: 180411,
    },
  ],
];

const legendData = [
  {
    name: 'Active Subs',
    symbol: {
      fill: 'white',
      stroke: '#0E83F4',
      strokeWidth: 3,
      symbol: 'round',
    },
  },
  {
    name: 'Usage (GB)',
    symbol: {
      fill: 'white',
      stroke: '#f86c6b',
      strokeWidth: 3,
      symbol: 'round',
    },
  },
];

const UsageSubsChart = (props) => {
  const tickValues = [0, 0.25, 0.5, 0.75, 1, 1.25];
  const dataSet = useSelector((state) => state.dashboard_reducer.subsAnalytics);
  const [orientation, setOrientation] = useState('potrait');
  const [chartDetail, setChartDetail] = useState(null);

  // Create Custom Chart Container
  const VictoryVoronoiZoomContainer = createContainer('voronoi', 'zoom');

  //Normalize Function
  const maxima = dataSet.map((dataset) => Math.max(...dataset.map((d) => d.y)));
  const _showChartDetail = (data) => {
    const {childName, x, y} = data;
    let title = 'Usage (GB)';
    let xValue = Helper.convertUnit(y);
    let baseColor = colors.chart_line_red;
    if (childName === 'actSubs') {
      title = 'Active Subs';
      xValue = Helper.formatAmount(y);
      baseColor = colors.chart_line_blue;
    }
    setChartDetail({
      title,
      month: x,
      value: xValue,
      baseColor,
    });
  };

  // Render Function
  const _generateView = () => (
    <View style={{paddingLeft: 10}}>
      {dataSet && _generateChart()}
      {chartDetail && (
        <View
          style={[
            styles.detailContainer,
            {borderColor: chartDetail?.baseColor},
          ]}>
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
                mouseFollowTooltips
                allowZoom={true}
                zoomDimension="x"
                zoomDomain={{x: [1, 6]}}
                voronoiBlacklist={['line1', 'line2']}
                onActivated={(points) => _showChartDetail(points[0])}
              />
            }>
            <VictoryAxis
              dependentAxis
              label="Usage (GB)"
              standalone={true}
              tickFormat={(t) => Helper.convertUnit(t * maxima[0])}
              axisLabelComponent={
                <VictoryLabel angle dy={-110} style={{fontSize: 10}} />
              }
              tickValues={tickValues}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabels: {fontSize: 10},
                grid: {stroke: colors.chart_axis_stroke},
                ticks: {padding: -5},
                tickLabels: {fill: colors.gray, fontSize: 10},
              }}
            />
            <VictoryAxis
              dependentAxis
              offsetX={330}
              label="Total Active Subscribers"
              standalone={true}
              axisLabelComponent={<VictoryLabel angle dy={-110} />}
              tickValues={tickValues}
              tickFormat={(t) => Helper.formatAmount(t * maxima[1])}
              style={{
                axis: {stroke: colors.chart_axis_stroke},
                axisLabel: {fontSize: 10},
                ticks: {padding: -15},
                tickLabels: {
                  fill: colors.gray,
                  textAnchor: 'start',
                  fontSize: 10,
                },
              }}
            />
            <VictoryAxis
              crossAxis
              style={{
                axis: {stroke: '#e6e6e6'},
                tickLabels: {fill: 'grey', fontSize: 10},
              }}
            />
            <VictoryLine
              name="line1"
              style={{
                data: {strokeWidth: 1, stroke: colors.chart_line_blue},
              }}
              data={dataSet[1]}
              y={(datum) => datum.y / maxima[1]}
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
              y={(datum) => datum.y / maxima[1]}
              labels={(datum) =>
                `Active Subs\n ${
                  datum.data[datum.index].x
                }: ${Helper.formatAmount(datum.data[datum.index].y)}`
              }
              labelComponent={
                <VictoryTooltip
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
              y={(datum) => datum.y / maxima[0]}
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
              y={(datum) => datum.y / maxima[0]}
              labels={(datum) =>
                `Usage (GB)\n ${
                  datum.data[datum.index].x
                }: ${Helper.convertUnit(datum.data[datum.index].y)}`
              }
              labelComponent={
                <VictoryTooltip
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
            <VictoryLegend
              x={Orientation.getWidth() / 2 - 120}
              centerTitle
              orientation="horizontal"
              gutter={25}
              style={{labels: {fontSize: 11}}}
              data={legendData}
            />
          </VictoryChart>
        ) : (
          <NoDataText />
        )}
      </>
    );
  };
  // End Render Function

  return <>{_generateView()}</>;
};

// Custom Component
const CustomToolTip = ({color}) => {
  return (
    <VictoryTooltip
      renderInPortal={false}
      flyoutStyle={{
        fill: 'white',
        stroke: color,
        strokeWidth: 1,
        fontSize: 10,
      }}
      labelComponent={<VictoryLabel style={{fontSize: 10}} />}
    />
  );
};

UsageSubsChart.defaultPrps = {};
UsageSubsChart.propTypes = {};

export default UsageSubsChart;
