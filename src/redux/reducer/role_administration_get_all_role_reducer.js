import reduxString from '../reduxString';

const initialState = {
  loading: false,
  errorText: '',
  data_role: [],
  data_role_generated: [],
  role_page: 0,
  role_total_page: 0,
  role_total_size: 20,
  role_elements_static: 0,
  role_elements_dynamic: 0,
  role_applied_filter: false,
  role_applied_header_sort: {
    formId: '',
    orderBy: '',
    sortBy: '',
  },
  role_params_applied_activity_log: '',
};
const role_administration_get_all_role_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.ROLE_ADMINISTRATION_GET_ROLE_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.ROLE_ADMINISTRATION_GET_ROLE_SUCCESS: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: initialState.errorText,
        data_role: action.dataRole,
        data_role_generated: action.dataRoleGenerated,
        role_page: action.rolePage,
        role_total_page: action.roleTotalPage,
        role_total_size: action.roleTotalSize,
        role_elements_static:
          state.role_elements_static === 0
            ? action.roleElements
            : state.role_elements_static,
        role_elements_dynamic: action.roleElements,
        role_applied_filter: action.roleAppliedFilter,
        role_applied_header_sort:
          action.roleAppliedHeaderSort || initialState.role_applied_header_sort,
        role_params_applied_activity_log:
          action.roleParamsAppliedActivityLog || '',
      };
    }
    case reduxString.ROLE_ADMINISTRATION_GET_ROLE_FAILED: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: action.errorText,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_GET_ROLE_RESET: {
      return state;
    }
    case reduxString.ROLE_ADMINISTRATION_SET_DATA_ROLE_GENERATED: {
      return {
        ...state,
        data_role_generated: [...action.dataRoleGenerated],
      };
    }
    case reduxString.ROLE_ADMINISTRATION_RESET_DATA_ROLE_GENERATED: {
      return {
        ...state,
        data_role_generated: initialState.data_role_generated,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_DYNAMIC_CHECK_DATA_ROLE: {
      state.data_role_generated[action.index].is_checked_root = !state
        .data_role_generated[action.index].is_checked_root;
      return {
        ...state,
        data_role_generated: state.data_role_generated,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_CHECK_ALL_DATA_ROLE: {
      const generatedRoleCheck = state.data_role_generated.map(
        ({is_checked_root, ...rest}) => ({
          is_checked_root: !action.valueCheck,
          ...rest,
        }),
      );
      return {
        ...state,
        data_role_generated: generatedRoleCheck,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_SET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        role_applied_header_sort: {
          formId: action.roleAppliedHeaderSort?.formId || '',
          orderBy: action.roleAppliedHeaderSort?.orderBy || '',
          sortBy: action.roleAppliedHeaderSort?.sortBy || '',
        },
      };
    }
    case reduxString.ROLE_ADMINISTRATION_RESET_APPLIED_HEADER_SORT: {
      return {
        ...state,
        role_applied_header_sort: initialState.role_applied_header_sort,
      };
    }
    default: {
      return state;
    }
  }
};
export default role_administration_get_all_role_reducer;
