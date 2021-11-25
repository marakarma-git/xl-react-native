import reduxString from '../reduxString';
import {dataMatcherArray2D} from './get_sim_inventory_action';
import httpRequest from '../../constant/axiosInstance';
const automationGetAutomationReload = () => {
  return {
    type: reduxString.AUTOMATION_GET_AUTOMATION_RELOAD,
  };
};
const automationGetAutomationLoading = () => {
  return {
    type: reduxString.AUTOMATION_GET_AUTOMATION_LOADING,
  };
};
const automationChangeCheckHeader = () => {
  return {
    type: reduxString.AUTOMATION_CHANGE_CHECK_HEADER,
  };
};
const automationGetAutomationSuccess = (data) => {
  return {
    type: reduxString.AUTOMATION_GET_AUTOMATION_SUCCESS,
    ...data,
  };
};
const automationGetAutomationFailed = (error) => {
  return {
    type: reduxString.AUTOMATION_GET_AUTOMATION_FAILED,
    errorText: error,
  };
};
const automationGetAutomationReset = () => {
  return {
    type: reduxString.AUTOMATION_GET_AUTOMATION_RESET,
  };
};
const automationSetDataAutomationGenerated = (data) => {
  return {
    type: reduxString.AUTOMATION_SET_DATA_AUTOMATION_GENERATED,
    dataAutomationGenerated: data,
  };
};
const automationResetDataAutomationGenerated = () => {
  return {
    type: reduxString.AUTOMATION_RESET_DATA_AUTOMATION_GENERATED,
  };
};
const automationDynamicCheckDataAutomation = (index) => {
  return {
    type: reduxString.AUTOMATION_DYNAMIC_CHECK_DATA_AUTOMATION,
    index,
  };
};
const automationDynamicUnCheckDataAutomation = (index) => {
  return {
    type: reduxString.AUTOMATION_DYNAMIC_UNCHECK_DATA_AUTOMATION,
    index,
  };
};
const automationSetAppliedHeaderSort = (data) => {
  return {
    type: reduxString.AUTOMATION_SET_APPLIED_HEADER_SORT,
    appliedHeaderSort: data,
  };
};
const automationResetAppliedHeaderSort = () => {
  return {
    type: reduxString.AUTOMATION_RESET_APPLIED_HEADER_SORT,
  };
};
const getAutomation = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(automationGetAutomationLoading());
    const {page_params, size_params, header_sort_params} = paginate || {};
    const {orderBy: order_by_params, sortBy: sort_by_params} =
      header_sort_params || {};
    const {dataAutomationHeader, searchText, generatedParams} =
      (await getState().automation_array_header_reducer) || {};
    const {
      automation_page,
      automation_total_size,
      automation_applied_header_sort,
    } = (await getState().automation_get_automation_reducer) || {};
    const {orderBy, sortBy} = automation_applied_header_sort || {};

    const getPage = page_params ?? automation_page;
    const getSize = size_params || automation_total_size;
    const getOrderBy = () => {
      if (order_by_params === 'RESET' || orderBy === 'RESET') {
        return '';
      } else {
        if (order_by_params) {
          return order_by_params;
        } else {
          return orderBy;
        }
      }
    };
    const getSortBy = () => {
      if (sort_by_params === 'RESET' || sortBy === 'RESET') {
        return '';
      } else {
        if (sort_by_params) {
          return sort_by_params;
        } else {
          return sortBy;
        }
      }
    };
    httpRequest
      .get(
        `/dcp/automation/getListAutomation?page=${getPage}&size=${getSize}${
          getSortBy() ? `&order=${getSortBy()}` : ''
        }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
          .split(' ')
          .join('+'),
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        const {content, totalPages, totalElements} = result || {};
        if (statusCode === 0) {
          const isAppliedFilter = () => !!(searchText || generatedParams);
          const generatedDataTable = dataMatcherArray2D(
            content,
            dataAutomationHeader,
          );
          dispatch(
            automationGetAutomationSuccess({
              dataAutomation: data,
              dataAutomationGenerated: generatedDataTable,
              automationPage: getPage,
              automationTotalPage: totalPages,
              automationTotalSize: getSize,
              automationElements: totalElements,
              automationAppliedFilter: isAppliedFilter(),
              automationAppliedHeaderSort: header_sort_params
                ? header_sort_params
                : automation_applied_header_sort,
              automationParamsAppliedActivityLog: generatedParams,
            }),
          );
        } else {
          automationGetAutomationFailed({
            errorText: 'Failed, to get automation',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          automationGetAutomationFailed({
            errorText: 'Failed, to get automation',
            ...error.response.data,
          }),
        );
      });
  };
};
export default getAutomation;
export {
  automationGetAutomationReload,
  automationGetAutomationReset,
  automationChangeCheckHeader,
  automationSetDataAutomationGenerated,
  automationResetDataAutomationGenerated,
  automationDynamicCheckDataAutomation,
  automationDynamicUnCheckDataAutomation,
  automationSetAppliedHeaderSort,
  automationResetAppliedHeaderSort,
};
