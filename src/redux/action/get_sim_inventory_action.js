import reduxString from '../reduxString';
import {colors} from '../../constant/color';

const getSimInventoryLoading = () => {
  return {
    type: reduxString.GET_SIM_INVENTORY_LOADING,
  };
};
const getSimInventoryFailed = (error) => {
  return {
    type: reduxString.GET_SIM_INVENTORY_FAILED,
    error: error,
  };
};
const getSimInventorySuccess = ({
  dataSimInventory,
  dataSimInventoryTable,
  currentPage,
  totalPage,
}) => {
  return {
    type: reduxString.GET_SIM_INVENTORY_SUCCESS,
    data_sim_inventory: dataSimInventory,
    data_sim_inventory_table: dataSimInventoryTable,
    current_page: currentPage,
    total_page: totalPage,
  };
};
const getSimInventoryReset = () => {
  return {
    type: reduxString.GET_SIM_INVENTORY_RESET,
  };
};
const getSimInventoryRemoveError = () => {
  return {
    type: reduxString.GET_SIM_INVENTORY_REMOVE_ERROR,
  };
};
const setSimInventoryTable = (data = []) => {
  return {
    type: reduxString.SET_SIM_INVENTORY_TABLE,
    data_sim_inventory_table: data,
  };
};
const resetSimInventoryTable = () => {
  return {
    type: reduxString.RESET_SIM_INVENTORY_TABLE,
  };
};
const dataMatcherArray2D = (listData = [], headerData = []) => {
  const generated = [];
  listData.map((item, index) => {
    const subGenerated = [];
    headerData.map((subItem) => {
      const {shown, api_id, config, ...rest} = subItem || {};
      const {width, superType} = config || {};
      if (shown) {
        const generateObject = {
          is_checked_root: false,
          cellType: subItem.cellRowType,
          config: {
            width: width,
            superType: superType,
            label: item[`${api_id}`],
            backgroundColor: index % 2 ? colors.gray_table : 'white',
          },
          item: {
            ...item,
          },
          subItem: {
            ...rest,
          },
        };
        subGenerated.push(generateObject);
      } else {
        return null;
      }
    });
    generated.push(subGenerated);
  });
  return generated;
};
const reGenerateHideNShow = () => {
  return (dispatch, getState) => {
    const {data_sim_inventory} = getState(
      (state) => state.get_sim_inventory_reducer,
    );
    const {array_filter} = getState(
      (state) => state.dynamic_array_filter_reducer,
    );
    const generated = dataMatcherArray2D(data_sim_inventory, array_filter);
    dispatch(setSimInventoryTable(generated));
  };
};
const callSimInventory = ({page}) => {
  const getPage = page || 0;
  return (dispatch, getState) => {};
};
export default callSimInventory;
export {reGenerateHideNShow, dataMatcherArray2D};
