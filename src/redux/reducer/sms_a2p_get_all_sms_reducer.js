import reduxString from '../reduxString';

const initialState = {
  loading: false,
  errorText: '',
  data_sms: [],
  data_sms_generated: [],
  sms_page: 0,
  sms_total_page: 0,
  sms_total_size: 20,
  sms_elements_static: 0,
  sms_elements_dynamic: 0,
  sms_applied_filter: false,
  sms_applied_header_sort: {
    formId: '',
    orderBy: '',
    sortBy: '',
  },
  sms_params_applied_activity_log: '',
};
const sms_a2p_get_all_sms_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SMS_A2P_GET_SMS_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.SMS_A2P_GET_SMS_SUCCESS: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: initialState.errorText,
        data_sms: action.dataSms,
        data_sms_generated: action.dataSmsGenerated,
        sms_page: action.smsPage,
        sms_total_page: action.smsTotalPage,
        sms_total_size: action.smsTotalSize,
        sms_elements_static:
          state.sms_elements_static === 0
            ? action.smsElements
            : state.sms_elements_static,
        sms_elements_dynamic: action.smsElements,
        sms_applied_filter: action.smsAppliedFilter,
        sms_applied_header_sort:
          action.smsAppliedHeaderSort || initialState.sms_applied_header_sort,
        sms_params_applied_activity_log:
          action.smsParamsAppliedActivityLog || '',
      };
    }
    case reduxString.SMS_A2P_GET_SMS_FAILED: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: action.errorText,
      };
    }
    case reduxString.SMS_A2P_GET_SMS_RESET: {
      return state;
    }
    case reduxString.SMS_A2P_SET_DATA_SMS_GENERATED: {
      return {
        ...state,
        data_sms_generated: [...action.dataSmsGenerated],
      };
    }
    case reduxString.SMS_A2P_RESET_DATA_SMS_GENERATED: {
      return {
        ...state,
        data_sms_generated: initialState.data_sms_generated,
      };
    }
    case reduxString.SMS_A2P_SET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        sms_applied_header_sort: {
          formId: action.smsAppliedHeaderSort?.formId || '',
          orderBy: action.smsAppliedHeaderSort?.orderBy || '',
          sortBy: action.smsAppliedHeaderSort?.sortBy || '',
        },
      };
    }
    case reduxString.SMS_A2P_RESET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        sms_applied_header_sort: initialState.sms_applied_header_sort,
      };
    }
    case reduxString.SMS_A2P_REPLACE_CELL_WITH_INDEX: {
      state.data_sms_generated[action.indexToReplace] = action.indexReplaceData;
      return {
        ...state,
        data_sms_generated: state.data_sms_generated,
      };
    }
    default: {
      return state;
    }
  }
};
export default sms_a2p_get_all_sms_reducer;
