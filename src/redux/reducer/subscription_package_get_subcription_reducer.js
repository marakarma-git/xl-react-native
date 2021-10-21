import reduxString from '../reduxString';

const initialState = {
  loading: false,
  errorText: '',
  data_subscription: [],
  data_subscription_generated: [],
  subscription_page: 0,
  subscription_total_page: 0,
  subscription_total_size: 20,
  subscription_elements_static: 0,
  subscription_elements_dynamic: 0,
  subscription_applied_filter: false,
  subscription_applied_header_sort: {
    formId: '',
    orderBy: '',
    sortBy: '',
  },
  subscription_params_applied_activity_log: '',
};
const subscription_package_get_subscription_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: initialState.errorText,
        data_subscription: action.dataSubscription,
        data_subscription_generated: action.dataSubscriptionGenerated,
        subscription_page: action.subscriptionPage,
        subscription_total_page: action.subscriptionTotalPage,
        subscription_total_size: action.subscriptionTotalSize,
        subscription_elements_static:
          state.subscription_elements_static === 0
            ? action.subscriptionElements
            : state.subscription_elements_static,
        subscription_elements_dynamic: action.subscriptionElements,
        subscription_applied_filter: action.subscriptionAppliedFilter,
        subscription_applied_header_sort:
          action.subscriptionAppliedHeaderSort ||
          initialState.subscription_applied_header_sort,
        subscription_params_applied_activity_log:
          action.subscriptionParamsAppliedActivityLog || '',
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_FAILED: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: action.errorText,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_RESET: {
      return state;
    }
    case reduxString.SUBSCRIPTION_PACKAGE_SET_DATA_SUBSCRIPTION_GENERATED: {
      return {
        ...state,
        data_subscription_generated: [...action.dataSubscriptionGenerated],
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_RESET_DATA_SUBSCRIPTION_GENERATED: {
      return {
        ...state,
        data_subscription_generated: initialState.data_subscription_generated,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_CHECK_DATA_SUBSCRIPTION: {
      state.data_subscription_generated[action.index].dataCell[
        action.index2
      ].valueCheck = !state.data_subscription_generated[action.index].dataCell[
        action.index2
      ].valueCheck;
      return {
        ...state,
        data_subscription_generated: state.data_subscription_generated,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_CHECK_ALL_DATA_SUBSCRIPTION: {
      const generatedRoleCheck = state.data_subscription_generated.map(
        ({is_checked_root, index, ...rest}) => ({
          dataCell: ![index][action.index].valueCheck,
          ...rest,
        }),
      );
      return {
        ...state,
        data_subscription_generated: generatedRoleCheck,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_SET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        subscription_applied_header_sort: {
          formId: action.subscriptionAppliedHeaderSort?.formId || '',
          orderBy: action.subscriptionAppliedHeaderSort?.orderBy || '',
          sortBy: action.subscriptionAppliedHeaderSort?.sortBy || '',
        },
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_RESET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        subscription_applied_header_sort:
          initialState.subscription_applied_header_sort,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_REPLACE_CELL_WITH_INDEX: {
      state.data_subscription_generated[action.indexToReplace] =
        action.indexReplaceData;
      return {
        ...state,
        data_subscription_generated: state.data_subscription_generated,
      };
    }
    default: {
      return state;
    }
  }
};
export default subscription_package_get_subscription_reducer;
