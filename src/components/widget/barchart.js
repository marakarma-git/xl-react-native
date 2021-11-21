import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  requestWidgetData,
  resetTopTrafficStatistics,
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
  TouchableOpacity,
} from 'react-native';
import Orientation from '../../helpers/orientation';

import Helper from '../../helpers/helper';
import style from '../../style/home.style';
import {FilterDropdown, NoDataText, Text} from '..';
import {colors} from '../../constant/color';
import ModalSearchPicker from '../modal/ModalSearchPickerCustom';

const BarChartComponent = ({
  item,
  viewType = 'dashboard',
  filterParams = {},
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataSet = useSelector(
    (state) => state.dashboard_reducer.topTrafficStatistics,
  );
  const userData = useSelector((state) => state.auth_reducer.data);
  const {loadingTopTraffic, error} = useSelector(
    (state) => state.dashboard_reducer,
  );
  const [orientation, setOrientation] = useState('potrait');
  const [firstRender, setFirstRender] = useState(true);
  const [isFirstHit, setIsFirstHit] = useState(true);
  const [param3, setParam3] = useState(2);
  const [param3List, setParam3List] = useState([
    {label: '2 Days ago', value: 2, isDisabled: false, isVisible: true},
    {
      label: 'Previous 7 Days ago',
      value: 7,
      isDisabled: false,
      isVisible: true,
    },
    {
      label: 'Previous 30 Days ago',
      value: 30,
      isDisabled: false,
      isVisible: true,
    },
  ]);
  const [param4, setParam4] = useState(10);
  const [param4List, setParam4List] = useState([
    {label: 'Top 10', value: 10, isDisabled: false, isVisible: true},
    {label: 'Top 20', value: 20, isDisabled: false, isVisible: true},
  ]);
  const [periodLabel, setPeriodLabel] = useState('2 Days ago');
  const [countLabel, setCountLabel] = useState('Top 10');
  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [showCountFilter, setShowCountFilter] = useState(false);

  const generateChart = () => (
    <View style={{position: 'relative', top: -20, left: -15}}>
      {dataSet.length > 0 ? (
        <VictoryContainer>
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 120 : 30)
            }>
            <VictoryAxis
              crossAxis
              label="Subscriptions"
              tickFormat={() => ''}
            />
            <VictoryAxis
              dependentAxis
              style={{axis: {stroke: 'none'}}}
              standalone={false}
              tickFormat={(t) => Helper.formatBytes(t)}
              tickLabelComponent={
                <VictoryLabel angle={-10} dy={10} style={{fontSize: 10}} />
              }
            />
            <VictoryBar
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
              horizontal
              style={{
                data: {fill: colors.tab_edit, width: 15},
              }}
              labelComponent={
                <VictoryTooltip
                  dx={-30}
                  dy={20}
                  orientation="top"
                  flyoutStyle={{
                    stroke: colors.tab_edit,
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
    if (viewType === 'dashboard') {
      return (
        <Card style={[style.cardSection]}>
          <Card.Content style={[style.cardContentWrapper, {flex: 1}]}>
            <View style={style.cardTitleContainer}>
              <Text fontType="bold" style={{fontSize: 14}}>
                {item.jsonData?.title?.text || ''}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Usage Analytics')}>
                <Text style={style.linkText}>See Details</Text>
              </TouchableOpacity>
            </View>
            <View style={style.cardBody}>
              <FilterDropdown
                setShowToggle={setShowPeriodFilter}
                dropdownText={periodLabel}
                dropDownTitle={'Period'}
              />
              <FilterDropdown
                setShowToggle={setShowCountFilter}
                dropdownText={countLabel}
                dropDownTitle={'Count'}
              />
            </View>
            {loadingTopTraffic ? (
              <ActivityIndicator color={colors.main_color} size="large" />
            ) : (
              <>{dataSet && generateChart()}</>
            )}
          </Card.Content>
          {showPeriodFilter && (
            <ModalSearchPicker
              modalHeight={230}
              data={param3List}
              onChange={(e) => {
                setParam3(e.value);
                dispatch(resetTopTrafficStatistics());
                setShowPeriodFilter(false);
                setPeriodLabel(e.label);
              }}
              onClose={() => setShowPeriodFilter(false)}
              removeSearch={true}
              title={'Period Filter'}
              value={param3}
            />
          )}
          {showCountFilter && (
            <ModalSearchPicker
              modalHeight={180}
              data={param4List}
              onChange={(e) => {
                setParam4(e.value);
                dispatch(resetTopTrafficStatistics());
                setShowCountFilter(false);
                setCountLabel(e.label);
              }}
              onClose={() => setShowCountFilter(false)}
              removeSearch={true}
              title={'Count Filter'}
              value={param4}
            />
          )}
        </Card>
      );
    } else {
      return <View style={{marginLeft: 10}}>{dataSet && generateChart()}</View>;
    }
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
    if (dataSet === null) {
      dispatch(
        requestWidgetData(
          userData.access_token,
          item,
          {param3, param4},
          (type = 'top'),
        ),
      );
      setIsFirstHit(false);
    }
  }, [dataSet]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      setFirstRender(false);
      setIsFirstHit(true);
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
        <Text style={{fontWeight: 'bold'}}>{text[3]}</Text>
      </Text>
    </View>
  );
};

export default BarChartComponent;
