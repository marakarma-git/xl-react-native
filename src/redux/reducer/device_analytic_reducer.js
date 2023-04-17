import reduxString from '../reduxString';

const initialState = {
  enterpriseList: [],
  packageNameList: [],
  loading: false,
  error: '',
  deviceAnalytic: null
};
const device_analytic_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SET_ENTERPRISE_LIST:
      return {
        ...state,
        loading: false,
        enterpriseList: action.payload,
      };
    case reduxString.SET_PACKAGE_NAME_LIST:
      return {
        ...state,
        loading: false,
        packageNameList: action.payload,
      };
    case reduxString.SET_DEVICE_ANALYTIC:
      return {
        ...state,
        loading: false,
        deviceAnalytic: action.payload,
      };
    case reduxString.REQUEST_DEVICE_ANALYTIC:
      return {
        ...state,
        loading: true,
      };
    case reduxString.REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default device_analytic_reducer;
