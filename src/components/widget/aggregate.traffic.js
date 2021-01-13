import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ActivityIndicator, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Axios from 'axios';
import Helper from '../../helpers/helper';
import { dashboard_base_url } from '../../constant/connection';
import style from '../../style/home.style';

const title = [
    "From start of month, Total Volume",
    "Previous 30 Days, Total Volume",
    "From start of month, Average per subscription",
    "Previous 30 Days, Average per subscription",
]

const AggregateTrafficComponent = ({item, navigation}) => {
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
                    setDataSet(data.result.dataset);
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
            { Object.keys(dataSet[0]).map((key, index) => (
                <View key={index} style={style.aggregateList}>
                    <Text style={{ fontSize: 11 }}>{ title[index] }</Text>
                    <Text style={{ fontSize: 11 }}>{ Helper.formatBytes(dataSet[0][key]) }</Text>
                </View>
            )) }
        </>
    )

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
            <Card.Content style={style.cardContentWrapper}>
                <Title>{item.jsonData.title.text}</Title>
                { 
                    loading ? 
                    <ActivityIndicator color="#002DBB" size="large" />
                    :
                    <View style={style.containerPie} pointerEvents="none">
                        { dataSet[0] && parseData() }
                    </View>
                }
            </Card.Content>
        </Card>
    )
}

export default AggregateTrafficComponent;