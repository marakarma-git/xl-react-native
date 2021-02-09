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
    case reduxString.GET_SIM_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data_sim_inventory: action.data_sim_inventory,
        data_sim_inventory_table: action.data_sim_inventory_table,
        current_page: action.currentPage,
        current_total_page: action.currentTotalPage,
        current_size: action.currentSize,
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
    default:
      return state;
  }
};
export default get_sim_inventory_reducer;
