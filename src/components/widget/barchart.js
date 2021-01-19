import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryLabel } from 'victory-native';
import { View, ActivityIndicator, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Axios from 'axios';
import Helper from '../../helpers/helper';
import { dataset_base_url } from '../../constant/connection';
import style from '../../style/home.style';

const BarChartComponent = ({ item, navigation }) => {
    const [dataSet, setDataSet] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const userData = useSelector(state => state.auth_reducer.data);

    const params = {
        "param1": "07000008",
        "param2": "07000008_SP_05"
    }

    const getWidgetData = async () => {
        try {
            setLoading(true);
            const { data } = await Axios.post(`${dataset_base_url}/getDataSet?datasetId=${item.datasetId}`, params,{
                headers: {
                    "Authorization": "Bearer " + userData.access_token,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "username": "super.admin"
                }
            });

            if (data) {
                if (data.statusCode == 0) {
                    if (data.result.dataset.length > 0) {
                        const newDataSet = [];

                        data.result.dataset.map((datas) => {
                            newDataSet.push({ x: datas.msisdn, y: +datas.datausage });
                        });

                        Helper.sortAscending(newDataSet, 'y');

                        setDataSet(newDataSet);
                    } else {
                        setDataSet([]);
                        setError("No dataset found...")
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
    }

    const generateChart = () => (
        <View style={{ position: 'relative', top: -20 }}>
            {dataSet.length > 0
                ?
                <VictoryChart>
                    <VictoryAxis
                        crossAxis
                        style={{ axis: { stroke: 'none' } }}
                        tickLabelComponent={
                            <VictoryLabel
                                angle={305}
                                verticalAnchor="middle"
                                textAnchor="end"
                                style={{ fontSize: 8 }}
                            />
                        } />
                    <VictoryAxis
                        dependentAxis
                        style={{ axis: { stroke: 'none' } }}
                        standalone={false}
                        tickFormat={t => Helper.formatBytes(t)}
                        tickLabelComponent={
                            <VictoryLabel
                                style={{ fontSize: 10 }}
                            />
                        }
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
                <View style={{ marginTop: 30 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 14 }}>{error}</Text>
                </View>
            }
        </View>
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