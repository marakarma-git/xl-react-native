import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';
import httpRequest from '../../constant/axiosInstance';

const usageAnalyticsDynamicOnchangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.USAGE_ANALYTICS_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const usageAnalyticsDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.USAGE_ANALYTICS_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const usageAnalyticsDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.USAGE_ANALYTICS_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const usageAnalyticsDynamicLoading = ({formId}) => {
  return {
    type: reduxString.USAGE_ANALYTICS_DYNAMIC_LOADING,
    formId,
  };
};
const usageAnalyticsDynamicResetSelectedValue = ({formId}) => {
  return {
    type: reduxString.USAGE_ANALYTICS_DYNAMIC_RESET_SELECTED_VALUE,
    formId,
  };
};
const usageAnalyticsResetAllValue = () => {
  return {
    type: reduxString.USAGE_ANALYTICS_RESET_ALL_VALUE,
  };
};
const usageAnalyticsGenerateParams = () => {
  return {
    type: reduxString.USAGE_ANALYTICS_GENERATE_PARAMS,
  };
};
const usageAnalyticsResetGenerateParams = () => {
  return {
    type: reduxString.USAGE_ANALYTICS_RESET_GENERATE_PARAMS,
  };
};
const usageAnalyticsSetParamsNavigation = ({appliedFilterParams}) => {
  return {
    type: reduxString.USAGE_ANALYTICS_SET_PARAMS_NAVIGATION,
    appliedFilterParams,
  };
};
const usageAnalyticsResetParamsNavigation = () => {
  return {
    type: reduxString.USAGE_ANALYTICS_RESET_PARAMS_NAVIGATION,
  };
};

const simGetEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(
      usageAnalyticsDynamicLoading({
        formId: 'usage-analytics-enterprise-hard-code',
      }),
    );
    callActiveEnterprise()
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({
              enterpriseId: thisEnterprise,
              enterpriseName,
              customerNumber,
              enterpriseId,
            }) => ({
              value: customerNumber,
              label: enterpriseName,
              toPackage: enterpriseId,
            }),
          );
          dispatch(
            usageAnalyticsDynamicSuccess({
              formId: 'usage-analytics-enterprise-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            usageAnalyticsDynamicFailed({
              formId: 'usage-analytics-enterprise-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          usageAnalyticsDynamicFailed({
            formId: 'usage-analytics-enterprise-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
const simGetEnterprisePackage = ({enterpriseId}) => {
  return async (dispatch) => {
    dispatch(
      usageAnalyticsDynamicLoading({
        formId: 'usage-analytics-package-name-hard-code',
      }),
    );
    httpRequest
      .get(
        `/dcp/analytics/getListSubscriptionPackageName?enterpriseId=${enterpriseId}`
          .split(' ')
          .join('+'),
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(({packageId, packageDesc}) => ({
            value: packageId,
            label: packageDesc,
          }));
          dispatch(
            usageAnalyticsDynamicSuccess({
              formId: 'usage-analytics-package-name-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            usageAnalyticsDynamicFailed({
              formId: 'usage-analytics-package-name-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          usageAnalyticsDynamicFailed({
            formId: 'usage-analytics-package-name-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
export {
  simGetEnterprise,
  simGetEnterprisePackage,
  usageAnalyticsDynamicOnchangeDropDown,
  usageAnalyticsDynamicResetSelectedValue,
  usageAnalyticsResetAllValue,
  usageAnalyticsGenerateParams,
  usageAnalyticsResetGenerateParams,
  usageAnalyticsSetParamsNavigation,
  usageAnalyticsResetParamsNavigation,
};
