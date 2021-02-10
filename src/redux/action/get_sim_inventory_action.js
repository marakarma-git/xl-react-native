import reduxString from '../reduxString';
import {colors} from '../../constant/color';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {authFailed} from './auth_action';
const getSimInventoryLoading = () => {
  return {
    type: reduxString.GET_SIM_INVENTORY_LOADING,
  };
};
const getSimInventoryLoadingFalse = () => {
  return {
    type: reduxString.GET_SIM_INVENTORY_LOADING_FALSE,
  };
};
const getSimInventoryFailed = (error) => {
  return {
    type: reduxString.GET_SIM_INVENTORY_FAILED,
    error: error,
  };
};
const getSimInventorySuccess = (data) => {
  const {
    dataSimInventory,
    dataSimInventoryTable,
    currentPage,
    currentTotalPage,
    currentSize,
    selectedHeaderSort,
  } = data || {};
  return {
    type: reduxString.GET_SIM_INVENTORY_SUCCESS,
    data_sim_inventory: dataSimInventory,
    data_sim_inventory_table: dataSimInventoryTable,
    currentPage: currentPage,
    currentTotalPage: currentTotalPage,
    currentSize: currentSize,
    selectedHeaderSort: selectedHeaderSort,
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
const changeCheckSimInventory = (index) => {
  return {
    type: reduxString.CHANGE_CHECK_SIM_INVENTORY,
    index: index,
  };
};
const changeCheckSimInventoryAllTrue = () => {
  return {
    type: reduxString.CHANGE_CHECK_SIM_INVENTORY_ALL_TRUE,
  };
};
const changeCheckSimInventoryAllFalse = () => {
  return {
    type: reduxString.CHANGE_CHECK_SIM_INVENTORY_ALL_FALSE,
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
      is_checked_root: false,
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
const callSimInventory = (paginate) => {
  return async (dispatch, getState) => {
    const {current_page, current_size} = await getState()
      .get_sim_inventory_reducer;
    const {page_value, size_value, selectedHeaderSort} = paginate || {};
    dispatch(getSimInventoryLoading());
    const {data} = await getState().auth_reducer;
    const {array_filter, searchText} = await getState()
      .dynamic_array_filter_reducer;
    const {orderBy, sortBy, formId} = selectedHeaderSort || {};
    const {filterParams} = await getState().query_params_filter_reducer;
    const {access_token} = data || {};
    const getPage = page_value || current_page;
    const getSize = size_value || current_size;
    console.log(
      `${base_url}/dcp/sim/getSimInventory?page=${getPage}&size=${getSize}&keyword=${searchText}&sort=${
        orderBy || ''
      }&order=${sortBy || ''}${filterParams}`,
    );
    axios
      .get(
        `${base_url}/dcp/sim/getSimInventory?page=${getPage}&size=${getSize}&keyword=${searchText}&sort=${
          orderBy || ''
        }&order=${sortBy || ''}${filterParams}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        const {content, pageable, totalPages, size} = result || {};
        const {pageNumber} = pageable || {};
        if (statusCode === 0) {
          const generated = dataMatcherArray2D(content, array_filter);
          dispatch(
            getSimInventorySuccess({
              dataSimInventory: data,
              dataSimInventoryTable: generated,
              currentPage: pageNumber,
              currentTotalPage: totalPages,
              currentSize: size,
              selectedHeaderSort: selectedHeaderSort,
            }),
          );
        } else {
          dispatch(getSimInventoryFailed(data));
        }
      })
      .catch((e) => {
        console.log(
          'error_api_call_sim_inventory: ' + JSON.stringify(e, null, 2),
        );
        if (e.response.data) {
          dispatch(authFailed(e.response.data));
        } else {
          dispatch(getSimInventoryLoadingFalse());
        }
      });
  };
};
export default callSimInventory;
export {
  reGenerateHideNShow,
  dataMatcherArray2D,
  setSimInventoryTable,
  getSimInventoryLoading,
  getSimInventoryLoadingFalse,
  changeCheckSimInventory,
  changeCheckSimInventoryAllTrue,
  changeCheckSimInventoryAllFalse,
};
