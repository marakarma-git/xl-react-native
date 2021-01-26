import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
} from 'victory-native';
import {View, ActivityIndicator, Text} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {base_url} from '../../constant/connection';
import {dashboardHeaderAuth} from '../../constant/headers';

import Axios from 'axios';
import Helper from '../../helpers/helper';
import style from '../../style/home.style';

const BarChartComponent = ({item, navigation, filterParams = {}}) => {
  const [dataSet, setDataSet] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth_reducer.data);

  const getWidgetData = async () => {
    try {
      setLoading(true);
      const {data} = await Axios.post(
        `${base_url}/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        {
          headers: dashboardHeaderAuth(userData.access_token),
        },
      );

      if (data) {
        if (data.statusCode == 0) {
          if (data.result.dataset.length > 0) {
            const newDataSet = [];

            data.result.dataset.map((datas) => {
              newDataSet.push({x: datas.msisdn, y: +datas.datausage});
            });

            Helper.sortAscending(newDataSet, 'y');

            setDataSet(newDataSet);
          } else {
            setDataSet([]);
            setError('No dataset found...');
          }
        } else {
          setDataSet([]);
          setError(data.statusDescription);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const generateChart = () => (
    <View style={{position: 'relative', top: -20}}>
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
    if (dataSet == null) {
      getWidgetData();
    }

    const pageLoad = navigation.addListener('focus', () => {
      getWidgetData();
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
