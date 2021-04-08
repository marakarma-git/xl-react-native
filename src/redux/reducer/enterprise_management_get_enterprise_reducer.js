import reduxString from '../reduxString';

const initialState = {
  loading: false,
  errorText: '',
  data_enterprise: [],
  data_enterprise_generated: [],
  enterprise_page: 0,
  enterprise_total_page: 0,
  enterprise_total_size: 20,
  enterprise_elements_static: 0,
  enterprise_elements_dynamic: 0,
  enterprise_applied_filter: false,
  enterprise_applied_header_sort: {
    formId: '',
    orderBy: '',
    sortBy: '',
  },
  enterprise_params_applied_activity_log: '',
};

const enterprise_management_get_enterprise_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.ENTERPRISE_MANAGEMENT_REQUEST_DATA: {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.ENTERPRISE_UPDATE_DATA: {
      return {
        ...state,
        loading: false,
        errorText: '',
        data_enterprise: action.dataEnterprise,
        data_enterprise_generated: action.dataEnterpriseGenerated,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: '',
        data_enterprise: action.dataEnterprise,
        data_enterprise_generated: action.dataEnterpriseGenerated,
        enterprise_page: action.enterprisePage,
        enterprise_total_page: action.enterpriseTotalPage,
        enterprise_total_size: action.enterpriseTotalSize,
        enterprise_elements_static:
          state.enterprise_elements_static === 0
            ? action.enterpriseElements
            : state.enterprise_elements_static,
        enterprise_elements_dynamic: action.enterpriseElements,
        enterprise_applied_filter: action.enterpriseAppliedFilter,
        enterprise_applied_header_sort:
          action.enterpriseAppliedHeaderSort ||
          initialState.enterprise_applied_header_sort,
        enterprise_params_applied_activity_log:
          action.enterpriseParamsAppliedActivityLog || '',
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_GET_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_SET_DATA_GENERATED: {
      return {
        ...state,
        data_enterprise_generated: action.dataEnterpriseGenerated,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_SET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        enterprise_applied_header_sort: {
          formId: action.roleAppliedHeaderSort?.formId || '',
          orderBy: action.roleAppliedHeaderSort?.orderBy || '',
          sortBy: action.roleAppliedHeaderSort?.sortBy || '',
        },
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_RESET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        enterprise_applied_header_sort:
          initialState.enterprise_applied_header_sort,
      };
    }
    default: {
      return state;
    }
  }
};
export default enterprise_management_get_enterprise_reducer;
