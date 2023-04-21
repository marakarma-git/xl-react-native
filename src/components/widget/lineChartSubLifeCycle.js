import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  getDeviceAnalytic,
} from '../../redux/action/device_analytic_action';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryLine,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryGroup,
  VictoryScatter,
  VictoryVoronoiContainer
} from 'victory-native';
import {Card} from 'react-native-paper';
import {
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Orientation from '../../helpers/orientation';

import style from '../../style/home.style';
import {NoDataText, Text} from '..';

const LineChartComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataSet = useSelector(
    (state) => state.device_analytic_reducer.deviceAnalytic
  );
  const [dataSetLine, setDataSetLine] = useState([])
  const [tickValues, setTickValues] = useState([])

  const color = ["#165096", "#FF1515", "#B3D335", "#FAAA3C"]
  const userData = useSelector((state) => state.auth_reducer.data);
  const {loading, error} = useSelector(
    (state) => state.device_analytic_reducer,
  );
  const [orientation, setOrientation] = useState('potrait');
  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(0) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(0) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(0) + "T";
  };

  var dataSetLineDummy = [[
    { x: '2023-01', y: 50 },
    { x: '2023-02', y: 10 },
    { x: '2023-03', y: 30 },
    { x: '2023-04', y: 50 },
    { x: '2023-05', y: 20 },
    { x: '2023-06', y: 30 },
    { x: '2023-07', y: 60 },
    { x: '2023-08', y: 100 },
    { x: '2023-09', y: 110 },
    { x: '2023-10', y: 20 },
    { x: '2023-11', y: 10 },
    { x: '2023-12', y: 90 }
  ], [
    { x: '2023-01', y: 30 },
    { x: '2023-02', y: 50 },
    { x: '2023-03', y: 40 },
    { x: '2023-04', y: 50 },
    { x: '2023-05', y: 90 },
    { x: '2023-06', y: 40 },
    { x: '2023-07', y: 70 },
    { x: '2023-08', y: 20 },
    { x: '2023-09', y: 30 },
    { x: '2023-10', y: 70 },
    { x: '2023-11', y: 40 },
    { x: '2023-12', y: 60 }
  ], [
    { x: '2023-01', y: 60 },
    { x: '2023-02', y: 30 },
    { x: '2023-03', y: 10 },
    { x: '2023-04', y: 50 },
    { x: '2023-05', y: 30 },
    { x: '2023-06', y: 70 },
    { x: '2023-07', y: 60 },
    { x: '2023-08', y: 20 },
    { x: '2023-09', y: 60 },
    { x: '2023-10', y: 30 },
    { x: '2023-11', y: 100 },
    { x: '2023-12', y: 60 }
  ], [
    { x: '2023-01', y: 20 },
    { x: '2023-02', y: 80 },
    { x: '2023-03', y: 50 },
    { x: '2023-04', y: 20 },
    { x: '2023-05', y: 80 },
    { x: '2023-06', y: 40 },
    { x: '2023-07', y: 100 },
    { x: '2023-08', y: 110 },
    { x: '2023-09', y: 20 },
    { x: '2023-10', y: 100 },
    { x: '2023-11', y: 90 },
    { x: '2023-12', y: 70 }
  ]] 

  const generateChart = () => (
    <View style={{position: 'relative', top: -20, left: -25}}>

        
      {dataSetLineDummy.length > 0 ? (
        <>
        <VictoryChart
          containerComponent={
            // <VictoryVoronoiContainer labels={({ datum }) => `${tickValues[datum.eventKey]} : ${datum.y}`} />
            <VictoryVoronoiContainer labels={({ datum }) => `${tickValues[datum.eventKey]} : ${datum.y}`} />
          }
        >
            <VictoryAxis
                crossAxis
                label=""
                tickValues={['2023-01','2023-02','2023-03','2023-04','2023-05','2023-06','2023-07','2023-08','2023-09','2023-10','2023-11','2023-12',]}
                //   tickValues={tickValues}
                style={{tickLabels: {angle: 330, fontSize: 12, padding: 15}}}
            />
            <VictoryAxis
                dependentAxis
                label="Subscribers"
                style={{
                    tickLabels: {fontSize: 15, padding: 0}
                }}
                standalone={false}
                tickFormat={(t) => formatCash(t)}
                fixLabelOverlap
                tickLabelComponent={<VictoryLabel style={{fontSize: 12}} />}
            />
            {dataSetLineDummy.map((datas, i) => (
                <VictoryGroup>
                    <VictoryLine
                        key={i} data={datas} style={{
                        data: {fill: "transparent", width: 10, stroke: color[i]},
                    }}/>
                    <VictoryScatter
                        size={4} key={i} data={datas} style={{
                        data: {fill: color[i], width: 10, stroke: color[i]},
                    }}/>
                </VictoryGroup>
            ))}
        </VictoryChart>

        <View style={{flexDirection:"row", justifyContent: 'space-around', alignItems:'center', left: 25}}>
          <View style={{flexDirection:"row", justifyContent: 'space-around', alignItems:'center'}}>
            <View style={{width:12, height:12, backgroundColor:"#FAAA3C", borderRadius:50, marginRight:4}}></View>
            <Text style={{fontSize:12}} fontType="bold">Active</Text>
          </View>
          <View style={{flexDirection:"row", justifyContent: 'space-around', alignItems:'center'}}>
            <View style={{width:12, height:12, backgroundColor:"#B3D335", borderRadius:50, marginRight:4}}></View>
            <Text style={{fontSize:12}} fontType="bold">Deactivated</Text>
          </View>
          <View style={{flexDirection:"row", justifyContent: 'space-around', alignItems:'center'}}>
            <View style={{width:12, height:12, backgroundColor:"#FF1515", borderRadius:50, marginRight:4}}></View>
            <Text style={{fontSize:12}} fontType="bold">Paused</Text>
          </View>
          <View style={{flexDirection:"row", justifyContent: 'space-around', alignItems:'center'}}>
            <View style={{width:12, height:12, backgroundColor:"#165096", borderRadius:50, marginRight:4}}></View>
            <Text style={{fontSize:12}} fontType="bold">Terminated</Text>
          </View>
        </View>
      </>
      ) : (
        <NoDataText />
      )}
    </View>
  );

  const generateView = () => {
    return (
        <Card.Content style={[style.cardContentWrapper, {flex: 1}]}>
            <View style={{paddingTop:0, marginBottom:20}}>
                <Text fontType="bold" style={{fontSize: 14}}>
                Subscriber Life Cycle
                </Text>
                <Text style={{fontSize: 12}}>
                consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue
                </Text>
            </View>
          {loading ? (
            <ActivityIndicator color={colors.main_color} size="large" />
          ) : (
            <>
              {dataSetLine && generateChart()}
            </>
          )}
        </Card.Content>
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
      dispatch(getDeviceAnalytic(userData.access_token, {}));
    }
  }, [dataSet]);

  useEffect(() => {
    if (dataSet !== null) {
      setDataSetLine(dataSet.data)
      setTickValues(dataSet.period)
    }
  });

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
  });

    detectOrientation();

    return pageLoad;
  }, [navigation]);
  return <>{generateView()}</>;
};

export default LineChartComponent;
