import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  requestWidgetDataFinance,
} from '../../redux/action/dashboard_action';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryContainer,
} from 'victory-native';
import {Card} from 'react-native-paper';
import {
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Orientation from '../../helpers/orientation';
import Helper from '../../helpers/helper';

import style from '../../style/home.style';
import {FilterDropdown, NoDataText, Text} from '..';
import {colors} from '../../constant/color';

const ColumnChartComponent = ({
  item,
  param1,
  barTotal = null,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataSet = useSelector(
    (state) => state.dashboard_reducer.financialReportStatistics
  );
  const userData = useSelector((state) => state.auth_reducer.data);
  const {loadingFinancialReport, error} = useSelector(
    (state) => state.dashboard_reducer,
  );
  const [orientation, setOrientation] = useState('potrait');
  const getTickValues = (data) => {
    const dataUsage = [...data].map((datas) => datas.y);
    const tickTimes = [0, 0.25, 0.5, 0.75, 1];
    const tickValues = tickTimes.map((tick) => Math.max(...dataUsage) * tick);
    return tickValues;
  };
  const getAxis = (data) => {
    // const dataUsage = [...data].map((datas) => datas.y);
    var loaddata = []
    data ? data.map(function (index, val) {
          loaddata.push(index.label[1]);
    }) : null

    return loaddata;
  };
  const filterParams = {}

  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(0) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(0) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(0) + "T";
  };
  const generateChart = () => (
    <View style={{position: 'relative', top: -20, left: -20}}>
      {dataSet.length > 0 ? (
        <VictoryContainer>
          <VictoryChart
            width={
              Orientation.getWidth() + (orientation === 'landscape' ? 0 : -30)
            }
            containerComponent={<VictoryContainer responsive={false} />}
            domainPadding={5}
            height={barTotal ? +barTotal * 30 : + 10 * 30}>
            <VictoryAxis
              crossAxis
              label=""
              tickValues={getAxis(dataSet)}
              tickFormat={(t) => `${t.substring(0, 12)}`}
              style={{tickLabels: {angle: 90, fontSize: 11, padding: 30}}}
            />
            <VictoryAxis
              dependentAxis
              label="Total Invoice (IDR)"
              style={{
                tickLabels: {fontSize: 15, padding: 0}
              }}
              standalone={false}
              tickValues={getTickValues(dataSet)}
              tickFormat={(t) => formatCash(t)}
              fixLabelOverlap
              tickLabelComponent={<VictoryLabel style={{fontSize: 9}} />}
            />
            <VictoryBar
              alignment="start"
              data={dataSet}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: 'labels',
                          eventKey: 'all',
                          mutation: () => ({active: false}),
                        },
                      ];
                    },
                    onPressOut: () => {
                      return [
                        {
                          target: 'labels',
                          mutation: () => ({active: true}),
                        },
                      ];
                    },
                  },
                },
              ]}
              vertical
              style={{
                data: {fill: "#165096", width: 10},
              }}
              labelComponent={
                <VictoryTooltip
                  dx={-45}
                  dy={20}
                  orientation="top"
                  flyoutStyle={{
                    stroke: "#165096",
                    fill: 'white',
                  }}
                  flyoutWidth={130}
                  flyoutHeight={40}
                  labelComponent={<CustomLabel />}
                  renderInPortal={false}
                />
              }
            />
          </VictoryChart>
        </VictoryContainer>
      ) : (
        <NoDataText />
      )}
    </View>
  );

  const generateView = () => {
    return (
      <Card style={[style.cardSection]}>
        <Card.Content style={[style.cardContentWrapper, {flex: 1}]}>
          <View style={style.cardTitleContainer}>
            <Text fontType="bold" style={{fontSize: 14}}>
              {item.jsonData?.title?.text || ''}
            </Text>
          </View>
          {loadingFinancialReport ? (
            <ActivityIndicator color={colors.main_color} size="large" />
          ) : (
            <>{dataSet && generateChart()}</>
          )}
        </Card.Content>
      </Card>
    );
  };

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('potrait');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  useEffect(() => {
    if (dataSet === null) {
      dispatch(requestWidgetDataFinance(userData.access_token, item, {}, 'finance', userData.principal.username));
      console.log(dataSet)
    }
  }, [dataSet]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
    });

    detectOrientation();

    return pageLoad;
  }, [navigation]);
  return <>{generateView()}</>;
};

const CustomLabel = (props) => {
  const {text, x, y} = props;

  let yPos = y - 15;
  let xPos = x - 60;

  return (
    <View style={{position: 'absolute', top: yPos, left: xPos}}>
      <Text style={{fontSize: 10}}>
        {text[0]}
        <Text style={{fontWeight: 'bold'}}>{text[1]}</Text>
      </Text>
      <Text style={{fontSize: 10}}>
        {text[2]}
        <Text style={{fontWeight: 'bold'}}>IDR {Helper.numberFormat(parseFloat(text[3]), '.')}</Text>
      </Text>
    </View>
  );
};

export default ColumnChartComponent;
