import reduxString from '../reduxString';

const initialState = {
  summaryData: [],
  widgetList: [],
  carousel: [],
  loading: false,
  loadingTopTraffic: false,
  loadingTopDeviceBrand: false,
  loadingFinancialReport: false,
  loadingAggregated: false,
  loading12MonthUsage: false,
  loadingMonthUsage: false,
  loadingSubsAnalytics: false,
  error: '',
  simStatistics: null,
  customStatistics: null,
  topTrafficStatistics: null,
  topDeviceBrand: null,
  financialReportStatistics: null,
  aggregatedTraffic: null,
  last12MonthUsage: null,
  monthUsage: null,
  subsAnalytics: [],
  minSubsAnalyticValue: null,
  cummulativeMonthUsage: null,
};
const dashboard_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SET_DASHBOARD_SUMMARY:
      return {
        ...state,
        loading: false,
        summaryData: action.payload,
      };
    case reduxString.SET_WIDGET_LIST:
      return {
        ...state,
        loading: false,
        widgetList: action.payload,
      };
    case reduxString.SET_CAROUSEL:
      return {
        ...state,
        loading: false,
        carousel: action.payload,
      };
    case reduxString.SET_SIM_STATISTICS:
      return {
        ...state,
        loading: false,
        simStatistics: action.payload,
      };
    case reduxString.SET_CUSTOM_STATISTICS:
      return {
        ...state,
        loading: false,
        customStatistics: action.payload,
      };
    case reduxString.SET_TOP_TRAFFIC_STATISTICS:
      return {
        ...state,
        loadingTopTraffic: false,
        topTrafficStatistics: action.payload,
      };
    case reduxString.SET_TOP_DEVICE_BRAND:
      return {
        ...state,
        loadingTopDeviceBrand: false,
        topDeviceBrand: action.payload,
      };
    case reduxString.SET_FINANCIAL_REPORT:
      return {
        ...state,
        loadingFinancialReport: false,
        financialReportStatistics: action.payload,
      };
    case reduxString.SET_AGGREGATED_TRAFFIC:
      return {
        ...state,
        loadingAggregated: false,
        aggregatedTraffic: action.payload,
      };
    case reduxString.SET_12_MONTH_USAGE:
      return {
        ...state,
        loading12MonthUsage: false,
        last12MonthUsage: action.payload,
      };
    case reduxString.SET_SUBS_ANALYTICS:
      return {
        ...state,
        loadingSubsAnalytics: false,
        minSubsAnalyticValue: action.payload.minValue,
        subsAnalytics: action.payload.data,
      };
    case reduxString.SET_MONTH_USAGE:
      return {
        ...state,
        loadingMonthUsage: false,
        monthUsage: action.payload.day,
        cummulativeMonthUsage: action.payload.cummulative,
      };
    case reduxString.REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        loadingTopTraffic: false,
        loadingAggregated: false,
        loading12MonthUsage: false,
        loadingMonthUsage: false,
        loadingSubsAnalytics: false,
        error: action.payload,
      };
    case reduxString.REQUEST_DASHBOARD_DATA:
      return {
        ...state,
        loading: true,
      };
    case reduxString.REQUEST_AGGREGATED_TRAFFIC:
      return {
        ...state,
        loadingAggregated: true,
      };
    case reduxString.REQUEST_12_MONTH_USAGE:
      return {
        ...state,
        loading12MonthUsage: true,
      };
    case reduxString.REQUEST_MONTH_USAGE:
      return {
        ...state,
        loadingMonthUsage: true,
      };
    case reduxString.REQUEST_TOP_TRAFFIC:
      return {
        ...state,
        loadingTopTraffic: true,
      };
    case reduxString.REQUEST_TOP_DEVICE_BRAND:
      return {
        ...state,
        loadingTopDeviceBrand: true,
      };
    case reduxString.REQUEST_FINANCE_REPORT:
      return {
        ...state,
        loadingTopTraffic: true,
      };
    case reduxString.REQUEST_SUBS_ANALYTICS:
      return {
        ...state,
        loadingSubsAnalytics: true,
      };
    case reduxString.RESET_TOP_TRAFFIC_STATISTICS:
      return {
        ...state,
        topTrafficStatistics: null,
      };
    case reduxString.RESET_SUBS_ANALYTIC:
      return {
        ...state,
        subsAnalytics: [],
        minSubsAnalyticValue: null,
      };
    default:
      return state;
  }
};
export default dashboard_reducer;
