import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {dataMatcherArray2D} from './get_sim_inventory_action';

const subscriptionPackageGetSubscriptionLoading = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_LOADING,
  };
};
const subscriptionPackageGetSubscriptionSuccess = (data) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_SUCCESS,
    ...data,
  };
};
const subscriptionPackageGetSubscriptionFailed = ({errorText}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_FAILED,
    errorText,
  };
};
const subscriptionPackageGetSubscriptionReset = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_RESET,
  };
};
const subscriptionPackageSetDataSubscriptionGenerated = ({
  dataSubscriptionGenerated,
}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_SET_DATA_SUBSCRIPTION_GENERATED,
    dataSubscriptionGenerated,
  };
};
const subscriptionPackageDynamicCheckDataSubscription = ({index, index2}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_CHECK_DATA_SUBSCRIPTION,
    index,
    index2,
  };
};
const subscriptionPackageCheckAlDataSubscription = ({valueCheck, index}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_CHECK_ALL_DATA_SUBSCRIPTION,
    index,
    valueCheck,
  };
};
const subscriptionPackageSetAppliedHeaderSort = ({
  SubscriptionAppliedHeaderSort,
}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_SET_APPLIED_HEADER_SORT,
    SubscriptionAppliedHeaderSort,
  };
};
const subscriptionPackageResetAppliedHeaderSort = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_RESET_APPLIED_HEADER_SORT,
  };
};
const subscriptionPackageReplaceCellWithIndex = ({
  indexToReplace,
  indexReplaceData,
}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_REPLACE_CELL_WITH_INDEX,
    indexToReplace,
    indexReplaceData,
  };
};
const callSubscriptionPackage = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(subscriptionPackageGetSubscriptionLoading());
    const {page_params, size_params, header_sort_params} = paginate || {};
    const {orderBy: order_by_params, sortBy: sort_by_params} =
      header_sort_params || {};
    const {access_token} = (await getState().auth_reducer.data) || '';
    const {dataSubscriptionHeader, searchText, generatedParams} =
      (await getState().subscription_package_array_header_reducer) || {};
    const {
      subscription_page,
      subscription_total_size,
      subscription_applied_header_sort,
    } = (await getState().subscription_package_get_subscription_reducer) || {};
    const {orderBy, sortBy} = subscription_applied_header_sort || {};

    const getPage = page_params ?? subscription_page;
    const getSize = size_params || subscription_total_size;
    const getOrderBy = () => {
      if (order_by_params === 'RESET' || orderBy === 'RESEt') {
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
    axios
      .get(
        `${base_url}/dcp/package/getSubscriptionPackage?page=${getPage}&size=${getSize}${
          searchText ? `&keyword=${searchText}` : ''
        }${getSortBy() ? `&order=${getSortBy()}` : ''}${
          getSortBy() ? `&sort=${getOrderBy()}` : ''
        }${generatedParams}`
          .split(' ')
          .join('+'),
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        console.log(
          'callSubscriptionPackage: ' + JSON.stringify(data, null, 2),
        );
        const {result, statusCode} = data || {};
        const {content, totalPages, totalElements} = result || {};
        if (statusCode === 0) {
          const isAppliedFilter = () => !!(searchText || generatedParams);
          const generatedDataTable = dataMatcherArray2D(
            content,
            dataSubscriptionHeader,
          );
          dispatch(
            subscriptionPackageGetSubscriptionSuccess({
              dataSubscription: result,
              dataSubscriptionGenerated: generatedDataTable,
              subscriptionTotalPage: totalPages,
              subscriptionPage: getPage,
              subscriptionTotalSize: getSize,
              subscriptionElements: totalElements,
              subscriptionAppliedFilter: isAppliedFilter(),
              subscriptionAppliedHeaderSort:
                header_sort_params || subscription_applied_header_sort,
              subscriptionParamsAppliedActivityLog: generatedParams,
            }),
          );
        } else {
          dispatch(
            subscriptionPackageGetSubscriptionFailed({
              errorText: 'Failed, to get subscription package list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          subscriptionPackageGetSubscriptionFailed({
            errorText: 'Failed, to get subscription package list',
            ...error.response.data,
          }),
        );
      });
  };
};
export default callSubscriptionPackage;
export {
  subscriptionPackageGetSubscriptionLoading,
  subscriptionPackageGetSubscriptionReset,
  subscriptionPackageSetDataSubscriptionGenerated,
  subscriptionPackageDynamicCheckDataSubscription,
  subscriptionPackageCheckAlDataSubscription,
  subscriptionPackageSetAppliedHeaderSort,
  subscriptionPackageResetAppliedHeaderSort,
  subscriptionPackageReplaceCellWithIndex,
};
