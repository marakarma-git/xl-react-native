import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {base_url} from '../../constant/connection';
import {dashboardHeaderAuth} from '../../constant/headers';
import {Card, Title} from 'react-native-paper';
import {Text} from '../index';

import Axios from 'axios';
import Helper from '../../helpers/helper';
import style from '../../style/home.style';
import {colors} from '../../constant/color';

const title = [
  'From start of month, Total Volume',
  'Previous 30 Days, Total Volume',
  'From start of month, Average per subscription',
  'Previous 30 Days, Average per subscription',
  'From start of month, Total SMS',
  'Previous 30 Days, Total SMS',
  'From start of month, Average per SMS subscription',
  'Previous 30 Days, Average per SMS subscription',
];

const AggregateTrafficComponent = ({item, navigation, filterParams = {}}) => {
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
          headers: dashboardHeaderAuth(userData.customerNo),
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          setDataSet(data.result.dataset);
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

  const parseData = () => (
    <>
      {dataSet.length > 0 ? (
        Object.keys(dataSet[0]).map((key, index) => (
          <View key={index} style={style.aggregateList}>
            <Text style={{fontSize: 11}}>{title[index]}</Text>
            <Text style={{fontSize: 11}}>
              {Helper.formatBytes(dataSet[0][key])}
            </Text>
          </View>
        ))
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
    </>
  );

  useEffect(() => {
    if (dataSet == null) {
      getWidgetData();
    }

    // const pageLoad = navigation.addListener('focus', () => {
    //   getWidgetData();
    // });

    // return pageLoad;
  }, [navigation]);

  return (
    <Card style={style.cardSection}>
      <Card.Content style={style.cardContentWrapper}>
        <View style={style.cardTitleContainer}>
          <Text fontType="bold" style={{fontSize: 14}}>
            {item.jsonData?.title?.text || ''}
          </Text>
        </View>
        {/* {loading ? (
          <ActivityIndicator color={colors.main_color} size="large" />
        ) : (
          <View style={style.containerPie} pointerEvents="none">
            {dataSet && parseData()}
          </View>
        )} */}
      </Card.Content>
    </Card>
  );
};

export default AggregateTrafficComponent;
