import reduxString from '../reduxString';
import {colors} from '../../constant/color';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {authFailed} from './auth_action';
import dayjs from 'dayjs';
import Helper from '../../helpers/helper';
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
    currentTotalElement,
    currentSize,
    selectedHeaderSort,
  } = data || {};
  return {
    type: reduxString.GET_SIM_INVENTORY_SUCCESS,
    data_sim_inventory: dataSimInventory,
    data_sim_inventory_table: dataSimInventoryTable,
    currentPage: currentPage,
    currentTotalPage: currentTotalPage,
    currentTotalElement: currentTotalElement,
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
      const {shown, api_id, config, formId, ...rest} = subItem || {};
      const {width, superType, flexStart, doNotShowOnTable} = config || {};
      if (shown && !doNotShowOnTable) {
        const createObject = (superType, labelValue) => {
          if (superType === 'DATE') {
            return labelValue ? dayjs(labelValue).format('DD-MM-YYYY') : '';
          } else if (superType === 'BYTE') {
            return Helper.formatBytes(labelValue);
          } else {
            return labelValue;
          }
        };
        const generateObject = {
          cellType: subItem.cellRowType,
          config: {
            flexStart: flexStart,
            width: width,
            superType: superType,
            label: createObject(superType, item[`${api_id}`]),
            backgroundColor: index % 2 ? colors.gray_table : 'white',
            fontColor:
              formId === 'imsi-hard-code' &&
              subItem.cellRowType === 'TableCellCheckBox' &&
              colors.imsi_blue,
            isTouchable:
              formId === 'imsi-hard-code' &&
              subItem.cellRowType === 'TableCellCheckBox',
          },
          item: {...item},
          subItem: {
            formId: formId,
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
    const {
      current_page,
      current_size,
      current_header_sort: selectedHeaderSort,
    } = await getState().get_sim_inventory_reducer;
    const {
      page_value,
      size_value,
      selectedHeaderSort: selectedHeaderSortPaginate,
    } = paginate || {};
    dispatch(getSimInventoryLoading());
    const {data} = await getState().auth_reducer;
    const {array_filter, searchText, generatedParams} = await getState()
      .dynamic_array_filter_reducer;
    const {orderBy: orderByPaginate, sortBy: sortByPaginate} =
      selectedHeaderSortPaginate || {};
    const {orderBy, sortBy} = selectedHeaderSort || {};
    const {access_token} = data || {};
    const getPage = () => {
      if (page_value === 0) {
        return 0;
      } else {
        if (page_value) {
          return page_value;
        } else {
          return current_page;
        }
      }
    };
    const getSize = size_value || current_size;
    const getOrderBy = () => {
      if (sortByPaginate === 'RESET') {
        return '';
      } else {
        if (orderByPaginate) {
          return orderByPaginate;
        } else {
          return orderBy;
        }
      }
    };
    const getSortBy = () => {
      if (sortByPaginate === 'RESET') {
        return '';
      } else {
        if (sortByPaginate) {
          return sortByPaginate;
        } else {
          return sortBy;
        }
      }
    };
    console.log(
      `${base_url}/dcp/sim/getSimInventory?page=${getPage()}&size=${getSize}&keyword=${searchText}&sort=${getOrderBy()}&order=${getSortBy()}${generatedParams}`
        .split(' ')
        .join('+'),
    );
    axios
      .get(
        `${base_url}/dcp/sim/getSimInventory?page=${getPage()}&size=${getSize}&keyword=${searchText}&sort=${getOrderBy()}&order=${getSortBy()}${generatedParams}`
          .split(' ')
          .join('+'),
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        const {content, pageable, totalPages, totalElements, size} =
          result || {};
        const {pageNumber} = pageable || {};
        if (statusCode === 0) {
          const generated = dataMatcherArray2D(content, array_filter);
          dispatch(
            getSimInventorySuccess({
              dataSimInventory: data,
              dataSimInventoryTable: generated,
              currentPage: pageNumber,
              currentTotalPage: totalPages,
              currentTotalElement: totalElements,
              currentSize: size,
              selectedHeaderSort:
                selectedHeaderSortPaginate || selectedHeaderSort,
              paramsApplied: generatedParams || null,
            }),
          );
        } else {
          dispatch(getSimInventoryFailed(data));
        }
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data));
        // if (e.response.data) {
        //   dispatch(authFailed(e.response.data));
        // } else {
        //   dispatch(getSimInventoryLoadingFalse());
        //   alert('Something went wrong went fetching data');
        //   console.log(
        //     'error_api_call_sim_inventory: ' + JSON.stringify(e, null, 2),
        //   );
        // }
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
