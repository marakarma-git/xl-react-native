import reduxString from '../reduxString';

const initialState = {
  summaryData: [],
  widgetList: [],
  carousel: [],
  loading: false,
  error: '',
  simStatistics: null,
  topTrafficStatistics: null,
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
        loading: false,
        topTrafficStatistics: action.payload,
      };
    case reduxString.REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case reduxString.REQUEST_DASHBOARD_DATA:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default dashboard_reducer;
