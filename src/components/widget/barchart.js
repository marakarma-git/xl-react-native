import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {requestWidgetData} from '../../redux/action/dashboard_action';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
} from 'victory-native';
import {Card, Title} from 'react-native-paper';
import {View, ActivityIndicator, Text} from 'react-native';

import Helper from '../../helpers/helper';
import style from '../../style/home.style';

const BarChartComponent = ({item, filterParams = {}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataSet = useSelector(
    (state) => state.dashboard_reducer.topTrafficStatistics,
  );
  const userData = useSelector((state) => state.auth_reducer.data);
  const {loading, error} = useSelector((state) => state.dashboard_reducer);

  const generateChart = () => (
    <View style={{position: 'relative', top: -20, left: -15}}>
      {dataSet.length > 0 ? (
        <VictoryChart>
          <VictoryAxis crossAxis label="Subscriptions" tickFormat={() => ''} />
          <VictoryAxis
            dependentAxis
            style={{axis: {stroke: 'none'}}}
            standalone={false}
            tickFormat={(t) => Helper.formatBytes(t)}
            tickLabelComponent={<VictoryLabel style={{fontSize: 10}} />}
          />
          <VictoryBar
            horizontal
            style={{
              data: {fill: '#00D3A0', width: 15},
            }}
            data={dataSet}
          />
        </VictoryChart>
      ) : (
        <View style={{marginTop: 30}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );

  useEffect(() => {
    if (dataSet === null) {
      dispatch(
        requestWidgetData(
          userData.access_token,
          item,
          filterParams,
          (type = 'top'),
        ),
      );
    }

    const pageLoad = navigation.addListener('focus', () => {
      dispatch(
        requestWidgetData(
          userData.access_token,
          item,
          filterParams,
          (type = 'top'),
        ),
      );
    });

    return pageLoad;
  }, [navigation]);

  return (
    <Card style={[style.cardSection]}>
      <Card.Content style={[style.cardContentWrapper, {flex: 1}]}>
        <Title>{item.jsonData.title.text}</Title>
        {loading ? (
          <ActivityIndicator color="#002DBB" size="large" />
        ) : (
          <>{dataSet && generateChart()}</>
        )}
      </Card.Content>
    </Card>
  );
};

export default BarChartComponent;
