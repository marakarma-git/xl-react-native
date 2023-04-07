import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {requestWidgetData} from '../../redux/action/dashboard_action';
import {useSelector, useDispatch} from 'react-redux';
import {Card} from 'react-native-paper';
import {View, ActivityIndicator} from 'react-native';
import {VictoryPie, VictoryTheme, VictoryLabel} from 'victory-native';

import {Text} from '../index';
import ChartLegend from './chartlegend';
import style from '../../style/home.style';
import {colors} from '../../constant/color';
import {TouchableOpacity} from 'react-native';

const PieChartComponent = ({item, datareduce, filterParams = {}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth_reducer.data);
  if (datareduce == 'sim') {
    var dataSet = useSelector((state) => state.dashboard_reducer.simStatistics);
  } else {
    var dataSet = useSelector((state) => state.dashboard_reducer.customStatistics);
  }
  const {loading, error} = useSelector((state) => state.dashboard_reducer);
  const [chartColor, setChartColor] = useState([]);

  const generateChartColor = () => {
    const colorArray = [];
    dataSet.map((data) => {
      colorArray.push(data.color);
    });
    setChartColor(colorArray);
  };

  const generateChart = () => (
    <View style={{position: 'relative', justifyContent: 'center'}}>
      {dataSet.length > 0 ? (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={[style.containerPie, {width: '45%'}]}>
            <VictoryPie
              data={dataSet}
              responsive={true}
              colorScale={chartColor}
              height={230}
              theme={VictoryTheme.material}
              labelComponent={
                <VictoryLabel
                  style={{fontSize: 12, fontWeight: 'bold', display: 'none'}}
                />
              }
            />
          </View>
          <ChartLegend dataSet={dataSet} />
        </View>
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
    const pageLoad = navigation.addListener('focus', () => {
      if(datareduce == 'sim'){
        dispatch(
          requestWidgetData(userData.access_token, item, filterParams, 'sim'),
        );
      }else{
        dispatch(
          requestWidgetData(userData.access_token, item, filterParams, 'custom'),
        );
      }
    });

    if (dataSet !== null) {
      generateChartColor();
    } else if (dataSet === null) {
      if(datareduce == 'sim'){
        dispatch(
          requestWidgetData(userData.access_token, item, filterParams, 'sim'),
        );
      }else{
        dispatch(
          requestWidgetData(userData.access_token, item, filterParams, 'custom'),
        );
      }
    }

    return pageLoad;
  }, [navigation, dataSet]);

  return (
    <Card style={style.cardSection}>
      <Card.Content style={style.cardContentWrapper}>
        <View style={style.cardTitleContainer}>
          <Text fontType="bold" style={{fontSize: 14}}>
            {item.jsonData?.title?.text || ''}
          </Text>
          <TouchableOpacity
            onPress={() => datareduce == 'sim' ? navigation.navigate('Sim Productivity') : navigation.navigate('Custom Statistics')}>
            <Text style={style.linkText}>See Details</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator color={colors.main_color} size="large" />
        ) : (
          <>{dataSet && generateChart()}</>
        )}
      </Card.Content>
    </Card>
  );
};

export default PieChartComponent;
