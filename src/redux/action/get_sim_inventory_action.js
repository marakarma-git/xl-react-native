import reduxString from '../reduxString';
import {colors} from '../../constant/color';
import axios from 'axios';
import {base_url} from '../../constant/connection';

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
          cellType: subItem.cellRowType,
          config: {
            width: width,
            superType: superType,
            label: item[`${api_id}`],
            backgroundColor: index % 2 ? colors.gray_table : 'white',
          },
          item: {...item},
          subItem: {
            ...rest,
          },
        };
        subGenerated.push(generateObject);
      } else {
        return null;
      }
    });
    generated.push({
      is_checked_root: index % 2 === 0,
      dataCell: subGenerated,
    });
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
const callSimInventory = (data) => {
  const {page} = data || {};
  const getPage = page || 0;
  return (dispatch, getState) => {
    dispatch(getSimInventoryLoading());
    const {auth_reducer} = getState();
    const {dynamic_array_filter_reducer} = getState();
    const {access_token} = auth_reducer.data || {};
    const {array_filter} = dynamic_array_filter_reducer || {};
    axios
      .get(`${base_url}/dcp/sim/getSimInventory?page=${getPage}&size=20`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({data}) => {
        const {result, statusCode, totalPage, number} = data || {};
        const {content} = result || {};
        if (statusCode === 0) {
          const generated = dataMatcherArray2D(content, array_filter);
          dispatch(
            getSimInventorySuccess({
              dataSimInventory: data,
              dataSimInventoryTable: generated,
              currentPage: number,
              totalPage: totalPage,
            }),
          );
        } else {
          dispatch(getSimInventoryFailed(data));
        }
      })
      .catch((e) =>
        console.log(
          'error_api_call_sim_inventory: ' + JSON.stringify(e, null, 2),
        ),
      );
  };
};
export default callSimInventory;
export {reGenerateHideNShow, dataMatcherArray2D};
