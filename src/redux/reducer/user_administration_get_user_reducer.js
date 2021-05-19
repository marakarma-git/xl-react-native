import reduxString from '../reduxString';
import lod from 'lodash';

const initialState = {
  loading: false,
  errorText: '',
  successText: '',
  data_user: [],
  data_user_generated: [],
  page_pagination: 0,
  total_size_pagination: 20,
  total_page_pagination: 0,
  total_elements_pagination: 0,
  total_dynamic_elements_pagination: 0,
  applied_filter: false,
  applied_header_sort: {
    formId: '',
    orderBy: '',
    sortBy: '',
  },
  params_applied_activity_log: '',
};
const user_administration_get_user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.USER_ADMINISTRATION_GET_USER_LOADING:
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    case reduxString.USER_ADMINISTRATION_GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errorText: '',
        data_user: action.dataUser,
        data_user_generated: action.dataUserGenerated,
        page_pagination: action.pagePagination,
        total_size_pagination: action.totalSizePagination,
        total_page_pagination: action.totalPagePagination,
        total_elements_pagination:
          state.total_elements_pagination === 0
            ? action.totalElementsPagination
            : state.total_elements_pagination,
        total_dynamic_elements_pagination: action.totalElementsPagination,
        applied_filter: action.appliedFilter,
        applied_header_sort:
          action.appliedHeaderSort || initialState.applied_header_sort,
        params_applied_activity_log: action.paramsAppliedActivityLog,
      };
    case reduxString.USER_ADMINISTRATION_GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    case reduxString.USER_ADMINISTRATION_GET_USER_RESET:
      return state;
    case reduxString.USER_ADMINISTRATION_SET_DATA_USER_GENERATED:
      return {
        ...state,
        data_user_generated: [...action.dataUserGenerated],
      };
    case reduxString.USER_ADMINISTRATION_RESET_DATA_USER_GENERATED:
      return {
        ...state,
        data_user_generated: [],
      };
    case reduxString.USER_ADMINISTRATION_DYNAMIC_CHECK_DATA_USER:
      // let copyArray = lod.cloneDeep(state.data_user_generated);
      state.data_user_generated[action.index].is_checked_root = !state
        .data_user_generated[action.index].is_checked_root;
      return {
        ...state,
        data_user_generated: state.data_user_generated,
      };
    case reduxString.USER_ADMINISTRATION_DYNAMIC_UNCHECK_DATA_USER:
      initialState.data_user_generated[action.index].is_checked_root = false;
      return {
        ...state,
        data_user_generated: initialState.data_user_generated,
      };
    case reduxString.USER_ADMINISTRATION_CHECK_ALL_DATA_USER:
      const generateCheckAll =
        state.data_user_generated.map(({is_checked_root, ...rest}) => ({
          is_checked_root: !action.valueCheck,
          ...rest,
        })) || state.data_user_generated;
      return {
        ...state,
        data_user_generated: generateCheckAll,
      };
    case reduxString.USER_ADMINISTRATION_UNCHECK_ALL_DATA_USER:
      const generatedUnCheckAll =
        state.data_user_generated.map(({is_checked_root, ...rest}) => ({
          is_checked_root: !action.valueCheck,
          ...rest,
        })) || state.data_user_generated;
      return {
        ...state,
        data_user_generated: generatedUnCheckAll,
      };
    case reduxString.USER_ADMINISTRATION_SET_APPLIED_HEADER_SORT:
      return {
        ...state,
        applied_header_sort: {
          formId: action.appliedHeaderSort?.formId || '',
          orderBy: action.appliedHeaderSort?.orderBy || '',
          sortBy: action.appliedHeaderSort?.sortBy || '',
        },
      };
    case reduxString.USER_ADMINISTRATION_RESET_APPLIED_HEADER_SORT:
      return {
        ...state,
        applied_header_sort: initialState.applied_header_sort,
      };
    case reduxString.USER_ADMINISTRATION_UPDATE_LOCK_UNLOCK_USER:
      return{
        ...state,
        data_user: action.dataUser,
        data_user_generated: action.dataUserGenerated
      }
    default:
      return state;
  }
};
export default user_administration_get_user_reducer;
