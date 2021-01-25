import reduxString from '../reduxString';

const initialState = {
  loading_enterprise_corp: false,
  data_enterprise_corp: [],
  error_enterprise_corp: '',
};
const get_enterprise_corp_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_ENTERPRISE_CORP_LOADING:
      return {
        ...state,
        loading_enterprise_corp: true,
      };
    case reduxString.GET_ENTERPRISE_CORP_SUCCESS:
      return {
        error_enterprise_corp: '',
        loading_enterprise_corp: false,
        data_enterprise_corp: action.data,
      };
    case reduxString.GET_ENTERPRISE_CORP_FAILED:
      return {
        error_enterprise_corp: action.error,
        loading_enterprise_corp: false,
      };
    case reduxString.GET_ENTERPRISE_CORP_RESET:
      return state;
    default:
      return state;
  }
};
export default get_enterprise_corp_reducer;
