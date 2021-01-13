import React, { useEffect } from 'react';
import Helper from '../../helpers/helper';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card, Title, Headline } from 'react-native-paper';
import { HeaderContainer, OverlayBackground } from '../../components/index';
import { getDashboardSummary } from '../../redux/action/dashboard_action';

import style from '../../style/home.style';

const DashboardPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth_reducer.data);
  const summaryDashboardData = useSelector(state => state.dashboard_reducer.summaryData);
  const loading = useSelector(state => state.dashboard_reducer.loading);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          style.itemSeparatorCard,
          {
            borderLeftWidth: index % 2 === 0 ? 0 : 0.2,
            borderBottomWidth: index == 0 || index == 1 ? 0.2 : 0,
          },
        ]}>
        <Title style={{ fontSize: 14 }}>{item.title}</Title>
        <Headline>{item.resultId == 'totalaggregatedtraffic' ? Helper.formatBytes(item.value) : Helper.numberFormat(item.value, '.')}</Headline>
      </View>
    );
  };

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      dispatch(getDashboardSummary(userData.access_token));
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation} />
      <ScrollView>
        <View style={{ height: '100%' }}>
          <OverlayBackground />
          <Card style={[style.cardSection]}>
            <Card.Content style={style.cardContentWrapper}>
              {
                loading
                  ? <ActivityIndicator color="#002DBB" size="large" />
                  :
                  <FlatList
                    data={summaryDashboardData}
                    renderItem={renderItem}
                    keyExtractor={item => item.title}
                    numColumns={2}
                    columnWrapperStyle={style.cardContentRow}
                  />
              }
            </Card.Content>
          </Card>
          <Card style={style.cardSection}>
            <Card.Content style={style.cardContentWrapper}>
            </Card.Content>
          </Card>
          <Card style={style.cardSection}>
            <Card.Content style={style.cardContentWrapper}>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardPage;