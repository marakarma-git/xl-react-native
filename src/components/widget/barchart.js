import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { VictoryBar, VictoryAxis, VictoryChart } from 'victory-native';
import { View, ActivityIndicator, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Axios from 'axios';
import { dashboard_base_url } from '../../constant/connection';
import style from '../../style/home.style';

const dataBar = [
    { x: 'lizard', y: 1234 },
    { x: 'snake', y: 2048 },
    { x: 'crocodile', y: 2600 },
    { x: 'alligator2', y: 3000 },
    { x: 'alligator3', y: 4000 },
    { x: 'alligator4', y: 5000 },
];

const BarChartComponent = ({ item, navigation }) => {
    const [dataSet, setDataSet] = useState(null);
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

            if (data) {
                if (data.statusCode == 0) {

                    if (data.result.dataset.length > 0) {
                        const newDataSet = [];
                        data.result.dataset.map((datas) => {
                            newDataSet.push({ x: datas.msisdn, y: +datas.datausage });
                        });

                        setDataSet(newDataSet);
                    } else {
                        setError("No dataset found...")
                    }

                }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const generateChart = () => (
        <>
            {dataSet.length > 0
                ?
                <VictoryChart>
                    <VictoryAxis crossAxis style={{ axis: { stroke: 'none', fontSize: 10 } }} />
                    <VictoryAxis
                        label="Subscriptions"
                        dependentAxis
                        tickFormat={() => ''}
                    />
                    <VictoryBar
                        horizontal
                        style={{
                            data: { fill: '#00D3A0', width: 15 },
                        }}
                        data={dataSet}
                    />
                </VictoryChart>
                :
                <Text style={{ textAlign: 'center', paddingVertical: 5, color: 'black' }}>{error}</Text>
            }
        </>
    )

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
        <Card style={style.cardSection}>
            <Card.Content style={[style.cardContentWrapper, { flex: 1 }]}>
                <Title>{item.jsonData.title.text}</Title>
                {
                    loading ?
                        <ActivityIndicator color="#002DBB" size="large" />
                        :
                        <>
                            {dataSet && generateChart()}
                        </>
                }
            </Card.Content>
        </Card>
    )
}

export default BarChartComponent;