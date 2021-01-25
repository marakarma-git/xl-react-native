import reduxString from '../reduxString';

const initialState = {
  loading_enterprise_package_name: false,
  error_enterprise_package_name: '',
  data_enterprise_package_name: [],
};
const get_enterprise_package_name_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_ENTERPRISE_PACKAGE_NAME_LOADING:
      return {
        ...state,
        loading_enterprise_package_name: true,
      };
    case reduxString.GET_ENTERPRISE_PACKAGE_NAME_SUCCESS:
      return {
        loading_enterprise_package_name: false,
        error_enterprise_package_name: '',
        data_enterprise_package_name: action.data,
      };
    case reduxString.GET_ENTERPRISE_PACKAGE_NAME_FAILED:
      return {
        ...state,
        loading_enterprise_package_name: false,
        error_enterprise_package_name: action.error,
      };
    case reduxString.GET_ENTERPRISE_PACKAGE_NAME_RESET:
      return state;
    default:
      return state;
  }
};
export default get_enterprise_package_name_reducer;
