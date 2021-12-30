import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {
  HeaderContainer,
  OverlayBackground,
  Text,
  ContentCard,
  GridComponent,
  Last12MonthChart,
  DayMonthChart,
  FilterDropdown,
  ButtonCurveTypeComponent,
} from '../../components';
import {
  usageAnalyticsDynamicResetSelectedValue,
  usageAnalyticsGenerateParams,
} from '../../redux/action/usage_analytics_filter_action';

// Undestruct
import styles from '../../style/usageAnalytics.style';
import BarChartComponent from '../../components/widget/barchart';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {
  get12MonthUsage,
  getAggregatedTraffic,
  getMonthUsage,
  getWidgetList,
  resetTopTrafficStatistics,
} from '../../redux/action/dashboard_action';
import ModalSearchPicker from '../../components/modal/ModalSearchPickerCustom';
import Helper from '../../helpers/helper';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const {
    aggregatedTraffic,
    loadingAggregated,
    loadingTopTraffic,
    loading12MonthUsage,
    loadingMonthUsage,
  } = useSelector((state) => state.dashboard_reducer);
  const {appliedFilter, generatedParams} = useSelector(
    (state) => state.usage_analytics_filter_reducer,
  );
  const [param1, setParam1] = useState(null);
  const [param2, setParam2] = useState(null);
  const [param3, setParam3] = useState(2);
  const [param3List, setParam3List] = useState([
    {label: '2 Days ago', value: 2, isDisabled: false, isVisible: true},
    {
      label: 'Previous 7 Days ago',
      value: 7,
      isDisabled: false,
      isVisible: true,
    },
    {
      label: 'Previous 30 Days ago',
      value: 30,
      isDisabled: false,
      isVisible: true,
    },
  ]);
  const [param4, setParam4] = useState(10);
  const [param4List, setParam4List] = useState([
    {label: 'Top 10', value: 10, isDisabled: false, isVisible: true},
    {label: 'Top 20', value: 20, isDisabled: false, isVisible: true},
  ]);
  const [curveType, setCurveType] = useState({
    value: 'day',
    label: 'Day Volumes',
  });
  const [curveTypeOptions, setCurveTypeOptions] = useState([
    {label: 'Day Volumes', value: 'day', isDisabled: false, isVisible: true},
    {
      label: 'Cumulative Month Values',
      value: 'cumulative',
      isDisabled: false,
      isVisible: true,
    },
    {label: 'Both', value: 'both', isDisabled: false, isVisible: true},
  ]);
  const [periodLabel, setPeriodLabel] = useState('2 Days ago');
  const [countLabel, setCountLabel] = useState('Top 10');
  const [showCurveType, setShowCurveType] = useState(false);
  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [showCountFilter, setShowCountFilter] = useState(false);
  const [topTrafficWidget, setTopTrafficWidget] = useState([]);
  const [monthUsageId, setMonthUsage] = useState(null);
  const [monthUsageText, setMonthUsageText] = useState('');
  const [showMonthUsage, setShowMonthUsage] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const _showMonthUsage = (monthPeriod, type = 'get') => {
    let isSubstract = type === 'substract' ? true : false;
    let isSum = type === 'sum' ? true : false;
    const param3 = Helper.monthlyUsageParams(monthPeriod, isSubstract, isSum);
    const monthYear = Helper.numToYearMonth(param3);
    setMonthUsageText(monthYear);
    setShowMonthUsage(param3);
    dispatch(getMonthUsage(monthUsageId[0], {param3}));
  };

  const callWidgetList = () => {
    dispatch(getWidgetList());
  };

  const callAggregatedTraffic = (params) => {
    let apiParams = {};
    if (param1) apiParams.param1 = param1;
    if (param2) apiParams.param2 = param2;
    dispatch(getAggregatedTraffic(params[0], apiParams));
  };

  const callLast12MonthUsage = (params) => {
    let apiParams = {};
    if (param1) apiParams.param1 = param1;
    if (param2) apiParams.param2 = param2;
    dispatch(get12MonthUsage(params[0], apiParams));
  };

  const getWidgetId = (key, widgetData) => {
    const widgetId = widgetData.filter((widget) => widget.widgetCode === key);
    return widgetId;
  };

  useEffect(() => {
    let topTraffic = new Array();
    let aggregatedTraffic = new Array();
    let last12MonthUsage = new Array();
    let monthUsage = new Array();

    if (widgetList.length > 0) {
      topTraffic = getWidgetId('Top-Traffic', widgetList);
      aggregatedTraffic = getWidgetId('Aggregated-Traffic', widgetList);
      last12MonthUsage = getWidgetId('Last-12-month-usage', widgetList);
      monthUsage = getWidgetId('monthly-usage', widgetList);
      setTopTrafficWidget(topTraffic);
      setMonthUsage(monthUsage);
      callAggregatedTraffic(aggregatedTraffic);
      callLast12MonthUsage(last12MonthUsage);
      setIsFirstRender(false);
    }
  }, [widgetList]);

  useEffect(() => {
    let splitParams = generatedParams.split(',');
    setParam1(splitParams[0] || '');
    setParam2(splitParams[1] || '');
    if (!isFirstRender) {
      callWidgetList();
    }
  }, [generatedParams, appliedFilter]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      callWidgetList();
      dispatch(resetTopTrafficStatistics());
      setShowMonthUsage(null);
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
            <AppliedFilter
              withFilterButton
              onPressFilter={() =>
                navigation.navigate('UsageAnalyticsFilterPage')
              }
              style={{marginLeft: 0, flex: 1}}
              data={appliedFilter}
              onDelete={(e) => {
                const {formId} = e || {};
                dispatch(usageAnalyticsDynamicResetSelectedValue({formId}));
                dispatch(usageAnalyticsGenerateParams());
              }}
            />
            <ContentCard
              loadingContent={loadingTopTraffic ? true : false}
              cardBody={
                <>
                  <FilterDropdown
                    setShowToggle={setShowPeriodFilter}
                    dropdownText={periodLabel}
                    dropDownTitle={'Period'}
                  />
                  <FilterDropdown
                    setShowToggle={setShowCountFilter}
                    dropdownText={countLabel}
                    dropDownTitle={'Count'}
                  />
                </>
              }
              cardContent={
                <>
                  {topTrafficWidget.length > 0 && (
                    <BarChartComponent
                      viewType="analytics"
                      item={topTrafficWidget[0]}
                      filterParams={
                        param1 && param2
                          ? {param1, param2, param3, param4}
                          : {param3, param4}
                      }
                    />
                  )}
                </>
              }
              cardTitle="Top Traffic Statistics"
            />
            <ContentCard
              cardTitle={`Aggregated Traffic`}
              loadingContent={loadingAggregated}
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
            {showMonthUsage ? (
              <ContentCard
                loadingContent={loadingMonthUsage}
                cardTitleComponent={
                  <View style={{flexDirection: 'row'}}>
                    <Text fontType="bold" style={styles.cardTitleText}>
                      Month Usage{' '}
                    </Text>
                    <TouchableOpacity onPress={() => setShowMonthUsage(null)}>
                      <Text>&gt; </Text>
                    </TouchableOpacity>
                    <Text fontType="bold" style={styles.monthText}>
                      {monthUsageText}
                    </Text>
                  </View>
                }
                cardToolbar={
                  <ButtonCurveTypeComponent
                    label={curveType?.label}
                    setShowModal={setShowCurveType}
                    showModal={showCurveType}
                    curveTypeOptions={curveTypeOptions}
                    curveType={curveType}
                    setCurveType={setCurveType}
                  />
                }
                cardContent={<DayMonthChart chartType={curveType?.value} />}
                cardFooter={
                  <>
                    <TouchableOpacity
                      disabled={loadingMonthUsage}
                      onPress={() =>
                        _showMonthUsage(monthUsageText, 'substract')
                      }
                      style={styles.navigationButtonFormStep}>
                      <Text style={{color: 'white'}} fontType="bold">
                        Prev
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={loadingMonthUsage}
                      onPress={() => _showMonthUsage(monthUsageText, 'sum')}
                      style={styles.navigationButtonFormStep}>
                      <Text style={{color: 'white'}} fontType="bold">
                        Next
                      </Text>
                    </TouchableOpacity>
                  </>
                }
              />
            ) : (
              <ContentCard
                loadingContent={loading12MonthUsage}
                cardTitle="Last 12 Month Usage"
                cardContent={
                  <Text>
                    {<Last12MonthChart setShowMonthUsage={_showMonthUsage} />}
                  </Text>
                }
              />
            )}
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
            setPeriodLabel(e.label);
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
            setCountLabel(e.label);
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
