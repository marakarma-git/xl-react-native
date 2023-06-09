import lod from 'lodash';
import reduxString from '../reduxString';

const initialState = {
  loading: false,
  error: '',
  data_sim_inventory: [],
  data_sim_inventory_table: [],
  current_page: 0,
  current_size: 20,
  current_total_page: 0,
  current_total_elements: 0,
  current_dynamic_total_elements: 0,
  current_applied_filter: false,
  current_header_sort: {
    formId: '',
    orderBy: '',
    sortBy: '',
  },
  current_params_applied: null,
  get_sim_inventory_snapshot: {},
  bulkReconnect: {},
  loadingBulkReconnect: false,
  errorBulkReconnect: false,
};
const get_sim_inventory_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_SIM_INVENTORY_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case reduxString.GET_SIM_INVENTORY_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case reduxString.GET_SIM_INVENTORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case reduxString.HARD_CODE_CURRENT_TOTAL_ELEMENTS: {
      return {
        ...state,
        current_total_elements: action.currentTotalElements,
      };
    }
    case reduxString.GET_SIM_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data_sim_inventory: action.data_sim_inventory,
        data_sim_inventory_table: action.data_sim_inventory_table,
        current_page: action.currentPage,
        current_total_page: action.currentTotalPage,
        current_total_elements:
          state.current_total_elements === 0
            ? action.currentTotalElement
            : state.current_total_elements,
        current_dynamic_total_elements: action.currentTotalElement,
        current_applied_filter: action.currentAppliedFilter,
        current_size: action.currentSize,
        current_header_sort: action.selectedHeaderSort || {
          formId: '',
          orderBy: '',
          sortBy: '',
        },
        current_params_applied: action.paramsApplied,
      };
    case reduxString.GET_SIM_INVENTORY_RESET:
      return state;
    case reduxString.GET_SIM_INVENTORY_REMOVE_ERROR:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case reduxString.SET_SIM_INVENTORY_TABLE:
      return {
        ...state,
        loading: false,
        data_sim_inventory_table: action.data_sim_inventory_table,
      };
    case reduxString.RESET_SIM_INVENTORY_TABLE:
      return {
        ...state,
        data_sim_inventory_table: [],
      };
    case reduxString.CHANGE_CHECK_SIM_INVENTORY:
      let newArr = lod.cloneDeep(state.data_sim_inventory_table);
      newArr[action.index].is_checked_root = !newArr[action.index]
        .is_checked_root;
      return {
        ...state,
        data_sim_inventory_table: newArr,
      };
    case reduxString.CHANGE_CHECK_SIM_INVENTORY_ALL_TRUE:
      let containerTrue = [];
      let copyInventoryTrue = lod.cloneDeep(state.data_sim_inventory_table);
      copyInventoryTrue.map((value) => {
        value.is_checked_root = true;
        containerTrue.push(value);
      });
      return {
        ...state,
        data_sim_inventory_table: containerTrue,
      };
    case reduxString.CHANGE_CHECK_SIM_INVENTORY_ALL_FALSE:
      let containerFalse = [];
      let copyInventoryFalse = lod.cloneDeep(state.data_sim_inventory_table);
      copyInventoryFalse.map((value) => {
        value.is_checked_root = false;
        containerFalse.push(value);
      });
      return {
        ...state,
        data_sim_inventory_table: containerFalse,
      };
    case reduxString.UPDATE_SORT_BY:
      return {
        ...state,
        selectedHeaderSort: {
          formId: action.payload.formId,
          orderBy: action.payload.orderBy,
          sortBy: action.payload.sortBy,
        },
      };
    case reduxString.RESET_SORT_BY:
      return {
        ...state,
        selectedHeaderSort: {
          formId: '',
          orderBy: '',
          sortBy: '',
        },
      };
    case reduxString.BULK_RECONNECT_LOADING:
      return {
        ...state,
        loadingBulkReconnect: true,
      };
    case reduxString.BULK_RECONNECT_FAILED:
      return {
        ...state,
        loadingBulkReconnect: false,
        errorBulkReconnect: true,
      };
    case reduxString.BULK_RECONNECT_SUCCESS:
      return {
        ...state,
        loadingBulkReconnect: false,
        errorBulkReconnect: false,
        bulkReconnect: action?.bulkReconnect,
      };
    default:
      return state;
  }
};
export default get_sim_inventory_reducer;
