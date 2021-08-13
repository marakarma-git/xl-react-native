import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {
  HeaderContainer,
  OverlayBackground,
  Text,
  ContentCard,
  FilterCard,
  GridComponent,
  Last12MonthChart,
} from '../../components';

// Undestruct
import styles from '../../style/usageAnalytics.style';
import BarChartComponent from '../../components/widget/barchart';
import {
  get12MonthUsage,
  getAggregatedTraffic,
  getWidgetList,
  resetTopTrafficStatistics,
} from '../../redux/action/dashboard_action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ModalSearchPicker from '../../components/modal/ModalSearchPickerCustom';

const gridOptionsArray = [
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '75%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Aggregation',
    field: 'title',
    cellType: 'text',
    headerType: 'text',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '25%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Data',
    field: 'data',
    cellType: 'text',
    headerType: 'text',
  },
];

const UsageAnalyticsPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const widgetList = useSelector((state) => state.dashboard_reducer.widgetList);
  const userData = useSelector((state) => state.auth_reducer.data);
  const {
    aggregatedTraffic,
    last12MonthUsage,
    loadingAggregated,
    loadingTopTraffic,
    loading12MonthUsage,
  } = useSelector((state) => state.dashboard_reducer);

  const [param3, setParam3] = useState(30);
  const [param3List, setParam3List] = useState([
    {label: '2 Days ago', value: 2, isDisabled: false, isVisible: true},
    {label: '7 Days ago', value: 7, isDisabled: false, isVisible: true},
    {label: '30 Days ago', value: 30, isDisabled: false, isVisible: true},
  ]);

  const [param4, setParam4] = useState(10);
  const [param4List, setParam4List] = useState([
    {label: 'Count is Top 10', value: 10, isDisabled: false, isVisible: true},
    {label: 'Count is Top 20', value: 20, isDisabled: false, isVisible: true},
  ]);

  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [showCountFilter, setShowCountFilter] = useState(false);

  const [topTrafficWidget, setTopTrafficWidget] = useState([]);

  const callWidgetList = () => {
    dispatch(getWidgetList(userData.access_token));
  };

  const callAggregatedTraffic = (params) => {
    dispatch(getAggregatedTraffic(params[0], {}));
  };

  const callLast12MonthUsage = (params) => {
    dispatch(get12MonthUsage(params[0], {}));
  };

  const getWidgetId = (key, widgetData) => {
    const widgetId = widgetData.filter((widget) => widget.widgetCode === key);
    return widgetId;
  };

  useEffect(() => {
    let topTraffic = new Array();
    let aggregatedTraffic = new Array();
    let last12MonthUsage = new Array();

    if (widgetList.length > 0) {
      topTraffic = getWidgetId('Top-Traffic', widgetList);
      aggregatedTraffic = getWidgetId('Aggregated-Traffic', widgetList);
      last12MonthUsage = getWidgetId('Last-12-month-usage', widgetList);

      setTopTrafficWidget(topTraffic);

      callAggregatedTraffic(aggregatedTraffic);
      callLast12MonthUsage(last12MonthUsage);
    }
  }, [widgetList]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      callWidgetList();
      dispatch(resetTopTrafficStatistics());
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Usage Analytics'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <OverlayBackground />
          <View style={styles.cardWrapper}>
            <FilterCard />
            <ContentCard
              loadingContent={loadingTopTraffic ? true : false}
              cardToolbar={
                <>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => setShowPeriodFilter(true)}>
                    <Text fontType="bold" style={styles.linkText}>
                      By Period
                    </Text>
                  </TouchableOpacity>
                  <Text fontType="bold" style={styles.filterText}>
                    |
                  </Text>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => setShowCountFilter(true)}>
                    <Text fontType="bold" style={styles.linkText}>
                      By Count
                    </Text>
                  </TouchableOpacity>
                </>
              }
              cardContent={
                <>
                  {topTrafficWidget.length > 0 && (
                    <BarChartComponent
                      viewType="analytics"
                      item={topTrafficWidget[0]}
                      filterParams={{param3, param4}}
                    />
                  )}
                </>
              }
              cardTitle="Top Traffic Statistics"
            />
            <ContentCard
              cardTitle={`Aggregated Traffic`}
              loadingContent={loadingAggregated ? true : false}
              cardContent={
                <>
                  {!loadingAggregated && (
                    <GridComponent
                      indexIdentifier="title"
                      gridData={aggregatedTraffic || []}
                      gridOptions={gridOptionsArray}
                      tableMaxHeight={160}
                    />
                  )}
                </>
              }
            />
            <ContentCard
              loadingContent={loading12MonthUsage ? true : false}
              cardTitle="Last 12 Month Usage"
              cardContent={<Text>{<Last12MonthChart />}</Text>}
            />
          </View>
        </View>
      </ScrollView>
      {showPeriodFilter && (
        <ModalSearchPicker
          modalHeight={230}
          data={param3List}
          onChange={(e) => {
            setParam3(e.value);
            dispatch(resetTopTrafficStatistics());
            setShowPeriodFilter(false);
          }}
          onClose={() => setShowPeriodFilter(false)}
          removeSearch={true}
          title={'Period Filter'}
          value={param3}
        />
      )}
      {showCountFilter && (
        <ModalSearchPicker
          modalHeight={180}
          data={param4List}
          onChange={(e) => {
            setParam4(e.value);
            dispatch(resetTopTrafficStatistics());
            setShowCountFilter(false);
          }}
          onClose={() => setShowCountFilter(false)}
          removeSearch={true}
          title={'Count Filter'}
          value={param4}
        />
      )}
    </View>
  );
};

export default UsageAnalyticsPage;
