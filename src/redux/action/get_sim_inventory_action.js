import reduxString from '../reduxString';
import {colors} from '../../constant/color';
import {authFailed} from './auth_action';
import dayjs from 'dayjs';
import Helper from '../../helpers/helper';
import httpRequest from '../../constant/axiosInstance';
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
    currentAppliedFilter,
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
    currentAppliedFilter: currentAppliedFilter,
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
      const {
        shown,
        api_id,
        api_force,
        second_api_id,
        config,
        formId,
        on_edit_config,
      } = subItem || {};
      const {
        width,
        superType,
        flexStart,
        doNotShowOnTable,
        showIcon,
        isTouchable,
        isTreeView,
        labelBool,
        textLink,
        ...getAllConfig
      } = config || {};
      if (shown && !doNotShowOnTable) {
        const createLabel = (superType, firstValue) => {
          if (superType === 'DATE') {
            return firstValue
              ? dayjs(firstValue.substring(0, 10)).format('DD-MM-YYYY')
              : '';
          } else if (superType === 'BYTE') {
            return Helper.formatBytes(firstValue);
          } else if (superType === 'BOOL') {
            return firstValue ? labelBool.true : labelBool.false;
          } else {
            return firstValue;
          }
        };
        let generateObject = {
          position_table_index: index,
          cellType: subItem.cellRowType,
          config: {
            ...config,
            flexStart: flexStart,
            width: width,
            superType: superType,
            label: createLabel(superType, item[`${api_id}`]),
            backgroundColor: index % 2 ? colors.gray_table : 'white',
            fontColor:
              formId === 'imsi-hard-code' &&
              subItem.cellRowType === 'TableCellCheckBox' &&
              colors.imsi_blue,
            isTouchable:
              formId === 'imsi-hard-code' &&
              subItem.cellRowType === 'TableCellCheckBox'
                ? true
                : isTouchable,
            visibility: item.visibility == undefined ? true : item.visibility,
            icon: item.icon || null,
            showIcon: showIcon,
            isTreeView: isTreeView,
            treeLevel: item.level || 0,
            treeCheck: item.treeCheck == undefined ? false : item.treeCheck,
            textLink,
            rootConfig: getAllConfig,
          },
          item,
          subItem,
          valueCheck: false,
        };
        if (on_edit_config) {
          generateObject.edit_form_id = `edit-${formId}`;
          let objectEdit = {...on_edit_config};
          const {type_input_edit, edit_text_type} = on_edit_config || {};

          let createCurrency = () => {
            if (edit_text_type === 'Currency') {
              return Helper.delimiterNumberOnText(item[`${api_id}`]);
            } else {
              return item[`${api_id}`];
            }
          };

          if (type_input_edit === 'TextInput') {
            objectEdit.edit_value = createCurrency() || '';
          }
          if (type_input_edit === 'DropDown') {
            objectEdit.edit_value = {
              value: item[`${api_id}`],
              label: item[`${api_id}`],
              [`${api_force}`]: item[`${api_force}`],
            };
            objectEdit.edit_data_array = [];
          }
          if (type_input_edit === 'DropDownType2') {
            objectEdit.edit_value = createCurrency();
            objectEdit.edit_value2 = {
              value: item[`${second_api_id}`],
              label: item[`${second_api_id}`],
            };
            objectEdit.edit_data_array = [];
          }

          generateObject.for_layout_edit_only = objectEdit;
        }
        subGenerated.push(generateObject);
      } else {
        return null;
      }
    });
    generated.push({
      is_checked_root: false,
      dataCell: subGenerated,
      is_edit: false,
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
    const {array_filter, searchText, generatedParams} = await getState()
      .dynamic_array_filter_reducer;
    const {orderBy: orderByPaginate, sortBy: sortByPaginate} =
      selectedHeaderSortPaginate || {};
    const {orderBy, sortBy} = selectedHeaderSort || {};
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
      if (sortByPaginate === 'RESET' || orderBy === 'RESET') {
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
      if (sortByPaginate === 'RESET' || sortBy === 'RESET') {
        return '';
      } else {
        if (sortByPaginate) {
          return sortByPaginate;
        } else {
          return sortBy;
        }
      }
    };
    httpRequest
      .get(
        `/dcp/sim/getSimInventory?page=${getPage()}&size=${getSize}&keyword=${searchText}&sort=${getOrderBy()}&order=${getSortBy()}${generatedParams}`
          .split(' ')
          .join('+'),
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        const {content, pageable, totalPages, totalElements, size} =
          result || {};
        const {pageNumber} = pageable || {};
        if (statusCode === 0) {
          const isAppliedFilter = () => !!(searchText || generatedParams);
          const generated = dataMatcherArray2D(content, array_filter);
          dispatch(
            getSimInventorySuccess({
              dataSimInventory: data,
              dataSimInventoryTable: generated,
              currentPage: pageNumber,
              currentTotalPage: totalPages,
              currentTotalElement: totalElements,
              currentAppliedFilter: isAppliedFilter(),
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
