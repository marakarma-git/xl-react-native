import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Axios from 'axios';
import Helper from '../../helpers/helper';
import { dataset_base_url } from '../../constant/connection';
import style from '../../style/home.style';

const title = [
    "From start of month, Total Volume",
    "Previous 30 Days, Total Volume",
    "From start of month, Average per subscription",
    "Previous 30 Days, Average per subscription",
    "From start of month, Total SMS",
    "Previous 30 Days, Total SMS",
    "From start of month, Average per SMS subscription",
    "Previous 30 Days, Average per SMS subscription",
]

const AggregateTrafficComponent = ({ item, navigation }) => {
    const [dataSet, setDataSet] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const userData = useSelector(state => state.auth_reducer.data);

    const params = {
        "param1": userData.customerNo,
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
    }

    const parseData = () => (
        <>
            {dataSet.length > 0
                ?
                Object.keys(dataSet[0]).map((key, index) => (
                    <View key={index} style={style.aggregateList}>
                        <Text style={{ fontSize: 11 }}>{title[index]}</Text>
                        <Text style={{ fontSize: 11 }}>{Helper.formatBytes(dataSet[0][key])}</Text>
                    </View>
                ))
                :
                <View style={{ marginTop: 30 }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, fontWeight: 'bold' }}>{error}</Text>
                </View>
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
            <Card.Content style={style.cardContentWrapper}>
                <Title>{item.jsonData.title.text}</Title>
                {
                    loading ?
                        <ActivityIndicator color="#002DBB" size="large" />
                        :
                        <View style={style.containerPie} pointerEvents="none">
                            {dataSet && parseData()}
                        </View>
                }
            </Card.Content>
        </Card>
    )
}

export default AggregateTrafficComponent;