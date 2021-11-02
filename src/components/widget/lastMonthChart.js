import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory-native';
import {View, Dimensions} from 'react-native';
import {Text} from '../index';
import Orientation from '../../helpers/orientation';
import Svg from 'react-native-svg';

import PropTypes from 'prop-types';
import Helper from '../../helpers/helper';
import {NoDataText} from '..';
import {useNavigation} from '@react-navigation/native';

import styles from '../../style/usageAnalytics.style';
import {colors} from '../../constant/color';

const Las12MonthUsageChart = (props) => {
  const navigation = useNavigation();
  const dataSet = useSelector(
    (state) => state.dashboard_reducer.last12MonthUsage,
  );
  const [orientation, setOrientation] = useState('potrait');
  const [activeBarIndex, setActiveBarIndex] = useState(null);

  // prevent tooltip default behaviour && setactiveindex
  const _onPressIn = (props) => {
    setActiveBarIndex(props?.index);
    return {active: undefined};
  };

  const _onLongPress = (props) => {
    return {
      active:
        props?.index === activeBarIndex && !props?.active ? true : undefined,
    };
  };

  const _onPressOut = (data) => {
    props.setShowMonthUsage(data?.datum?.x || 'Jan-1990');
    return {active: undefined};
  };

  const generateChart = () => (
    <View style={{position: 'relative', top: -20}}>
      {dataSet.length > 0 ? (
        <Svg>
          <VictoryChart
            padding={{top: 30, right: 30, left: 80, bottom: 60}}
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 120 : 30)
            }
            domain={[0, dataSet.length]}
            containerComponent={
              <VictoryZoomContainer
                allowZoom={false}
                zoomDimension="x"
                zoomDomain={{
                  x: [0, 7],
                  y: [
                    0,
                    Math.max.apply(
                      Math,
                      dataSet.map(function (o) {
                        return o.y + o.y / 3;
                      }),
                    ),
                  ],
                }}
              />
            }>
            <VictoryAxis
              dependentAxis
              label={'Data volumes'}
              axisLabelComponent={<VictoryLabel dy={-40} />}
              standalone={true}
              fixLabelOverlap
              tickFormat={(t) => Helper.convertUnit(t)}
              tickLabelComponent={<VictoryLabel style={{fontSize: 10}} />}
            />
            <VictoryAxis
              crossAxis
              label="Data per month"
              axisLabelComponent={<VictoryLabel dy={20} />}
              standalone={false}
              tickLabelComponent={
                <VictoryLabel dx={-10} angle={-20} style={{fontSize: 10}} />
              }
            />

            <VictoryBar
              style={{
                data: {fill: colors.main_color},
              }}
              labels={({datum}) => datum}
              data={dataSet}
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
                          mutation: _onPressOut,
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
              barWidth={30}
              labelComponent={
                <VictoryTooltip
                  activateData={false}
                  orientation="top"
                  flyoutStyle={{stroke: colors.main_color, fill: 'white'}}
                  flyoutWidth={160}
                  flyoutHeight={30}
                  labelComponent={<CustomLabel />}
                  renderInPortal={false}
                />
              }
            />
          </VictoryChart>
        </Svg>
      ) : (
        <NoDataText />
      )}
    </View>
  );

  const generateView = () => {
    return <View style={{paddingLeft: 10}}>{dataSet && generateChart()}</View>;
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
          <Text style={{color: colors.main_color}}>
            {String(text.x).replace('-', ' ')} :{' '}
          </Text>
          {Helper.tooltipConvertUnit(text.y)}
        </Text>
      </Text>
    </View>
  );
};

Las12MonthUsageChart.propTypes = {
  setShowMonthUsage: PropTypes.func,
};
Las12MonthUsageChart.defaultProps = {
  setShowMonthUsage: () => {},
};

export default Las12MonthUsageChart;
