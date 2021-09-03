import React, {useEffect} from 'react';
import Helper from '../../helpers/helper';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import Text from '../../components/global/text';
import {Card, Headline} from 'react-native-paper';
import {
  HeaderContainer,
  OverlayBackground,
  WidgetStore,
} from '../../components/index';
import {
  getDashboardSummary,
  getWidgetList,
} from '../../redux/action/dashboard_action';
import Orientation from '../../helpers/orientation';

import style from '../../style/home.style';
import {colors} from '../../constant/color';

const DashboardPage = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const widgetList = useSelector((state) => state.dashboard_reducer.widgetList);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const summaryDashboardData = useSelector(
    (state) => state.dashboard_reducer.summaryData,
  );
  const loading = useSelector((state) => state.dashboard_reducer.loading);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          style.itemSeparatorCard,
          {
            borderLeftWidth: index % 2 === 0 ? 0 : 0.2,
            borderBottomWidth: index === 0 || index === 1 ? 0.2 : 0,
          },
        ]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: Orientation.getWidth() * 0.033,
            marginVertical: '5%',
          }}>
          {item.title}
        </Text>
        <Headline style={{fontWeight: 'bold', color: '#1139BF'}}>
          {item.resultId === 'totalaggregatedtraffic'
            ? Helper.formatBytes(item.value)
            : Helper.numberFormat(item.value, '.')}
        </Headline>
      </View>
    );
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(getDashboardSummary(userData.access_token));
      dispatch(getWidgetList(userData.access_token));
    });
  }, [dispatch, navigation, userData.access_token]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Dashboard'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}>
        <View style={{height: '100%', alignItems: 'center'}}>
          <OverlayBackground />
          <View style={style.cardWrapper}>
            <Card style={[style.cardSection, {marginTop: '3%'}]}>
              <Card.Content style={style.cardContentWrapper}>
                {loading ? (
                  <ActivityIndicator
                    color={colors.button_color_one}
                    size="large"
                  />
                ) : (
                  <FlatList
                    data={summaryDashboardData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}
                    numColumns={2}
                    columnWrapperStyle={style.cardContentRow}
                  />
                )}
              </Card.Content>
            </Card>
            <View>{widgetList && <WidgetStore widgetList={widgetList} />}</View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardPage;
