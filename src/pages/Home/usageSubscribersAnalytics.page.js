import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import {
  ContentCard,
  HeaderContainer,
  OverlayBackground,
  UsageSubsChart,
} from '../../components';
import {
  usageSubscribersAnalyticsDynamicResetSelectedValue,
  usageSubscribersAnalyticsGenerateParams,
  usageSubscribersAnalyticsResetAllValue,
} from '../../redux/action/usage_subscribers_analytics_filter_action';
import styles from '../../style/usageAnalytics.style';
import AppliedFilter from '../../components/subscription/appliedFilter';
import {
  getSubsAnalytics,
  getWidgetList,
  resetSubsAnalytics,
} from '../../redux/action/dashboard_action';

const UsageSubscribersAnalyticsPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const widgetList = useSelector((state) => state.dashboard_reducer.widgetList);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {appliedFilter, generatedParams} = useSelector(
    (state) => state.usage_subscribers_analytics_filter_reducer,
  );
  const {subsAnalytics, loadingSubsAnalytics} = useSelector(
    (state) => state.dashboard_reducer,
  );
  const [param1, setParam1] = useState(null);
  const [param2, setParam2] = useState(null);
  const [monthlyWidget, setMonthlyWidget] = useState(null);
  const [dailyWidget, setDailyWidget] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const getWidgetId = (key, widgetData) => {
    const widgetId = widgetData.filter((widget) => widget.widgetCode === key);
    return widgetId;
  };

  const callWidgetList = () => {
    dispatch(getWidgetList());
  };

  const getMonthlySubs = (params, customParams = {}) => {
    let apiParams = {};
    if (param1) apiParams.param1 = param1;
    if (param2) apiParams.param2 = param2;
    if (params) {
      dispatch(getSubsAnalytics(params[0], apiParams));
    }
  };

  const getDailySubs = (widgetId, params) => {
    let apiParams = {...params};
    if (param1) apiParams.param1 = param1;
    if (param2) apiParams.param2 = param2;
    if (widgetId) {
      dispatch(getSubsAnalytics(widgetId, apiParams));
    }
  };

  const getWidgetCode = useCallback(async () => {
    if (widgetList.length > 0) {
      let monthlyData = await getWidgetId('subs-analytics', widgetList);
      let dailyData = await getWidgetId('daily-subs-analytics', widgetList);
      setMonthlyWidget(monthlyData);
      setDailyWidget(dailyData);
      getMonthlySubs(monthlyData);
      setIsFirstRender(false);
    }
  }, [widgetList]);

  useEffect(() => {
    getWidgetCode();
  }, [getWidgetCode]);

  useEffect(() => {
    let splitParams = generatedParams.split(',');
    setParam1(splitParams[0]);
    setParam2(splitParams[1]);
    if (!isFirstRender) {
      callWidgetList();
    }
  }, [generatedParams, appliedFilter]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      callWidgetList();
    });
    return pageLoad;
  }, [navigation]);
  useEffect(() => {
    const pageBlur = navigation.addListener('blur', () => {
      dispatch(resetSubsAnalytics());
    });
    return pageBlur;
  }, [navigation]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Usage Subscribers Analytics'}
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
                navigation.navigate('UsageSubscribersAnalyticsFilterPage')
              }
              style={{marginLeft: 0, flex: 1}}
              data={appliedFilter}
              onDelete={(e) => {
                const {formId} = e || {};
                if (
                  formId === 'usage-subscribers-analytics-enterprise-hard-code'
                ) {
                  dispatch(
                    usageSubscribersAnalyticsDynamicResetSelectedValue({
                      formId,
                    }),
                  );
                  dispatch(
                    usageSubscribersAnalyticsDynamicResetSelectedValue({
                      formId:
                        'usage-subscribers-analytics-package-name-hard-code',
                    }),
                  );
                } else {
                  dispatch(
                    usageSubscribersAnalyticsDynamicResetSelectedValue({
                      formId,
                    }),
                  );
                }
                dispatch(usageSubscribersAnalyticsGenerateParams());
              }}
            />
            <ContentCard
              loadingContent={loadingSubsAnalytics}
              cardContent={
                <>
                  {subsAnalytics.length > 0 && (
                    <UsageSubsChart
                      getDailyChart={getDailySubs}
                      dailyWidget={dailyWidget}
                    />
                  )}
                </>
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UsageSubscribersAnalyticsPage;
