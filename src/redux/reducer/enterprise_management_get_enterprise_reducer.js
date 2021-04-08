const initialState = {
  loading: false,
  errorText: '',
  data_enterprise: [],
  data_enterprise_generated: [],
};

const enterprise_management_get_enterprise_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'ENTERPRISE_MANAGEMENT_REQUEST_DATA': {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case 'ENTERPRISE_UPDATE_DATA': {
      return {
        ...state,
        loading: false,
        errorText: '',
        data_enterprise: action.dataEnterprise,
        data_enterprise_generated: action.dataEnterpriseGenerated,
      };
    }
    case 'ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS': {
      return {
        ...state,
        loading: false,
        errorText: '',
        data_enterprise: action.dataEnterprise,
        data_enterprise_generated: action.dataEnterpriseGenerated,
      };
    }
    case 'ENTERPRISE_MANAGEMENT_GET_DATA_FAIL': {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    default: {
      return state;
    }
  }
};
export default enterprise_management_get_enterprise_reducer;
