import reduxString from '../reduxString';

const initialState = {
  reload: false,
  loading: false,
  errorText: '',
  data_automation: [],
  data_automation_generated: [],
  automation_page: 0,
  automation_total_page: 0,
  automation_total_size: 20,
  automation_elements_static: 0,
  automation_elements_dynamic: 0,
  automation_applied_filter: false,
  automation_applied_header_sort: {
    formId: '',
    orderBy: '',
    sortBy: '',
  },
  automation_params_applied_activity_log: '',
};
const automation_get_automation_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTOMATION_ELEMENT_STATIC_MINUS_ONE: {
      return {
        ...state,
        automation_elements_static: state.automation_elements_static - 1,
      };
    }
    case reduxString.AUTOMATION_ELEMENT_STATIC_PLUS_ONE: {
      return {
        ...state,
        automation_elements_static: state.automation_elements_static + 1,
      };
    }
    case reduxString.AUTOMATION_GET_AUTOMATION_RELOAD: {
      return {
        ...state,
        reload: true,
      };
    }
    case reduxString.AUTOMATION_GET_AUTOMATION_LOADING: {
      return {
        ...state,
        reload: false,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.AUTOMATION_GET_AUTOMATION_SUCCESS: {
      return {
        ...state,
        reload: false,
        loading: initialState.loading,
        errorText: initialState.errorText,
        data_automation: action.dataAutomation,
        data_automation_generated: action.dataAutomationGenerated,
        automation_page: action.automationPage,
        automation_total_page: action.automationTotalPage,
        automation_total_size: action.automationTotalSize,
        automation_elements_static:
          state.automation_elements_static === 0
            ? action.automationElements
            : state.automation_elements_static,
        automation_elements_dynamic: action.automationElements,
        automation_applied_filter: action.automationAppliedFilter,
        automation_applied_header_sort:
          action.automationAppliedHeaderSort ||
          initialState.automation_applied_header_sort,
        automation_params_applied_activity_log:
          action.automationParamsAppliedActivityLog || '',
      };
    }
    case reduxString.AUTOMATION_GET_AUTOMATION_FAILED: {
      return {
        ...state,
        reload: false,
        loading: initialState.loading,
        errorText: action.errorText,
      };
    }
    case reduxString.AUTOMATION_GET_AUTOMATION_RESET: {
      return state;
    }
    case reduxString.AUTOMATION_SET_DATA_AUTOMATION_GENERATED: {
      return {
        ...state,
        data_automation_generated: [...action.dataAutomationGenerated],
      };
    }
    case reduxString.AUTOMATION_RESET_DATA_AUTOMATION_GENERATED: {
      return {
        ...state,
        data_automation_generated: initialState.data_automation_generated,
      };
    }
    case reduxString.AUTOMATION_DYNAMIC_CHECK_DATA_AUTOMATION: {
      state.data_automation_generated[action.index].is_checked_root =
        !state.data_automation_generated[action.index].is_checked_root;
      return {
        ...state,
        data_automation_generated: state.data_automation_generated,
      };
    }
    case reduxString.AUTOMATION_SET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        automation_applied_header_sort: {
          formId: action.automationAppliedHeaderSort?.formId || '',
          orderBy: action.automationAppliedHeaderSort?.orderBy || '',
          sortBy: action.automationAppliedHeaderSort?.sortBy || '',
        },
      };
    }
    case reduxString.AUTOMATION_RESET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        automation_applied_header_sort:
          initialState.automation_applied_header_sort,
      };
    }
    default: {
      return state;
    }
  }
};
export default automation_get_automation_reducer;
