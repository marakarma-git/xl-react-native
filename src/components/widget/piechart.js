import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import { View, ActivityIndicator } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Axios from 'axios';
import { dashboard_base_url } from '../../constant/connection';
import style from '../../style/home.style';

const PieChartComponent = ({item, navigation}) => {
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
                        newDataSet.push({ x: +datas.percentage, y: +datas.percentage, label: `${datas.percentage}% ${datas.status}` });
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
            <Card.Content style={style.cardContentWrapper}>
                <Title>{item.jsonData.title.text}</Title>
                { 
                    loading ? 
                    <ActivityIndicator color="#002DBB" size="large" />
                    :
                    <View style={style.containerPie} pointerEvents="none">
                        <VictoryPie
                            data={dataSet}
                            responsive={true}
                            colorScale={["#00BFA6", "red", "yellow", "green"]}
                            height={230}
                            theme={VictoryTheme.material}
                            labelComponent={
                                <VictoryLabel
                                    style={{fontSize: '14px', fontWeight: 'bold'}}
                                />
                            }
                        />
                    </View>
                }
            </Card.Content>
        </Card>
    )
}

export default PieChartComponent;