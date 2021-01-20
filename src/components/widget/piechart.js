import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import { View, ActivityIndicator, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Axios from 'axios';
import { dataset_base_url } from '../../constant/connection';
import style from '../../style/home.style';
import Helper from '../../helpers/helper';

const PieChartComponent = ({ item, navigation, filterParams = {} }) => {
    const [dataSet, setDataSet] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const userData = useSelector(state => state.auth_reducer.data);

    const getWidgetData = async () => {
        try {
            setLoading(true);
            const { data } = await Axios.post(`${dataset_base_url}/getDataSet?datasetId=${item.datasetId}`, filterParams, {
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
                        let isAllZero = 0;
                        const newDataSet = [];

                        data.result.dataset.map((datas) => {
                            if (datas.percentage == 0) {
                                isAllZero++;
                            }

                            newDataSet.push({ y: +datas.total, label: `${datas.percentage}% ${datas.status}` });
                        });

                        if (isAllZero === data.result.dataset.length) {
                            setDataSet([]);
                            setError("All dataset value is 0%");
                        } else {
                            setDataSet(newDataSet);
                        }

                    } else {
                        setDataSet([]);
                        setError('No dataset found...')
                    }
                } else {
                    setDataSet([]);
                    setError(data.statusDescription);
                }
                setLoading(false);
            }
        } catch (error) {
            setDataSet([]);
            setLoading(false);
            setError(error);
        }
    }

    const generateChart = () => (
        <View style={{ position: 'relative', top: -20 }}>
            {
                dataSet.length > 0
                    ?
                    <View style={[style.containerPie]}>
                        <VictoryPie
                            data={dataSet}
                            responsive={true}
                            colorScale={[
                                "#2ECFD3",
                                "#124EAB",
                                "#0064FB",
                                "#22385A",
                            ]}
                            height={230}
                            theme={VictoryTheme.material}
                            labelComponent={
                                <VictoryLabel
                                    style={{ fontSize: 12, fontWeight: 'bold' }}
                                />
                            }
                        />
                    </View>
                    :
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontWeight: 'bold' }}>{error}</Text>
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
            <Card.Content style={style.cardContentWrapper}>
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

export default PieChartComponent;