import reduxString from '../reduxString';

const initialState = {
  loading: false,
  errorText: '',
  disabled: false,
  value: {},
  data_active_enterprise: [],
};
const automation_get_enterprise_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTOMATION_GET_ACTIVE_ENTERPRISE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case reduxString.AUTOMATION_GET_ACTIVE_ENTERPRISE_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: '',
        data_active_enterprise: action.dataActiveEnterprise,
      };
    }
    case reduxString.AUTOMATION_GET_ACTIVE_ENTERPRISE_FAILED: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    case reduxString.AUTOMATION_SET_ACTIVE_ENTERPRISE: {
      return {
        ...state,
        value: action.valueEnterprise,
      };
    }
    default: {
      return state;
    }
  }
};
export default automation_get_enterprise_reducer;
