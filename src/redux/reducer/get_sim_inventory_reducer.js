import reduxString from '../reduxString';

const initialState = {
  loading: false,
  error: '',
  data_sim_inventory: [],
  data_sim_inventory_table: [],
  current_page: 0,
  total_page: 0,
};
const get_sim_inventory_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_SIM_INVENTORY_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case reduxString.GET_SIM_INVENTORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case reduxString.GET_SIM_INVENTORY_SUCCESS:
      return {
        loading: false,
        error: '',
        data_sim_inventory: action.data_sim_inventory,
        data_sim_inventory_table: action.data_sim_inventory_table,
        current_page: action.currentPage,
        total_page: action.total_page,
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
    default:
      return state;
  }
};
export default get_sim_inventory_reducer;
