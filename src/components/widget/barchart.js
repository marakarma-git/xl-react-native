import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { VictoryBar, VictoryAxis, VictoryChart } from 'victory-native';
import { View, ActivityIndicator } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Axios from 'axios';
import { dashboard_base_url } from '../../constant/connection';
import style from '../../style/home.style';

const BarChartComponent = ({item, navigation}) => {
    const [dataSet, setDataSet] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const userData = useSelector(state => state.auth_reducer.data);

    const getWidgetData = async () => {
        try {
            setLoading(true);
            const { data } = await Axios.get(`${dashboard_base_url}/getDataSet?datasetId=${item.datasetId}`, {
                headers: {
                    Authorization: "Bearer " + userData.access_token
                }
            });

            if(data){
                if(data.statusCode == 0){
                    const newDataSet = [];

                    data.result.dataset.map((datas) => {
                        newDataSet.push({ x: datas.status, y: +datas.percentage });
                    });

                    setDataSet(newDataSet);
                }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    useEffect(() => {  
        if(dataSet.length == 0){
            getWidgetData();
        }
        
        const pageLoad = navigation.addListener('focus', () => {
            getWidgetData();
        });

        return pageLoad;
    }, [navigation]);

    return(
        <Card style={style.cardSection}>
            <Card.Content style={[style.cardContentWrapper, { flex: 1 }]}>
                <Title>{item.jsonData.title.text}</Title>
                { 
                    loading ? 
                    <ActivityIndicator color="#002DBB" size="large" />
                    :
                    <>
                        <VictoryChart
                        domainPadding={{ x: 10 }}>
                        <VictoryAxis
                            label="Subscriptions"
                            dependentAxis
                            tickFormat={() => ''}
                        />
                        <VictoryAxis crossAxis style={{axis: {stroke: 'none'}}} />
                        <VictoryBar
                            horizontal
                            width={100}
                            style={{
                                data: {fill: '#00D3A0', width: 10},
                            }}
                            data={dataSet}
                        />
                        </VictoryChart>
                    </>
                }
            </Card.Content>
        </Card>
    )
}

export default BarChartComponent;