import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryContainer,
  VictoryZoomContainer,
} from 'victory-native';
import {Card, Title} from 'react-native-paper';
import {View, Dimensions} from 'react-native';
import {Text} from '../index';
import Orientation from '../../helpers/orientation';
import Svg from 'react-native-svg';

import Helper from '../../helpers/helper';
import style from '../../style/home.style';
import {NoDataText} from '..';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import styles from '../../style/usageAnalytics.style';
import {Button} from 'react-native';

const dataSet = [
  {
    x: 'Aug-2020',
    y: 0,
  },
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
    y: 2409217081165,
  },
  {
    x: 'Mar-2021',
    y: 2442480971496,
  },
  {
    x: 'Apr-2021',
    y: 3574879964123,
  },
  {
    x: 'May-2021',
    y: 4134712503244,
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
];

const Las12MonthUsageChart = () => {
  const navigation = useNavigation();
  // const dataSet = useSelector(
  //   (state) => state.dashboard_reducer.last12MonthUsage,
  // );
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

  const _onPressOut = (props) => {
    // tomorrow developer change chart
    console.log('change chart', props?.index, props?.datum);
    return {active: undefined};
  };

  const generateChart = () => (
    <View style={{position: 'relative', top: -20}}>
      {dataSet.length > 0 ? (
        <Svg>
          <VictoryChart
            padding={{top:10, right:30, left:80, bottom: 60}}
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
              label={"Data volumes"}
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
                <VictoryLabel dx={-10} angle={-13} style={{fontSize: 10}} />
              }
            />

            <VictoryBar
              style={{
                data: {fill: '#0266FF'},
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
                  flyoutStyle={{stroke: '#0266FF', fill: 'white'}}
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
          <Text style={{color: '#0266FF'}}>
            {String(text.x).replace('-', ' ')} :{' '}
          </Text>
          {Helper.tooltipConvertUnit(text.y)}
        </Text>
      </Text>
    </View>
  );
};

export default Las12MonthUsageChart;
