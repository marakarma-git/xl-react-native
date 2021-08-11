import reduxString from '../reduxString';

const initialState = {
  summaryData: [],
  widgetList: [],
  carousel: [],
  loading: false,
  loadingTopTraffic: false,
  loadingAggregated: false,
  loading12MonthUsage: false,
  error: '',
  simStatistics: null,
  topTrafficStatistics: null,
  aggregatedTraffic: null,
  last12MonthUsage: null,
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
    case reduxString.SET_TOP_TRAFFIC_STATISTICS:
      return {
        ...state,
        loadingTopTraffic: false,
        topTrafficStatistics: action.payload,
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
    case reduxString.REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        loadingTopTraffic: false,
        loadingAggregated: false,
        loading12MonthUsage: false,
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
    case reduxString.REQUEST_TOP_TRAFFIC:
      return {
        ...state,
        loadingTopTraffic: true,
      };
    case reduxString.RESET_TOP_TRAFFIC_STATISTICS:
      return {
        ...state,
        topTrafficStatistics: null,
      };
    default:
      return state;
  }
};
export default dashboard_reducer;
