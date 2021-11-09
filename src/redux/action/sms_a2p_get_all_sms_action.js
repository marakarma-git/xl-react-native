import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {dataMatcherArray2D} from './get_sim_inventory_action';

const smsA2pGetSmsLoading = () => {
  return {
    type: reduxString.SMS_A2P_GET_SMS_LOADING,
  };
};
const smsA2pGetSmsSuccess = (data) => {
  return {
    type: reduxString.SMS_A2P_GET_SMS_SUCCESS,
    ...data,
  };
};
const smsA2pGetSmsFailed = ({errorText}) => {
  return {
    type: reduxString.SMS_A2P_GET_SMS_FAILED,
    errorText,
  };
};
const smsA2pGetSmsReset = () => {
  return {
    type: reduxString.SMS_A2P_GET_SMS_RESET,
  };
};
const smsA2pSetDataSmsGenerated = ({dataSmsGenerated}) => {
  return {
    type: reduxString.SMS_A2P_SET_DATA_SMS_GENERATED,
    dataSmsGenerated,
  };
};
const smsA2pDynamicCheckDataSms = ({index}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_CHECK_DATA_SMS,
    index,
  };
};
const smsA2pCheckAlDataSms = ({valueCheck}) => {
  return {
    type: reduxString.SMS_A2P_CHECK_ALL_DATA_SMS,
    valueCheck,
  };
};
const smsA2pSetAppliedHeaderSort = ({smsAppliedHeaderSort}) => {
  return {
    type: reduxString.SMS_A2P_SET_APPLIED_HEADER_SORT,
    smsAppliedHeaderSort,
  };
};
const smsA2pResetAppliedHeaderSort = () => {
  return {
    type: reduxString.SMS_A2P_RESET_APPLIED_HEADER_SORT,
  };
};
const smsA2pReplaceCellWithIndex = ({indexToReplace, indexReplaceData}) => {
  return {
    type: reduxString.SMS_A2P_REPLACE_CELL_WITH_INDEX,
    indexToReplace,
    indexReplaceData,
  };
};
const getSmsA2p = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(smsA2pGetSmsLoading());
    const {page_params, size_params, header_sort_params} = paginate || {};
    const {orderBy: order_by_params, sortBy: sort_by_params} =
      header_sort_params || {};
    const {access_token} = (await getState().auth_reducer.data) || '';
    const {dataSmsHeader, searchText, generatedParams} =
      (await getState().sms_a2p_array_header_reducer) || {};
    const {sms_page, sms_total_size, sms_applied_header_sort} =
      (await getState().sms_a2p_get_all_sms_reducer) || {};
    const {orderBy, sortBy} = sms_applied_header_sort || {};

    const getPage = page_params ?? sms_page;
    const getSize = size_params || sms_total_size;
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
    console.log(
      `${base_url}/dcp/a2pConfiguration/getA2PConfigurationList?page=${getPage}&size=${getSize}&keyword=${searchText}${
        getSortBy() ? `&order=${getSortBy()}` : ''
      }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
        .split(' ')
        .join('+'),
    );
    axios
      .get(
        `${base_url}/dcp/a2pConfiguration/getA2PConfigurationList?page=${getPage}&size=${getSize}&keyword=${searchText}${
          getSortBy() ? `&order=${getSortBy()}` : ''
        }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
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
        const {content, totalPages, totalElements} = result || {};
        if (statusCode === 0) {
          const isAppliedFilter = () => !!(searchText || generatedParams);
          const generatedDataTable = dataMatcherArray2D(content, dataSmsHeader);
          dispatch(
            smsA2pGetSmsSuccess({
              dataSms: data,
              dataSmsGenerated: generatedDataTable,
              smsPage: getPage,
              smsTotalPage: totalPages,
              smsTotalSize: getSize,
              smsElements: totalElements,
              smsAppliedFilter: isAppliedFilter(),
              smsAppliedHeaderSort: header_sort_params
                ? header_sort_params
                : sms_applied_header_sort,
              smsParamsAppliedActivityLog: generatedParams,
            }),
          );
        } else {
          dispatch(
            smsA2pGetSmsFailed({
              errorText: 'Failed, to get sms list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          smsA2pGetSmsFailed({
            errorText: 'Failed, to get sms list',
            ...error.response.data,
          }),
        );
      });
  };
};
export default getSmsA2p;
export {
  smsA2pGetSmsReset,
  smsA2pCheckAlDataSms,
  smsA2pSetDataSmsGenerated,
  smsA2pResetAppliedHeaderSort,
  smsA2pDynamicCheckDataSms,
  smsA2pSetAppliedHeaderSort,
  smsA2pReplaceCellWithIndex,
};
